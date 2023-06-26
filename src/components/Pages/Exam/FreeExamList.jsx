import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExamHeader from "../../Header/ExamHeader"

const FreeExamList = ({ server_key, tokenu, id }) => {

  const [exams, setExams] = useState([]);
  
  useEffect(() => {
    const fetchExams = async () => {
      try{
        const response = await axios.post(
          "https://test.e-prathibha.com/apis/test_free_exam",
          {},
          {
            headers: {
                "tokenu":tokenu,
                "id":id,
                "server_key": server_key
            },
          }
        );

        console.log(response.data);
        setExams(response.data.data.exams);
        // console.log(tokenu);
        // console.log(id);
        // console.log(serverKey);
      } catch (error) {
        console.error(error);
      }  
    };

    fetchExams();
  }, [id, server_key, tokenu]);

  if (!Array.isArray(exams)) {
    return (
      <div>No exams found.</div>
    );
  }
  return(
    <div className='container'>
      <ExamHeader/>
      {exams.map((question, index) =>{
        const questionPaper = Object.keys(question)[0];
        return (
          <div key={index}>
            <h4>{questionPaper}</h4>
            {
              question[questionPaper].map((paperList, index) =>{
                return(
                  <div key={index} >
                    <p>
                      <b>ID:</b>{paperList['Exam']['id']} ||    
                      <b>Exam Year:</b>{paperList['Exam']['name']} ||
                      <b>Duration:</b>{paperList['Exam']['duration']}
                    </p>
                    
                    <Link to={`/Questions/${paperList['Exam']['id']}`}><button>Start Exam</button></Link>
                  </div>
                );
              })
            }
          </div>
        );
        
      })}
    </div>
  );
};

export default FreeExamList;