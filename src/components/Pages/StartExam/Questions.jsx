import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Questions.css';
import ExamHeader from '../../Header/ExamHeader';
import { Button } from 'react-bootstrap';

const Questions = ({ id, tokenu, server_key }) => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://test.e-prathibha.com/apis/start_exam?examId=${examId}`,
          {
            headers: {
              id: id,
              server_key: server_key,
              tokenu: tokenu,
            },
          }
        );
        setQuestions(response.data.data.exam);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [id, tokenu, server_key, examId]);

  const handleSaveAndNext = async () => {
    try {
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        [currentQuestion.ExamStat.ques_no]: selectedOption
      }));

      const data = {
        data: {
          Exam: {
            lang: '1',
            option_selected: selectedOption,
          },
        },
        examId: examId,
        qId: currentQuestion.ExamStat.ques_no,
      };

      const response = await axios.post(
        'https://test.e-prathibha.com/apis/save_ques',
        data,
        {
          headers: {
            tokenu: tokenu,
            id: id,
            server_key: server_key,
          },
        }
      );

      console.log(response.data);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
      } else {
        console.log('All questions answered');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(selectedOptions[currentQuestion.ExamStat.ques_no - 1] || '');
    }
  };

  const handleFinishExam = () => {
    const data = {
      examId: examId,
      qno: 1,
    };

    axios
      .post('https://test.e-prathibha.com/apis/finishExam', data, {
        headers: {
          id: id,
          server_key: server_key,
          tokenu: tokenu,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const examResultId = currentQuestion.ExamStat.exam_result_id;
  localStorage.setItem('examResultId', examResultId);

  return (
    <div className="container">
      <ExamHeader />
      <div className="paper">
        <div>
          <b>Question</b>
        </div>
        <div className="question">
          <span>{currentQuestion.ExamStat.ques_no}.</span>
          <span>{currentQuestion.Question.question.above}</span>
          <div>
            <b>Options</b>
          </div>
          <div className="options">
            <div>
              <input
                type="radio"
                name="option"
                value={currentQuestion.Question.option1}
                checked={selectedOption === currentQuestion.Question.option1}
                onChange={() =>
                  setSelectedOption(currentQuestion.Question.option1)
                }
              />
              {currentQuestion.Question.option1}
            </div>
            <div>
              <input
                type="radio"
                name="option"
                value={currentQuestion.Question.option2}
                checked={selectedOption === currentQuestion.Question.option2}
                onChange={() =>
                  setSelectedOption(currentQuestion.Question.option2)
                }
              />
              {currentQuestion.Question.option2}
            </div>
            <div>
              <input
                type="radio"
                name="option"
                value={currentQuestion.Question.option3}
                checked={selectedOption === currentQuestion.Question.option3}
                onChange={() =>
                  setSelectedOption(currentQuestion.Question.option3)
                }
              />
              {currentQuestion.Question.option3}
            </div>
            <div>
              <input
                type="radio"
                name="option"
                value={currentQuestion.Question.option4}
                checked={selectedOption === currentQuestion.Question.option4}
                onChange={() =>
                  setSelectedOption(currentQuestion.Question.option4)
                }
              />
              {currentQuestion.Question.option4}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button onClick={handlePreviousQuestion}>Previous</button>
        <button onClick={handleSaveAndNext}>Save & Next</button>
      </div>
      <div>
        <Link to="/FinishExam">
          <Button onClick={handleFinishExam} className="question">
            Finish Exam
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Questions;
