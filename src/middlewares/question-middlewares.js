const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateGenerateQuestionPaperRequest(req, res, next) {
    if(!req.body.totalMarks || !req.body.difficultyDistribution) {
        ErrorResponse.error = new AppError('One or more required parameters are missing in the incoming request: totalMarks, difficultyDistribution', 400);
        return res
                .status(400)
                .json(ErrorResponse);
    }
    next()
}

module.exports = { 
    validateGenerateQuestionPaperRequest
};