import React from 'react'
import { Container, Navbar, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../assests/Logo.jpg";

function Header() {
  return (
   
        <Navbar>
            <Container>
                <Navbar.Brand><img src={ Logo } alt="Logo"  width={"100px"} height={"100px"}/></Navbar.Brand>
                <Nav className='nav-list'> 
                    <Link to="/Register"> Register</Link>
                </Nav>
            </Container>
        </Navbar>   
    
  )
}

export default Header;