const express = require('express');
const port = 3001;

const app = express();
const authRouter = require('./routers/authRouter');
const bookRouter = require('./routers/bookRouter');
const vocabRouter = require('./routers/vocabRouter');
const historyRouter = require('./routers/historyRouter');
const userRouter = require('./routers/userRouter');
const genreRouter = require('./routers/genreRouter');

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);
app.use('/api/vocab', vocabRouter);
app.use('/api/history', historyRouter);
app.use('/api/user', userRouter);
app.use('/api/genre', genreRouter);

app.listen(port, ()=> {
    console.log(`express started on ${port}`);
})