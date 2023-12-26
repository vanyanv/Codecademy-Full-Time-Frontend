import React from 'react';
import PropTypes from 'prop-types';

const QuizCard = ({ title, questions, handleClick }) => (
  <button key={title} onClick={() => handleClick(questions, title)}>
    {title}
  </button>
);

QuizCard.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuizCard;
