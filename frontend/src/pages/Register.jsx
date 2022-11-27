import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import axios from 'axios'
const Container = styled.div`
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    justify-content: center;
    background-color: #eeeeee;
    /* align-items: center; */
    background: url('https://scontent.fkhi2-3.fna.fbcdn.net/v/t1.15752-9/311487864_616517970261589_363987630641267920_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=ttU1h1aCwvgAX9SEB53&_nc_ht=scontent.fkhi2-3.fna&oh=03_AdQDbDmQi4GDPgLX5gQ5H_ZgChZ8UBhnXOQbALGTMNx-ZQ&oe=639B6220');
    background-size: cover ;
    background-position: center;
    
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
    border-radius: 15px;
    align-items: center;
    background-color: white;
    height: 400px;
    width: 300px;
    justify-content: center;
    
    `
const Username = styled.input`
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
    background-color: #066b0f;
    color: white;
    font-size: 1.2em;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    `
const Title = styled.h1`
    font-size: 3em;
    font-weight: 300;
    color: white;
    

`
const RegisterButton = styled.div`
`

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] =useState(false)
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{

            const res = await axios.post('https://hamzakhanblogapp.herokuapp.com/api/auth/register', {
                username,
                email,
                password
            })
            res.data && window.location.replace('/login')
        }
        catch(err){
            console.log(err)
            setError(true)
        }
    }

  return (
    <Container>
        <Wrapper>
            <Title>REGISTER</Title>
        <Form onSubmit={handleSubmit}>
            <Username placeholder="Username" onChange={e=>setUsername(e.target.value)} />
            <Email placeholder='Email' type="email" onChange={e=>setEmail(e.target.value)} />
            <Password placeholder='Password' type="password" onChange={e=>setPassword   (e.target.value)} />
            
            <LoginButton>Register</LoginButton>
            {error && <span style={{color:'red'}}>ERROR OCCURED</span>}
            <Link to='/login' className='login-link'>
            <RegisterButton>LOGIN</RegisterButton>
            </Link>

        </Form>
        </Wrapper>
    </Container>
  )
}

export default Register    