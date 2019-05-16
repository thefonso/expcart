'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('../src/lib/data/products');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//grab products from server
app.get('/api/products', (req, res) => {
  return res.json(data.products);
});


const PORT = 4000;

app.listen(PORT);
console.log('api running on port ' + PORT + ': ');
