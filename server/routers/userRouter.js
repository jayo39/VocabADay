const express = require('express');

const router = express.Router();
const pool = require('../db'); // db 사용하기 위해 import
const utils = require('../lib/utils');

router.get('/loggedIn', utils.loginRequired, async(req, res) => {
    try {
        let sql = `
            select *
            from vad_user
            where id = ?;
        `;

        let [rows] = await pool.query(sql, [req.loginId]);
        res.json(rows[0]);
    } catch(err) {
        res.status(500).json({errno: 3, msg: 'Server Error'});
    }
});

module.exports = router;