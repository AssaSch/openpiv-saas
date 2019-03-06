const router = require('express').Router();
const openpiv_routes = require('./openpiv.route');
const files_routes = require('./files.route');

router.use('/openpiv', openpiv_routes);
router.use('/upload', files_routes);

module.exports = router;