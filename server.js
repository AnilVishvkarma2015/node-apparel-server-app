const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');

const jwt = require('./lib/shared/jwt');
const errorHandler = require('./lib/shared/error-handler');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use('/users', require('./lib/users/user.controller'));
app.use('/products', require('./lib/products/product.controller'));
app.use('/suppliers', require('./lib/suppliers/supplier.controller'));
app.use('/purchaseorders', require('./lib/purchaseorders/purchaseorder.controller'));
app.use(errorHandler);

const port = config.get('port');
app.listen(port, () => {
    console.log("Application Server is running on port:" + port);
})
