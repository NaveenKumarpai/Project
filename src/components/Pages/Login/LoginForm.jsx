import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Header from "../../Header/Header"

const LoginForm = ( { setId, setTokenu}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [id, setId] = useState('');
  // const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://test.e-prathibha.com/apis/login', {
        email: email,
        password: password,
      });

      const data = response.data;
      
      console.log(data);
      setId(data.data.Id); 
      setTokenu(data.data.Token);
      setMessage(data.data.Message);

      if(data.status === 200){
        navigate('/ExamPage');
      }else{
        setMessage('Invalid Email&Password')
      }
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleFormSubmit} className='text'>
      <Header/>
      <h3>LOGIN</h3>
      <label>Email</label>
      <input
        className='margin'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br/>
      <label>Password</label>
      <input
        className='margin'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <br/>
      
      <button type="submit">Login</button>
      <h5>{message}</h5>
      {/* <h5>ID:{id}</h5>
      <h5>TOKEN:{token}</h5> */}
      
    </form>
    </div>
  );
};

export default LoginForm;
