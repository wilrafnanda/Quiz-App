export const data = {
  "response_code": 0,
  "results": [
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "History",
      "question": "What is the name of the famous Apache leader who died in 1909 at the age of 70?",
      "correct_answer": "Geronimo",
      "incorrect_answers": [
        "Sitting Bull",
        "Red Cloud",
        "Crazy Horse"
      ]
    },
   
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Science &amp; Nature",
      "question": "Which of these Elements is a metalloid?",
      "correct_answer": "Antimony",
      "incorrect_answers": [
        "Tin",
        "Bromine",
        "Rubidium"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "What vehicle in PUBG has the highest top speed?",
      "correct_answer": "Motorcycle",
      "incorrect_answers": [
        "PG-117",
        "Dacia",
        "Buggy"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Cartoon &amp; Animations",
      "question": "In &quot;SpongeBob SquarePants&quot;, what is the name of Sandy Cheek&#039;s place of residence?",
      "correct_answer": "Sandy&#039;s Treedome",
      "incorrect_answers": [
        "&quot;The Dome&quot;",
        "Sandy&#039;s Bubble",
        "Auquatic Reseach Centre"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Books",
      "question": "Who wrote &quot;A Tale of Two Cities&quot;?",
      "correct_answer": "Charles Dickens",
      "incorrect_answers": [
        "Charles Darwin",
        "Mark Twain",
        "Roald Dahl"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Film",
      "question": "What is the correct spelling of the protagonist of the book in The NeverEnding Story (1984)?",
      "correct_answer": "Atreyu",
      "incorrect_answers": [
        "Atrayu",
        "Atraiyu",
        "Atraeyu"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Japanese Anime &amp; Manga",
      "question": "What is Gatomon&#039;s name in the original Japanese version of Digimon Adventure?",
      "correct_answer": "Tailmon",
      "incorrect_answers": [
        "Pawmon",
        "Catmon",
        "Nekomon"
      ]
    }
  ]
}


export function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function transformQuizData(data, shuffleArray) {
    // mapping the data arrey to get each individual data as item
  return data.results.map(( item , index) => {    
    const allAnswers = [
      { text: item.correct_answer, isCorrect: true },
      ...item.incorrect_answers.map(ans => ({ text: ans, isCorrect: false }))
    ];

    return {
      category: item.category,
      id : index,
      question: item.question,
      answers: shuffleArray(allAnswers)
    };
  });
}


export const fetchQuestions = async (url) =>{
      const respond = await fetch(url);
      const data = respond.json()
      return data;
}


export function manipulateScore(time,score, setScore, selectedAnswer){
    if(selectedAnswer.isCorrect){
        if(score <= 0) setScore(0) ;
      
        if(time >= 1 && time <=10){
          setScore(prev => prev + 100);
        
      }else if(time >= 11 && time <= 20){
          setScore(prev => prev + 250);    
        }
      else if(time >= 21 && time <=25){
        setScore(prev => prev + 400);    
     }else{
        setScore(prev => prev + 500);
       }

    }else{
      if(!selectedAnswer.isCorrect)
        if(score <= 0) setScore(0) ;
         if(time >= 1 && time <=10){
         
          setScore(prev => prev - 20);
        
          }else if(time >= 11 && time <= 20){
       
          setScore(prev => prev - 50); 
        }
      else if(time >= 21 && time <=25){
      
        setScore(prev => prev - 60);
        
     }else{
      
        setScore(prev => prev - 30);}
       }
    
}

export function waitAndExecute(duration ,setQuestionNumber) {
  setTimeout(() => {
    setQuestionNumber(prev => prev + 1)
  }, duration);
}

export function scheduleScoreThenNext(time, score, setScore, selectedAnswer, setQuestionNumber){
  setTimeout(() => {
    manipulateScore(time, score, setScore, selectedAnswer);
    waitAndExecute(2000, setQuestionNumber);
  }, 2000);
}




