import { useEffect } from 'react';
import { getQuizzes, getMoreQuizzes } from '../data/quizzes';

// This hook is used to initialize quizzes and scores
export const useInitializeQuizzes = (setQuizzes, setScores, setLoading) => {
  useEffect(() => {
    const handleGetQuizzes = async () => {
      // Set loading to true before fetching more quizzes
      setLoading(true);
      try {
        // Fetch quizzes from the given API
        const fetchedQuizzes = await getQuizzes();
        // Update the quizzes state
        setQuizzes(fetchedQuizzes);

        // Initialize scores for each quiz
        const initialScores = {};
        fetchedQuizzes.forEach((quiz) => {
          initialScores[quiz.title] = {
            score: 0,
            questions: quiz.questions.length,
          };
        });
        // Update the scores state
        setScores(initialScores);
      } catch (error) {
        console.log(error);
      }
      // Set loading to false after fetching more quizzes
      setLoading(false);
    };

    // Call the function to get quizzes
    handleGetQuizzes();
  }, [setQuizzes, setScores, setLoading]); // This hook depends on setQuizzes and setScores, setLoading
};

// This hook is used to handle loading more quizzes when all quizzes are completed
export const useHandleMoreQuizzes = (scores, setQuizzes, setLoading) => {
  useEffect(() => {
    const handleMoreQuizzes = async () => {
      // Set loading to true before fetching more quizzes
      setLoading(true);
      try {
        // Fetch more quizzes from the API
        const fetchedQuizzes = await getMoreQuizzes();
        // Update the quizzes state with the newly fetched quizzes
        setQuizzes((prev) => [...prev, ...fetchedQuizzes]);
      } catch (error) {
        console.log(error);
      }
      // Set loading to false after fetching more quizzes
      setLoading(false);
    };

    // Check if all quizzes are completed
    // A quiz is considered completed if the score is equal to the number of questions
    const allQuizzesCompleted =
      Object.keys(scores).length > 0 &&
      Object.values(scores).every((quiz) => quiz.score === quiz.questions);

    // If all quizzes are completed, fetch more quizzes
    if (allQuizzesCompleted) {
      handleMoreQuizzes();
    }
  }, [scores, setQuizzes, setLoading]); // This hook depends on scores, setQuizzes, and setLoading
};
