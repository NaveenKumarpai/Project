import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from "../../Header/Header"

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      name,
      phone,
      password,
      confirmPassword
    };

    try {
      const response = await axios.post('https://test.e-prathibha.com/apis/register', formData);
      const data = response.data;
      console.log(data); 
      
      if(data.status ===200){
        navigate('/verifyEmail', {state: {msg: data.data}});
        
      }else{
        setMsg(data.data);
      }
      

      setEmail('');
      setName('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div>
    <form onSubmit={handleSubmit} className='register'>
      <Header/>
      <h3>Registration</h3>
      <label>Email</label>
      <input
        className='margin'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br/>
      <label>Name</label>
      <input
        className='margin'
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br/>
      <label>Phone</label>
      <input
        className='margin'
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <br/>
      <label>Password</label>
      <input
        className='margin'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br/>
      <label>ConfirmPassword</label>
      <input
        className='margin'
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <br/> 
      <button type="submit">Register</button>
      <Link to="/"><span>Login</span></Link>
      <h6>{msg}</h6>
    </form>
    </div>
  );
};

export default RegistrationForm;
