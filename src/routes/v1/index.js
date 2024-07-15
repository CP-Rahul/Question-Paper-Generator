const express = require('express');

const questionRoutes = require('./question-routes');

const router = express.Router();

router.use('/questions', questionRoutes);

module.exports = router;