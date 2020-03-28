
const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate')
const routes = require('./rotes');

const app = express();

app.use(cors()); //origin
app.use(express.json());

app.use(routes);
app.use(errors());


app.listen(3333);