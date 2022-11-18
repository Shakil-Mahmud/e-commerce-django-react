import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector }  from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register}  from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const location = useLocation()
    const redirect = location.search?location.search.split('=')[1] :'/';

    const userRegister = useSelector(state=> state.userRegister)
    const {error, loading, userInfo} = userRegister

    const navigate = useNavigate()
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            console.log("passwords do not match")
        }
        else{
            dispatch(register(name, email, password))
        }
        console.log("Submitted")
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger' >{message}</Message>  }
            {error && <Message variant={'danger'} >{error}</Message>  }
            {loading && <Loader /> }

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required 
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange= {(e)=> setName(e.target.value)}
                        ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        required 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange= {(e)=> setEmail(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Passowrd</Form.Label>
                    <Form.Control 
                        required 
                        type='password'
                        placeholder='Enter passowrd'
                        value={password}
                        onChange= {(e)=> setPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Passowrd</Form.Label>
                    <Form.Control 
                        required 
                        type='password'
                        placeholder='Confirm passowrd'
                        value={confirmPassword}
                        onChange= {(e)=> setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className='btn-primary' >Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link
                        to={redirect? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>

        </FormContainer>
  )
}

export default RegisterScreen