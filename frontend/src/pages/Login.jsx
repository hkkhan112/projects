import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/circularprogress'
import { Context } from '../context/Context';
import axios from 'axios'
const Container = styled.div`
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    justify-content: center;
    /* background-color: #eeeeee;        */
    /* align-items: center; */
    background: url('https://scontent.fkhi2-3.fna.fbcdn.net/v/t1.15752-9/310379087_789587325542519_3510565284581905802_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=xDpSKn6zCYQAX9b-YHK&_nc_ht=scontent.fkhi2-3.fna&oh=03_AdS3nLIWRBvcXJ1tWjigY7vJgvbtDTgvGhh6v9zGVP8Bkg&oe=639B4302');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;    
`
const Wrapper = styled.div`
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    `
const Form = styled.form`
    display: flex;
    
    flex-direction: column;
    align-items: center;
    background-color: white;
    height: 400px;
    border-radius: 15px;
    width: 300px;
    justify-content: center;
    
    `
const Email = styled.input`
    width: 70%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-bottom: 10px;
    :focus{
        outline: 1px solid red;
    }
    font-size: 1.2em;
    `
const Password = styled.input`
margin-bottom: 40px;
padding: 10px;
border-radius: 5px;
border: 1px solid gray;
width: 70%;
:focus{
    outline: 1px solid red;
}

font-size: 1.2em;

`
const LoginButton = styled.button`
    width: 90%;
    height: 40px;
    background-color: #990a16;
    color: white;
    font-size: 1.2em;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    `
const Title = styled.h1`
    font-size: 3em;
    font-weight: 300;
    

`
const RegisterButton = styled.div`
`

const Login = () => {
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState(false)

    const {user, dispatch, isFetching} = useContext(Context)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch({type: 'LOGIN_START'})
        try {
            const res = await axios.post("https://hamzakhanblogapp.herokuapp.com/api/auth/login", {
                email : email.current.value, 
                password : password.current.value
            })
            dispatch({type:'LOGIN_SUCCESS', payload: res.data})
            res.data && window.location.replace('/')
        } catch (error) {
            setError(true)
            dispatch({type:'LOGIN_FAILURE', payload: error})
        }
    }
    console.log(user)
    console.log(isFetching  )
  return (
    <Container>
        <Wrapper>
            <Title>LOGIN</Title>
        <Form onSubmit={handleSubmit}>

            <Email ref={email} placeholder='Email' />
            <Password ref={password} placeholder='Password' />
            <LoginButton type='submit'>{isFetching ? <CircularProgress size="25px" /> : "Login"}</LoginButton>
            {error && <span style={{color: 'red'}}>ERROR OCCURED</span>}
            <Link to='/register' className='register-link'>
            <RegisterButton>Register</RegisterButton>
            </Link>
        </Form>
        </Wrapper>
    </Container>
  )
}

export default Login