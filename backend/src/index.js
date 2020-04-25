
const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate')
const routes = require('./rotes');
const morgan = require('morgan');
const mongoose = require( 'mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/upload', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.use(cors()); //origin
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use(routes);
app.use(errors());


app.listen(3333);