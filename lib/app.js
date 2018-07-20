const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
// app.use(express.static('public'));
app.use(express.json());


const studios = require('./routes/studios');

app.use('/api/studios', studios);

const { handler, api404 } = require('./util/errors');

app.use('/api', api404);
app.use((req, res) => {
    res.sendStatus(404);
});

//eslint-disable-next-line
app.use(handler);

module.exports = app; 