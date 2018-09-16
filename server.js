require('rootpath');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./lib/shared/jwt');
const errorHandler = require('./lib/shared/error-handler');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(jwt());
app.use('/users', require('./lib/users/user.controller'));
app.use('/products', require('./lib/products/product.controller'));
app.use('/suppliers', require('./lib/suppliers/supplier.controller'));
app.use('/purchaseorders', require('./lib/purchaseorders/purchaseorder.controller'));
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, '0.0.0.0', () => {
    console.log("Server started and runni on port:" + port);
})
