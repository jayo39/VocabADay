const express = require('express');

const router = express.Router();
const pool = require('../db');
const utils = require('../lib/utils');

router.get('/:id', utils.loginRequired, async(req, res) => {
    try {
        let sql = `
            select name
            from vad_genre
            where book_id = ?;
        `;
        let [rows] = await pool.query(sql, [req.params.id]);
        res.json({genres: rows});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
})

module.exports = router;