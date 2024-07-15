const express = require('express');
const { QuestionController } = require('../../controllers');
const { QuestionMiddlewares } = require('../../middlewares');

const router = express.Router();

router.use('/generate', 
        QuestionMiddlewares.validateGenerateQuestionPaperRequest,
        QuestionController.generateQuestionPaper);

module.exports = router;