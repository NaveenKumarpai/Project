import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./MyResults.css";
// import { useParams } from 'react-router-dom';

const MyResults = ({ server_key, tokenu, id }) => {
  const [results, setResults] = useState([]);
  // const examResultId = localStorage.getItem('examResultId');

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://test.e-prathibha.com/apis/my_result',
          { id: id},
          {
            headers: {
                "tokenu":tokenu,
                "id":id, 
                "server_key": server_key
            },
          }
        );
          console.log(response.data)
        setResults(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, server_key, tokenu]);

  // console.log(results)

  return (
    <div className='container naveen'>
      <h4 className='text-center'>Results</h4>
      {results.map((result, index) => (
        <div key={index} className='line' >
          <div>
            <span>{index+1}.</span>
          </div>
          <div>
          <span>Exam Result: {result.Result.result}</span>
          <p >Percentage: {result.Result.percent}</p>
          </div>
        </div>
      ))}
    </div>
   
  );
};

export default MyResults;
