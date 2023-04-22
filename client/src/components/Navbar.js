import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function TopNav(props) {

  const navigate=useNavigate();
  const [user, setUser] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  axios(
    {
      method: "GET", 
      url: '/profile'
    }).then((response) => {
      const res = response.data
      if (res.session_email !== "") 
      {
        setUser(res.session_email);
        setLoggedin(true)
      } 
    console.log(user) }) 
    .catch ((err) => { console.log(err.response) })


  const brandname = 'evenue'
  if (brandname in props) {
    const brandname = props.brandname
  }

  return (
    <Navbar collapseOnSelect className='mx-auto px-5' expand="lg" sticky="top" style={{height: "50", fontFamily: 'Montserrat', fontWeight: 500, backgroundColor: '#ffbd59'}} >
        <Navbar.Brand href='/'>{brandname}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features"style={{fontSize: '22px'}}>Arts and Theater</Nav.Link>
            <Nav.Link href="#pricing" style={{fontSize: '22px'}}>Movies</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href="/Search" style={{fontSize: '22px'}}>Search</Nav.Link>
            {loggedin ? (<Nav.Link onClick={() => navigate("/organize_event")} style={{fontSize: '22px'}}>Want to organize an event?</Nav.Link>) : 
            (<Nav.Link href="#sports" style={{fontSize: '22px'}}>Sports</Nav.Link>)}
            {loggedin ? (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/chat')}>Chat
            </Nav.Link>):(
            <Nav.Link></Nav.Link>
            )}

            { loggedin && (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/Bookmarks')}>
              View Bookmarks
            </Nav.Link>)}

            { loggedin ? (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/Profile')}>
              Profile
            </Nav.Link>) : (<Nav.Link eventKey={2} style={{fontSize: '22px'}} onClick={() => navigate('/Login')}>
              Login/Signup
            </Nav.Link>) }
            
  
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;