const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const log = require('log4js').getLogger('application');

const jwt = require('./lib/shared/jwt');
const errorHandler = require('./lib/shared/error-handler');
const logging = require('./lib/logging');
const app = express();

logging.initialize();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use('/users', require('./lib/users/user.controller'));
app.use('/products', require('./lib/products/product.controller'));
app.use('/suppliers', require('./lib/suppliers/supplier.controller'));
app.use('/purchaseorders', require('./lib/purchaseorders/purchaseorder.controller'));
app.use(errorHandler);

const port = process.env.PORT || config.get('port');
app.listen(port, () => {
    log.info("Application Server is running on port:" + port);
})
