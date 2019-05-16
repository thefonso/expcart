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

//add product to server
app.post('/api/products', (req, res) => {
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});


const PORT = 4000;

app.listen(PORT);
console.log('api running on port ' + PORT + ': ');
