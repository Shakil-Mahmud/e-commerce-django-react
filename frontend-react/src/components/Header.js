import React from 'react'
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import logo from './resources/img/logo.png'
import {logout} from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state=> state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ExlopeJP</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto'>
          
            <LinkContainer to="/cart">
              <Nav.Link><i className='fas fa-shopping-cart'>cart</i> </Nav.Link>
            </LinkContainer>

            {userInfo ? 
              (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                </NavDropdown>
              ) :
              (
                <LinkContainer to="/login">
                  <Nav.Link ><i className='fas fa-user'>login</i> </Nav.Link>
                </LinkContainer>
              )
            }  
            
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header