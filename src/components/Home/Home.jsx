import React from 'react';
import PropTypes from 'prop-types';
import QuizCard from '../QuizCard/QuizCard';
import styles from './Home.module.css';

const Home = ({ handleQuizSelection, quizzes, setStudying }) => {
  const handleClick = (questions, title) => {
    setStudying(current => !current);
    handleQuizSelection({ title, questions });
  };
  return (
    <div className={styles.home}>
      <h1>Lets get ready to code!</h1>
      <p>What would you like to work on today?</p>
      {quizzes.length > 0 ? (
        quizzes.map(quiz => (
          <QuizCard key={quiz.title} {...quiz} handleClick={handleClick} />
        ))
      ) : (
        <p>Loading quizzes...</p>
      )}
    </div>
  );
};

Home.propTypes = {
  handleQuizSelection: PropTypes.func.isRequired,
  quizzes: PropTypes.array.isRequired,
  setStudying: PropTypes.func.isRequired,
};

export default Home;
