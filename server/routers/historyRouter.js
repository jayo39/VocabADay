const express = require('express');

const router = express.Router();
const pool = require('../db');
const utils = require('../lib/utils');

router.post('/', utils.loginRequired, async(req, res) => {
    try {
        const {userId, correctNum, bookId, percent, total} = req.body;
        let sql = `
            insert into vad_history
            (correctNum, user_id, book_id, percent, total)
            values
            (?, ?, ?, ?, ?);
        `;
        await pool.query(sql, [correctNum, userId, bookId, percent, total]);
        res.json({msg: 'Saved History'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.get('/:id', utils.loginRequired, async(req, res) => {
    try {
        let sql = `
            select h.id id, h.correctNum correct, b.name book, b.series series, concat(h.percent*100, '%') percent, h.total total
            from vad_history h left outer join vad_book b
            on h.book_id = b.id
            where h.user_id = ?;
        `;
        
        let [rows] = await pool.query(sql, [req.params.id]);
        res.json({history: rows});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

module.exports = router;