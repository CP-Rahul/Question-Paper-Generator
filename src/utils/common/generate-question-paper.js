const AppError = require('../errors/app-error');

function calculateRequiredMarks(totalMarks, percentageDistribution) {
    return Math.floor((totalMarks * percentageDistribution) / 100);
}

function categorizeQuestionsBasedDifficulty(questions, difficulty) {
    return questions.filter(question => question.difficulty === difficulty);
}

function pickQuestions(questions, target) {

    questions.sort((a, b) => a.marks - b.marks);
  
    const pickedQuestions = [];
  
    let found = false;
  
    function backtrack(currentList, startIndex, currentSum) {

      if (found === true) {
        return;
      }

      if (currentSum === target) {
        pickedQuestions.push(...currentList);
        found = true;
        return;
      }
  
      for (let i = startIndex; i < questions.length; i++) {
        let mark = questions[i].marks;
        if (currentSum + mark > target) {
          break;
        }
  
        currentList.push(questions[i]);
        backtrack(currentList, i + 1, currentSum + questions[i].marks);
  
        currentList.pop();
      }
    }
  
    backtrack([], 0, 0);
    return pickedQuestions;
}
  
function generateQuestionPaper(questions, totalMarks, difficultyDistribution) {

    if(difficultyDistribution.Easy + difficultyDistribution.Medium + difficultyDistribution.Hard !== 100) {
        throw new AppError('Invalid difficulty distribution: The sum of all difficulty percentages must equal 100', 400);
    }

    let requiredEasyMark = calculateRequiredMarks(totalMarks, difficultyDistribution.Easy);
    let requiredMediumMark = calculateRequiredMarks(totalMarks, difficultyDistribution.Medium);
    let requiredHardMark = calculateRequiredMarks(totalMarks, difficultyDistribution.Hard);

    let allotedMarks = requiredEasyMark + requiredMediumMark + requiredHardMark;

    if(totalMarks > allotedMarks) {
        let remainingMarks = totalMarks - allotedMarks;
        requiredEasyMark = requiredEasyMark + remainingMarks;
    }

    let easyQuestions;
    if(requiredEasyMark !== 0) {
        easyQuestions = categorizeQuestionsBasedDifficulty(questions, "Easy");
    }

    let mediumQuestions;
    if(requiredMediumMark !== 0) {
        mediumQuestions = categorizeQuestionsBasedDifficulty(questions, "Medium");
    } 

    let hardQuestions;
    if(requiredHardMark !== 0) {
        hardQuestions = categorizeQuestionsBasedDifficulty(questions, "Hard");
    }

    let selectedEasyQuestions;
    if(easyQuestions) {
      selectedEasyQuestions = pickQuestions(easyQuestions, requiredEasyMark);
        if(selectedEasyQuestions.length === 0) {
          throw new AppError('Unable to select easy questions: Requested '+difficultyDistribution.Easy+ '% easy questions, but not enough easy questions are available in the current pool', 404);
        }
    }
    
    let selectedMediumQuestions;
    if(mediumQuestions) {
      selectedMediumQuestions = pickQuestions(mediumQuestions, requiredMediumMark);
      if(selectedMediumQuestions.length === 0) {
        throw new AppError('Unable to select medium questions: Requested '+difficultyDistribution.Medium+ '% easy questions, but not enough medium questions are available in the current pool', 404);
      }
    }

    let selectedHardQuestions;
    if(hardQuestions) {
    selectedHardQuestions = pickQuestions(hardQuestions, requiredHardMark);
    if(selectedHardQuestions.length === 0) {
      throw new AppError('Unable to select hard questions: Requested '+difficultyDistribution.Hard+ '% hard questions, but not enough easy questions are available in the current pool', 404);
    }
    }

    const questionPaper = {
      'Easy': selectedEasyQuestions,
      'Medium': selectedMediumQuestions,
      'Hard': selectedHardQuestions
  }
  return questionPaper;
}

module.exports = generateQuestionPaper;