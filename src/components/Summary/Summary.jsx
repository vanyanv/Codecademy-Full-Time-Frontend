import React, { useState, useEffect } from 'react';
import { getMessage } from '../../data/messages';
import { QuestionSummary } from '../QuestionSummary/QuestionSummary';
import styles from './Summary.module.css';

// This component displays a summary of the quiz results
const Summary = ({
  correctCount,
  title,
  length,
  setStudying,
  setScores,
  answeredQuestions,
}) => {
  const [message, setMessage] = useState('');

  // This function is called when the 'Next' button is clicked
  const handleEndQuiz = () => {
    //update the Score
    setScores(prevScores => ({
      ...prevScores,
      [title]: {
        ...prevScores[title],
        score: correctCount,
      },
    }));
    setStudying(false);
  };

  useEffect(() => {
    // This function fetches a message from the API
    const fetchMessage = async () => {
      try {
        const fetchedMessage = await getMessage();
        setMessage(fetchedMessage);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchMessage function when the component mounts
    fetchMessage();
  }, []);

  return (
    <div className={styles.summary}>
      <h1>{title}</h1>
      <p>
        You got <b>{correctCount}</b> of <b>{length}</b> questions right.
      </p>
      <p>{message}</p>
      <QuestionSummary answeredQuestions={answeredQuestions} />
      <button onClick={handleEndQuiz} className={styles['summary button']}>
        Next
      </button>
    </div>
  );
};

export default Summary;
