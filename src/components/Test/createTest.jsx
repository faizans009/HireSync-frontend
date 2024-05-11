

import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from '../Layout/Navbar';

function CreateTest() {
    const navigateTo = useNavigate();
    const [questions, setQuestions] = useState([
        {
            question: '',
            options: [
                { value: '', isAnswer: false },
                { value: '', isAnswer: false },
                { value: '', isAnswer: false },
                { value: '', isAnswer: false }
            ]
        }
    ]);

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].value = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.forEach((option, i) => {
            newQuestions[questionIndex].options[i].isAnswer = i === optionIndex;
        });
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: '',
                options: [
                    { value: '', isAnswer: false },
                    { value: '', isAnswer: false },
                    { value: '', isAnswer: false },
                    { value: '', isAnswer: false }
                ]
            }
        ]);
    };
    
    const handleSubmit = () => {
        const job=localStorage.getItem('jobId')
        axios.post('http://localhost:4000/api/v1/test/createTest/'+job, { questions })
        
            .then(response => {
                console.log('Success:', response.data);
                toast.success('Test created successfully');
                navigateTo("/");
                
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error(error.response.data.message);
            });
    };

    return (
        <div>
            <Navbar />
        
        <div className="testContainer">
            {questions.map((q, index) => (
                <div key={index} className="question">
                    <label>Question</label>
                    <textarea value={q.question} onChange={(e) => handleQuestionChange(index, e.target.value)} />
                    {q.options.map((option, optionIndex) => (
                        <div className='testOptions' key={optionIndex}>
                            <input
                                type="radio"
                                checked={option.isAnswer}
                                onChange={() => handleAnswerChange(index, optionIndex)}
                            />
                            <input
                                type="text"
                                value={option.value}
                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                            />
                            
                        </div>
                    ))}
                </div>
            ))}
            <br />
            <button className='testBtn' onClick={addQuestion}>Add Question</button>
            <button className='testBtn' onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    );
}

export default CreateTest;
