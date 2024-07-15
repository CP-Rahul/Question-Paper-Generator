const { QuestionService } = require("../services");

async function generateQuestionPaper(req, res) {
    try {
        const questionPaper = await QuestionService.generateQuestionPaper({
            totalMarks: req.body.totalMarks,
            difficultyDistribution: req.body.difficultyDistribution
        });
        return res
                .status(200)
                .json(questionPaper);

    } catch (error) {
        return res
                .status(error.statusCode)
                .json(error.explanation);
    }
}


module.exports = { 
    generateQuestionPaper
}
