import React, { useState } from 'react';
import Answers from '../Answers/Answers';
import Summary from '../Summary/Summary';

import './Quiz.module.css';

// This component displays a quiz
const Quiz = ({ selectedQuiz, setStudying, setScores }) => {
  // 'visibleQuestion' state is used to control which question is currently visible
  const [visibleQuestion, setVisibleQuestion] = useState({
    start: 0,
    visible: 1,
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Destructuring 'questions' and 'title' from 'selectedQuiz'
  const { questions, title } = selectedQuiz;

  // 'currentQuestion' is a slice of the 'questions' array, starting from 'start' and ending before 'visible'
  const currentQuestion = questions.slice(
    visibleQuestion.start,
    visibleQuestion.visible,
  );

  // This function is called when an answer is selected
  const handleAnswerSelection = (selectedAnswer, correctAnswer, question) => {
    if (!isAnswered) {
      //store isAnswerCorrect in a Variable b/c of async
      const isAnswerCorrect = selectedAnswer === correctAnswer;
      setIsAnswered(true);
      setIsAnswerCorrect(isAnswerCorrect);
      if (isAnswerCorrect) {
        setCorrectCount(count => count + 1);
      }
      setAnsweredQuestions(prev => [
        ...prev,
        { question, selectedAnswer, isAnswerCorrect },
      ]);
    }
  };

  // This function is called when the 'Next' button is clicked
  const goToNextQuestion = () => {
    setVisibleQuestion(prev => {
      const newState = { ...prev };
      newState.start += 1;
      newState.visible += 1;
      return newState;
    });
    setIsAnswered(false);
    setIsAnswerCorrect(false);
  };

  if (visibleQuestion.visible > questions.length) {
    return (
      <Summary
        correctCount={correctCount}
        title={title}
        length={questions.length}
        setStudying={setStudying}
        setScores={setScores}
        answeredQuestions={answeredQuestions}
      />
    );
  }

  // The component renders a div that contains the quiz title and the current question
  return (
    <div>
      <h1>{title}</h1>
      {/* Mapping over 'currentQuestion' to render each question */}
      {currentQuestion?.map(
        ({ text, correctAnswer, incorrectAnswers }, index) => {
          // For each question, a Answers component is rendered that contains the question text and a button for each answer
          return (
            <Answers
              key={text}
              text={text}
              index={index}
              correctAnswer={correctAnswer}
              incorrectAnswers={incorrectAnswers}
              handleButtonClick={selectedAnswer =>
                handleAnswerSelection(selectedAnswer, correctAnswer, text)
              }
              isAnswered={isAnswered}
              isAnswerCorrect={isAnswerCorrect}
            />
          );
        },
      )}
      {isAnswered && ( // Only render the "Next" button if the answer is correct
        <div>
          <p>{isAnswerCorrect ? 'Correct!' : 'Incorrect!'}</p>
          <button className="quizButton" onClick={goToNextQuestion}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
