import React, {useState} from 'react';
// Components
import QuestionCard from './components/QuestionCard';
// Data utilities
import {fetchQuizQuestions} from './utils/utils';
// Types
import {QuestionState, AnswerObject} from './Types';
// Styles
import {GlobalStyle, Wrapper} from './App.styles';

const TOTAL_QUESTION = 40;

function App() {
  // states
  const [loading, setLoading] = useState(false); // Game is loading
  const [questions, setQuestions] = useState<QuestionState[]>([]); // Array of all questions
  const [number, setNumber] = useState(0); // Current question index
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]); // array of question has been answered
  const [score, setScore] = useState(0); // number of correct answers
  const [gameOver, setGameOver] = useState(true); // All the question has been answered  

  // event handler
  const startGame = () => {
    // reset the game
    setGameOver(false);
    // set loading
    setLoading(true);
    // Get questions from the data set
    const newQuestions = fetchQuizQuestions (TOTAL_QUESTION);
    setQuestions(newQuestions);
    // Set the score
    setScore(0);
    // Set user answer array
    setUserAnswers([]);
    // Reset question index
    setNumber(0);
    // Update the game status
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Check if the game is over
    if (!gameOver) {
      // get user answer
      const answer = e.currentTarget.value;      
      // Check user answer againts correct answer list
      const correct = questions[number].correct_answer === answer;
      
      // Adding the score if the answer is correct
      if (correct) {        
        setScore(prev => prev + 1);
      }
      // Save the answer to the list
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObj]);
    }
  }

  const nextQuestion = () => {
    // move to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion >= TOTAL_QUESTION) {
      // last question
      setGameOver(true);
    } else {
      // move next
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1>CANADA FUN FACTS/EVENTS QUIZ</h1>
      {/**
        Only show if game over of end of the question
      */}
      {
        gameOver || userAnswers.length === TOTAL_QUESTION ? (          
          <button className="start" onClick={startGame}>Start</button>
        ) : null
      }    
      {/**
        Only show if not game over
      */}  
      {
        !gameOver ? (<p className="score">Score: {score}</p>) : null
      }
      {/**
       * Only show loading when loading the same
       */}
      {
        loading ? (<p>Loading Questions ...</p>) : null
      }
      {/**
       * Only show the question card when user click on start button
       */}
      
      {
        !loading && !gameOver && <QuestionCard
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        questionNr={number+1}
        totalQuestions={TOTAL_QUESTION}
        callback={checkAnswer}
      />
      }
      {/**
       * Only show next button when user response to the question
       */}
      {
        !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
        ) : null
      }      
      </Wrapper>
    </>
  );
}

export default App;
