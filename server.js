const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const log = require('log4js').getLogger('application');
const responseTime = require('response-time');

const jwt = require('./lib/shared/jwt');
const errorHandler = require('./lib/shared/error-handler');
const logging = require('./lib/logging');
const app = express();

logging.initialize();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(responseTime());
app.use('/users', require('./lib/users/user.controller'));
app.use('/products', require('./lib/products/product.controller'));
app.use('/suppliers', require('./lib/suppliers/supplier.controller'));
app.use('/purchaseorders', require('./lib/purchaseorders/purchaseorder.controller'));
app.use('/stocks', require('./lib/stocks/stock.controller'));
app.use('/customers', require('./lib/customers/customer.controller'));
app.use('/sales', require('./lib/sales/sale.controller'));
app.use('/reports', require('./lib/reports/report.controller'));
app.use('/feedbacks', require('./lib/feedbacks/feedback.controller'));
app.use('/utility', require('./lib/shared/index'));
app.use(errorHandler);

const port = process.env.PORT || config.get('port');
app.listen(port, () => {
    log.info("Application Server is running on port:" + port);
})
