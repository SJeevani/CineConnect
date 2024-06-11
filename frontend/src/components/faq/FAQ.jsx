import React, { useState } from 'react';
import './FAQ.css';

const questionsAnswers = [
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button on the homepage and filling in your details."
  },
  {
    question: "How can I write a movie review?",
    answer: "To write a review, go to the movie's page and click on the 'Add Comment' button. Ensure you are logged in."
  },
  {
    question: "How are movie ratings calculated?",
    answer: "Movie ratings are calculated based on the average of all user ratings for that movie."
  },
  {
    question: "Is there a mobile app available?",
    answer: "No, our app is still in progress. Please wait a few more days for seamless download from App store and Play store."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can contact customer support through the 'Contact' link at the bottom of the page or via the help section in the app."
  },
  {
    question: "What should I do if I encounter a bug?",
    answer: "If you encounter a bug, please report it via the 'Report a Bug' option in the settings menu."
  },
  {
    question:"How can I view the top trending movies?",
    answer:"You can view the top trending movies by sorting the movies based on popularity or by clicking the 'Top 100 Movies' at the bottom of the page. Ensure you are logged in."
  }
];

const FAQ = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-content">
        {questionsAnswers.map((qa, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleQuestion(index)}>
              <span>{index + 1}. {qa.question}</span>
              <span>{selectedQuestionIndex === index ? '-' : '+'}</span>
            </div>
            {selectedQuestionIndex === index && <div className="faq-answer">{qa.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
