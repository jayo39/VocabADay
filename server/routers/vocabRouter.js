const express = require('express');

const router = express.Router();
const pool = require('../db');
const utils = require('../lib/utils');

router.get('/quiz/:id', utils.loginRequired, async(req, res) => {
    try {
        const bookId = req.params.id;
        let sql = `
            select vocab, answer, option1, option2, option3
            from vad_vocab
            where book_id = ?;
        `;
        let [rows] = await pool.query(sql, [Number(bookId)]);
        if (rows.length === 0) {
            res.json({vocabList: null});
            return;
        }
        res.json({vocabList: rows});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

module.exports = router;