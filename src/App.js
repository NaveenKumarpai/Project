import React from 'react'
import {  Routes, Route, HashRouter } from 'react-router-dom'
import LoginForm from "./components/Pages/Login/LoginForm";
import RegistrationForm from "./components/Pages/Register/RegistrationForm";
import VerifyEmail from './components/Pages/VerifyEmail/VerfiyEmail';
import FreeExamList from './components/Pages/Exam/FreeExamList';
import Questions from './components/Pages/StartExam/Questions';
import { useState } from 'react';
import FinishExam from './components/Pages/FinishExam/FinishExam';
import PageNotFound from './components/Pages/PageNotFound/PageNotFound';
import MyResults from "./components/Pages/MyResults/MyResults";
import ExamResult from "./components/Pages/ExamResult/ExamResult";
import PackageDetails from './components/Pages/PackageDetails/PackageDetails';
import PaymentResponse from './components/Pages/PaymentResponse/PaymentResponse';
import Transcations from './components/Pages/Transcations/Transcations';



function App() {
  
  const [id, setId] = useState(null);
  const [tokenu, setTokenu] = useState(null);
  
  const serverKey ='3w99V63pW7tJ7vavGXtCKo8cp';
  
  return (
    <HashRouter className="image">
    {/* <Header/> */}
    <Routes>
  
      <Route path="/"element={<LoginForm setId={setId} setTokenu={setTokenu}/>}/>
      <Route path='/Register' element={<RegistrationForm/>}/> 
      <Route path='/VerifyEmail' element={<VerifyEmail/>}/>
      <Route path="/ExamPage"element={<FreeExamList id={id} tokenu={tokenu} server_key={serverKey} />}/>
      <Route path="/Questions/:examId" element={<Questions id={id} tokenu={tokenu} server_key={serverKey} />}/>
      <Route path="/FinishExam" element={<FinishExam />}/>
      <Route path="/MyResults" element={<MyResults id={id} tokenu={tokenu} server_key={serverKey}/>}/>
      <Route path="/ExamResult" element={<ExamResult id={id} tokenu={tokenu} server_key={serverKey}/>}/>
      <Route path="/PackageDetails" element={<PackageDetails id={id} tokenu={tokenu} server_key={serverKey}/>}/>
      <Route path="/PaymentResponse" element={<PaymentResponse/>}/>
      <Route path="/Transcations" element={<Transcations id={id} tokenu={tokenu} server_key={serverKey}/>}/>
      <Route path="*" element={<PageNotFound/>} />

      
    

    </Routes>
    </HashRouter>
  )
}

export default App;  