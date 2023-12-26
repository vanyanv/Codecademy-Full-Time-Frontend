# Documentation

Hi again! 👋

This is where you'll put a few sentences about the architecture of your code.

-Issues:
-Could not get npm start script to work, so I had to update "react-scripts" to "5.0.1" version to get development mode to run

- In Index.js, all the core state of the application is held. This is also where I make the fetch requests for both the initial quizzes and more quizzes.
- I have organized the React components into general containers for each main section (App, Quiz, Question, Summary) and reusable presentational components (Button, Message).
- I manage the state of the current quiz, current question, and user answers in React state. This allows the components to update and render dynamically based on user interactions.
- I have also done some refactoring to reduce the amount of code in Index.js by creating custom hooks for both the initial fetch request and the initial state of the application.
- Currently, I am not using any state management tool, but as the app grows larger, I could see the use of Context or even Redux necessary due to the amount of state required by multiple different components.
