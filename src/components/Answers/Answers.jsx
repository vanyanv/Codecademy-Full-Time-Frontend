import React, { useEffect, useState } from 'react';
import addItemAtRandomPosition from '../../utils/randomPosition';
import styles from './Answers.module.css';

// This component displays the possible answers for a quiz question
const Answers = ({
  text,
  index,
  handleButtonClick,
  correctAnswer,
  incorrectAnswers,
  isAnswered,
}) => {
  const [answersArray, setAnswersArray] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // When the correctAnswer or incorrectAnswers change, update the answersArray
  useEffect(() => {
    setAnswersArray(addItemAtRandomPosition(incorrectAnswers, correctAnswer));
  }, [correctAnswer, incorrectAnswers]);

  // This function is called when an answer button is clicked
  const handleAnswerClick = answerValue => {
    setSelectedAnswer(answerValue);
    handleButtonClick(answerValue);
  };

  return (
    <div className={styles.answers} key={index}>
      <p>{text}</p>
      {/* Mapping over 'answersArray' to render a button for each answer */}
      {answersArray?.map((answer, index) => {
        let className = '';
        if (isAnswered) {
          if (answer === correctAnswer) {
            className = styles.correct;
          } else if (answer === selectedAnswer) {
            className = styles.incorrect;
          }
        }
        const letter = String.fromCharCode(65 + index);
        return (
          <button
            key={answer}
            value={answer}
            onClick={() => handleAnswerClick(answer)}
            className={className}
          >
            <span className="answer-letter">{letter}.</span>
            <span className="answer-text">{answer}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Answers;
