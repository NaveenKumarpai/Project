import React from 'react'
import { Container, Navbar, Nav, Button} from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import Logo from "../assests/Logo.jpg";
import { Link } from 'react-router-dom';
import "./ExamHeader.css";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
       return navigate('/');
      };
    const handlePackageDetails =() =>{
        return navigate('/PackageDetails');
        };
  return (
   
        <Navbar>
            <Container className='size'>
                <Navbar.Brand><img src={ Logo } alt="Logo"  width={"100px"} height={"100px"}/></Navbar.Brand>
                <Nav className='nav-list'> 
                        <div className='equal'>
                            <Link to={"/Transcations"} >
                                <Button>Transcations</Button>
                            </Link>
                            <Button onClick={handlePackageDetails}>PackageDetails</Button>
                            <Button onClick={handleLogout}>Logout</Button>
                            
                        </div>  
                </Nav>
            </Container>
        </Navbar>   
    
  )
}

export default Header;