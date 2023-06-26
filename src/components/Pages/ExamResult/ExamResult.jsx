import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ExamResults = ({ server_key, tokenu, id }) => {
  const [examResults, setExamResults] = useState([]);
  const [percent, setPercent] = useState('');
  const [marks, setMarks] = useState('');
 
  const examResultId = localStorage.getItem('examResultId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://test.e-prathibha.com/apis/exam_result',
          { id: examResultId },
          {
            headers: {
              tokenu: tokenu,
              id: id,
              server_key: server_key,
            },
          }
        );
        console.log(response.data);
        console.log(examResultId);
        setExamResults(response.data.data.examDetails.Result.result);
        setPercent(response.data.data.examDetails.Result.percent);
        setMarks(response.data.data.examDetails.Result.obtained_marks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, server_key, tokenu, examResultId]);

  return (
    <div className="container ">
      <div className="text-center naveen">
        <h4 >ExamResult</h4>
        <p>Result: {examResults}</p>
        <p>Marks: {marks}</p>
        <p>Percentage: {percent}</p> 
      </div>
      <div >
        <Link to={`/MyResults`}>
          <button className="btn btn-danger">MyResults</button>
        </Link>
      </div>
    </div>
  );
};

export default ExamResults;
