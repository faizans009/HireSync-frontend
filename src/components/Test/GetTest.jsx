

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../../App.css'; 
import { useNavigate } from "react-router-dom";
const GetTest = () => {
  const [testData, setTestData] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigateTo = useNavigate();
  const [unansweredQuestionsError, setUnansweredQuestionsError] = useState(false);
  useEffect(() => {
    const job = localStorage.getItem('jobId');
    fetch(`http://localhost:4000/api/v1/test/getTest/` + job)
      .then(response => response.json())
      .then(data => {
        setTestData(data.test || []);
        const initialAnswers = (data.test || []).reduce((acc, question) => {
          acc[question._id] = '';
          return acc;
        }, {});
        setAnswers(initialAnswers);
      })
      .catch(error => console.error('Error fetching test data:', error));
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = testData.filter(question => !answers[question._id]);
    if (unansweredQuestions.length > 0) {
      setUnansweredQuestionsError(true);
      return;
    }

    
    const formattedAnswers = testData.map(question => {
        const answerObj = question.options.find(option => option.isAnswer);
        return {
          id: answerObj._id, // Use question ID
          answer: answerObj.value, // Use answer value
        };
      });

    const data = {
      answers: formattedAnswers,
    };
console.log(data)
const job = localStorage.getItem('jobId');
const application=localStorage.getItem('application');
    axios.post(`http://localhost:4000/api/v1/test/submitTest/${job}/${application}`, data)
      .then(response => {
        console.log('Test submitted successfully:', response.data);
        toast.success('Test submitted successfully');
        navigateTo("/")
      })
      .catch(error => {
        console.error('Error submitting test:', error);
        toast.error('Failed to submit test');
      });
  };

  return (
    <div className="test-container">
      {testData.map(question => (
        <div key={question._id} className="question-container">
          <h5>{question.question}</h5>
          <ul>
            {question.options.map(option => (
              <li key={option._id}>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value={option.value}
                    checked={answers[question._id] === option.value}
                    onChange={() => handleAnswerChange(question._id, option.value)}
                  />
                  {option.value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {unansweredQuestionsError && (
      <p className="error-message">Please answer all questions before submitting.</p>
    )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GetTest;
