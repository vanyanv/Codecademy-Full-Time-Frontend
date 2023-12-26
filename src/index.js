import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import {
  useHandleMoreQuizzes,
  useInitializeQuizzes,
} from './hooks/useQuizHooks';

import './styles.css';

const App = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [studying, setStudying] = useState(false);
  const [scores, setScores] = useState({});

  //selects the current quiz and sets it in state to
  const handleQuizSelection = quiz => {
    setSelectedQuiz(quiz);
  };

  useInitializeQuizzes(setQuizzes, setScores, setLoading);
  useHandleMoreQuizzes(scores, setQuizzes, setLoading);

  return (
    <div className="app">
      {studying ? (
        <Quiz
          selectedQuiz={selectedQuiz}
          setStudying={setStudying}
          setScores={setScores}
          loading={loading}
        />
      ) : (
        <Home
          quizzes={quizzes}
          handleQuizSelection={handleQuizSelection}
          setStudying={setStudying}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
