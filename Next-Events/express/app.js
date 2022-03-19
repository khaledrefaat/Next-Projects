const express = require('express');
const app = express();
const events = require('./routes/events');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', events);

app.listen(9000);
