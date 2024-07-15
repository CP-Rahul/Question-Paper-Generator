const createQuestionPaper = require('../utils/common/generate-question-paper');
const questions = require('../utils/common/data');
const AppError = require('../utils/errors/app-error');

async function generateQuestionPaper({totalMarks, difficultyDistribution}) {
    try {
        const questionPaper = createQuestionPaper(questions, totalMarks, difficultyDistribution);
        return questionPaper; 
    } catch (error) {
        if(error instanceof AppError) {
            throw error;
        }
        throw new AppError('Something went wrong while generating question paper', 500);
    }
}

module.exports = {
    generateQuestionPaper
}