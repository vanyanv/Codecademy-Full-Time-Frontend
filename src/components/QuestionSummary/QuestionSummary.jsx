import React from 'react';
import styles from './QuestionSummary.module.css';

export const QuestionSummary = ({ answeredQuestions }) => {
  return (
    <div className={styles.questionSummary}>
      <h3>You had:</h3>
      {answeredQuestions.map((question, index) => {
        return (
          <p key={index} className={styles.questionSummaryP}>
            {index + 1}. {question.question}{' '}
            <span
              className={
                question.isAnswerCorrect
                  ? styles.correctAnswer
                  : styles.incorrectAnswer
              }
            >
              {question.selectedAnswer}
            </span>
          </p>
        );
      })}
    </div>
  );
};
