const { QuestionService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function generateQuestionPaper(req, res) {
    try {
        const questionPaper = await QuestionService.generateQuestionPaper({
            totalMarks: req.body.totalMarks,
            difficultyDistribution: req.body.difficultyDistribution
        });
        SuccessResponse.data = questionPaper;
        return res
                .status(200)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function get(req, res) {
    try {
        const questionPaper = await QuestionService.get();
        SuccessResponse.data = questionPaper;
        return res
                .status(200)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}



module.exports = { 
    get,
    generateQuestionPaper
}
