# Question Paper Generator

## Description

A node backend that generates a question paper from the Question Store, based on the provided total marks and the distribution of marks across Easy, Medium, and Hard difficulty levels.

**Example**

Assume the below requirement for a question paper:

{
"totalMarks": 100,
"difficultyDistribution": {
"Easy": 20,
"Medium": 50,
"Hard": 30
}
}

The problem statement here is that you need to generate a question paper of 100 marks total of which 20% (ie, 20 marks) worth of questions should have the Difficulty=Easy, 50% having Difficulty=Medium and 30% having Difficulty=Hard

## Setup the project

- Download project from github and open it in your favourite code editor.

### Requirements

- Node.js (v12 or higher)

### backend

- Go inside the backend folder and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  example:

  ```
    PORT=3000
  ```

- To run the server execute

```
npm start
```

### Folder Structure

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests.

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `services` -> contains the buiness logic and interacts with repositories for data from the database

- `utils` -> contains helper methods, error classes, dummy data etc.

### Api End Points

- ` http://localhost:3000/api/v1/questions/generate` -> Generates a question paper based on total marks and difficulty distribution

#### Examples

Case 1: If all requirements are fulfilled :

- Request Body

  ```
  {
    "totalMarks": 100,
    "difficultyDistribution": {
        "Easy": 30,
        "Medium": 40,
        "Hard": 30
    }
  }

  ```

- Response
  ```
  {
    "success": true,
    "msg": "Successfully completed the request",
    "data": {
        "Easy": [
            {
                "question": "q2",
                "category": "Physics",
                "subCategory": "Optics",
                "difficulty": "Easy",
                "marks": 5
            },
            {
                "question": "q3",
                "category": "Mathematics",
                "subCategory": "Algebra",
                "difficulty": "Easy",
                "marks": 5
            },
            {
                "question": "q4",
                "category": "Physics",
                "subCategory": "Electricity",
                "difficulty": "Easy",
                "marks": 5
            },
            {
                "question": "q1?",
                "category": "Physics",
                "subCategory": "Waves",
                "difficulty": "Easy",
                "marks": 15
            }
        ],
        "Medium": [
            {
                "question": "q7",
                "category": "Biology",
                "subCategory": "Genetics",
                "difficulty": "Medium",
                "marks": 10
            },
            {
                "question": "q9",
                "category": "History",
                "subCategory": "World War II",
                "difficulty": "Medium",
                "marks": 10
            },
            {
                "question": "q11",
                "category": "Chemistry",
                "subCategory": "Inorganic Chemistry",
                "difficulty": "Medium",
                "marks": 20
            }
        ],
        "Hard": [
            {
                "question": "q15",
                "category": "History",
                "subCategory": "Ancient Civilizations",
                "difficulty": "Hard",
                "marks": 5
            },
            {
                "question": "q16",
                "category": "Computer Science",
                "subCategory": "Algorithms",
                "difficulty": "Hard",
                "marks": 10
            },
            {
                "question": "q12",
                "category": "Computer Science",
                "subCategory": "Data Structures",
                "difficulty": "Hard",
                "marks": 15
            }
        ]
    },
    "error": {}
  }
  ```

Case 2: If parameters are missing in the request:

- Request Body

  ```
  {
    "difficultyDistribution": {
        "Easy": 30,
        "Medium": 40,
        "Hard": 30

    }
  }

  ```

- Response
  ```
  {
    "success": false,
    "msg": "Something went wrong",
    "data": {},
    "error": {
        "statusCode": 400,
        "explanation": "One or more required parameters are missing in the incoming request: totalMarks, difficultyDistribution"
    }
  }
  ```

Case 3: If invalid difficulty distribution:

- Request Body

```
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "Easy": 30,
        "Medium": 40,
        "Hard": 70

    }
}
```

- Response

```
{
    "success": false,
    "msg": "Something went wrong",
    "data": {},
    "error": {
        "statusCode": 400,
        "explanation": "Invalid difficulty distribution: The sum of all difficulty percentages must equal 100"
    }
}
```

Case 4: If unable to find easy questions with the given contribution:

- Request Body

```
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "Easy": 60,
        "Medium": 30,
        "Hard": 10

    }
}
```

- Response

```
{
    "success": false,
    "msg": "Something went wrong",
    "data": {},
    "error": {
        "statusCode": 404,
        "explanation": "Unable to select easy questions: Requested 60% easy questions, but not enough easy questions are available in the current pool"
    }
}
```

Case 5: If unable to find medium questions with the given contribution:

- Request Body

```
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "Easy": 10,
        "Medium": 80,
        "Hard": 10

    }
}
```

- Response

```
{
    "success": false,
    "msg": "Something went wrong",
    "data": {},
    "error": {
        "statusCode": 404,
        "explanation": "Unable to select medium questions: Requested 80% easy questions, but not enough medium questions are available in the current pool"
    }
}
```

Case 6: If unable to find hard questions with the given contribution:

- Request Body

```
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "Easy": 10,
        "Medium": 20,
        "Hard": 70

    }
}
```

- Response

```
{
    "success": false,
    "msg": "Something went wrong",
    "data": {},
    "error": {
        "statusCode": 404,
        "explanation": "Unable to select hard questions: Requested 70% hard questions, but not enough easy questions are available in the current pool"
    }
}
```
