const express = require('express');

const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');

router.post('/join', async(req, res)=> {
    try {
        // check for duplicates
        let sql = `
            select username from vad_user where username = ?;
        `;
        let [rows] = await pool.query(sql, [req.body.username]);
        if(rows.length > 0) {
            res.status(400).json({errno: 1, msg: 'This username already exists'});
            return;
        }

        // no duplicates
        const encryptPw = bcrypt.hashSync(req.body.pw, 10);

        sql = `
            insert into vad_user
            (username, password, role)
            values
            (?, ?, 'USER');
        `;

        await pool.query(sql, [req.body.username, encryptPw]);

        res.status(200).json({msg: 'Created account!'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.post('/login', async(req, res) => {
    try {
        let sql =  `
            select *
            from vad_user
            where username = ?;
        `;

        let [rows] = await pool.query(sql, [req.body.username]);

        // username already exists
        if(rows.length === 0) {
            res.status(400).json({errno: 1, msg: 'Incorrect username or password'});
            return;
        }

        // password is incorrect
        if(!bcrypt.compareSync(req.body.pw, rows[0].password)) {
            res.status(400).json({errno: 1, msg: 'Incorrect username or password'});
            return;
        }

        // login success
        let token = jwt.sign({username: rows[0].username, id: rows[0].id, role: rows[0].role}, 
            'vadToken', {expiresIn: '1h'});
        res.status(200).json({msg: 'Logged in!', accessToken: token, 
        role: rows[0].role, user: rows[0]});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server error'});
    }
});

router.put('/changePassword', utils.loginRequired, async(req, res) => {
    try {
        let sql = `
            select password
            from vad_user
            where username = ?;
        `
        let [rows] = await pool.query(sql, [req.loginUsername]);
        if(!bcrypt.compareSync(req.body.currentPassword, rows[0].password)) {
            res.status(400).json({errno: 1, msg: 'Incorrect password'});
            return;
        }

        // passwords match
        const enPw = bcrypt.hashSync(req.body.newPassword, 10);

        sql = `
            update vad_user
            set password = ?
            where username = ?;
        `
        await pool.query(sql, [enPw, req.loginUsername]);
        res.status(200).json({msg: 'Password Changed!'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

module.exports = router;