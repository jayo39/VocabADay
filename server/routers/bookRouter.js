const express = require('express');

const router = express.Router();
const pool = require('../db');
const utils = require('../lib/utils');
const fs = require('fs');

router.get('/', async(req, res) => {
    try {
        const order = req.query.order;

        let sql = `
            select *
            from vad_book
        `;

        if(order === 'popular') {
            sql += ' order by comCnt desc '
        } else if(order === 'newest') {
            sql += ' order by id desc '
        }

        sql += ' limit 4; '

        let [rows] = await pool.query(sql, []);
        res.json({bookList: rows});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.get('/list', async(req, res) => {
    try {
        const genre = req.query.genre;
        const keyword = req.query.keyword;
        const cnt = Number(req.query.cnt);
        const currentPage = Number(req.query.currentPage);

        let values = [];

        let sql = `
            select b.id, b.name, b.description, b.series, b.img, g.name genre
            from vad_book b left outer join vad_genre g
            on b.id = g.book_id
        `;

        if(keyword && genre) {
            sql += ' where b.name like ? and g.name = ? ';
            values.push(`%${keyword}%`);
            values.push(genre);
        } else if(genre) {
            sql += ' where g.name = ? ';
            values.push(genre);
        } else if(keyword) {
            sql = `
                select b.id, b.name, b.description, b.series, b.img, group_concat(g.name) as genre
                from vad_book b left outer join vad_genre g
                on b.id = g.book_id
            `;
            sql += ' where b.name like ? group by b.id ';
            values.push(`%${keyword}%`);
        } else {
            sql = `
                select b.id, b.name, b.description, b.series, b.img, group_concat(g.name) as genre
                from vad_book b left outer join vad_genre g
                on b.id = g.book_id
            `;
            sql += ' group by b.id ';
        }

        sql += ' order by name limit ? offset ?; ';
        values.push(cnt);
        values.push(cnt*(currentPage-1));

        let [rows] = await pool.query(sql, values);
        for(let i = 0; i < rows.length; i++) {
            if(rows[i].genres === null) {
                rows[i].genres = [];
            } else {
                rows[i].genres = rows[i].genre.split(',');
            }
        }

        sql = `
            select b.id as totalCnt from vad_book b left outer join vad_genre g
            on b.id = g.book_id
        `;
        values = [];

        if(keyword) {
            sql += ' where b.name like ? ';
            values.push(`%${keyword}%`);
            if(genre) {
                sql += ' and g.name = ? ';
                values.push(genre);
            }
        } else if(genre) {
            sql += ' where g.name = ? ';
            values.push(genre);
        }

        sql += ' group by b.id; ';

        let [tmp] = await pool.query(sql, values);

        res.json({bookList: rows, totalCnt: tmp.length});

    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.delete('/:id', utils.adminRequired, async(req, res) => {
    try {
        let bookId = Number(req.params.id);
        let [rows] = await pool.query('select img from vad_book where id = ?', bookId);

        fs.unlinkSync('../public' + rows[0].img);
        let sql = `
            delete from vad_genre
            where book_id = ?;
        `;
        await pool.query(sql, bookId);
        sql = `
            delete from vad_vocab
            where book_id = ?;
        `;
        await pool.query(sql, bookId);
        sql = `
            delete from vad_book
            where id = ?;
        `;
        await pool.query(sql, bookId);
        res.json({msg: 'Delete Book'});
    } catch(err) {
        console.log(err);
        res.json(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.put('/:id', utils.adminRequired, utils.imgUpload.single('image'), async(req, res) => {
    try {
        let sql = `
            select img
            from vad_book
            where id = ?;
        `;

        let bookId = Number(req.params.id);
        let [rows] = await pool.query(sql, [bookId]);
        let imgPath = '';
        

        if(!req.file) {
            imgPath = rows[0].img;
        } else {
            fs.unlinkSync('../public' + rows[0].img);
            imgPath = `/bookImg/${req.file.filename}`;
        }
        sql = `
            update vad_book
            set name = ?,
                series = ?,
                img = ?,
                description = ?
            where id = ?;
        `;
        let [result] = await pool.query(sql, [req.body.title, req.body.series, imgPath, req.body.description, bookId]);

        sql = `
            delete from vad_genre
            where book_id = ?;
        `;
        await pool.query(sql, [bookId]);

        sql = `
            insert into vad_genre
            (name, book_id)
            values
            (?, ?);
        `;

        const genres = req.body.genres.split(',');

        for(let i = 0; i < genres.length; i++) {
            await pool.query(sql, [genres[i], bookId]);
        }

        res.json({msg: 'Edited Book'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.post('/add', utils.adminRequired, utils.imgUpload.single('image'), async(req, res) => {
    try {
        let sql = `
            insert into vad_book
            (name, series, comCnt, img, description)
            values
            (?, ?, 0, ?, ?);
        `;

        let [result] = await pool.query(sql, [req.body.title, req.body.series, `/bookImg/${req.file.filename}`, req.body.description]);

        sql = `
            insert into vad_genre
            (name, book_id)
            values
            (?, ?);
        `;

        const genres = req.body.genres.split(',');

        for(let i = 0; i < genres.length; i++) {
            await pool.query(sql, [genres[i], result.insertId]);
        }

        res.json({bookId: result.insertId, msg:'Added book'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.get('/addQuiz', utils.adminRequired, async(req, res) => {
    try {
        let sql = `
            select * from vad_book;
        `;

        let [rows] = await pool.query(sql);
        res.json({bookList: rows});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }

});

router.post('/removeQuiz', utils.adminRequired, async(req, res) => {
    try {
        const bookId = req.body.bookId;
        let sql = `
            delete from vad_vocab
            where book_id = ?;
        `;
        await pool.query(sql, [bookId]);
        res.json({msg: 'Removed Quiz'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.post('/editQuiz', utils.adminRequired, async(req, res) => {
    try {
        const optionsData = req.body.options;
        const bookId = req.body.bookId;

        // delete everything first
        let sql = `
            delete from vad_vocab
            where book_id = ?;
        `;

        await pool.query(sql, [bookId]);
        
        // then add the new data
        sql = `
            insert into vad_vocab
            (vocab, answer, option1, option2, option3, book_id)
            values
            (?, ?, ?, ?, ?, ?);
        `

        for(let i = 0; i < optionsData.length; i++) {
            await pool.query(sql, [
                optionsData[i].vocab,
                optionsData[i].answer,
                optionsData[i].option1,
                optionsData[i].option2,
                optionsData[i].option3,
                bookId
            ]);
        }
        res.json({msg: 'Updated Quiz'})
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.post('/addQuiz', utils.adminRequired, async(req, res) => {
    try {
        const optionsData = req.body.options;
        const bookId = req.body.bookId;

        let sql = `
            insert into vad_vocab
            (vocab, answer, option1, option2, option3, book_id)
            values
            (?, ?, ?, ?, ?, ?);
        `;

        for(let i = 0; i < optionsData.length; i++) {
            await pool.query(sql, 
                [
                    optionsData[i].vocab,
                    optionsData[i].answer,
                    optionsData[i].option1,
                    optionsData[i].option2,
                    optionsData[i].option3,
                    bookId
                ]);
        }
        res.json({msg: 'Added Quiz'});

    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

router.get('/:id', utils.loginRequired, async(req, res) => {
    try {
        let sql = `
            select *
            from vad_book
            where id = ?;
        `;
        let [rows] = await pool.query(sql, [Number(req.params.id)]);
        res.json({book: rows[0]});
    } catch(err){
        console.log(err);
        res.status(500).json({errno: 2, msg: 'Server Error'});
    }
});

module.exports = router;