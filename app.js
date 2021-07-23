const express = require('express');
require('./db/dbConnection');
const errorMiddleware = require('./middleware/errorMiddleware');

// ROUTES
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.status(200).send('HELLO ');
});

app.post('/', (req, res) => {
    res.status(200).json(req.body);
});

app.get('/:id', (req, res) => {
    console.log(req.query.sortBy);
    res.status(200).json({'id': req.params.id});
});

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("server 3000 portundan ayağa kaldırıldı.");
});

