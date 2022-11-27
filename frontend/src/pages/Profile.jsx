import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../context/Context'
import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from '../firebase'

const Container = styled.div`
    min-width: 100%;
    margin-top: 2em;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    `
const Form = styled.form`
    display: flex;
    margin-top: 2em;
    flex-direction: column;
    width: 30em;
    align-items: center;
    height: 400px;
    `
const ProfilePicture = styled.img`
    height: 5em;
    width: 5em;
    border: 4px solid gray;
    border-radius: 10px;
    margin-bottom: 2em;
    cursor: pointer;
    `
const Username = styled.input`
margin-bottom: 2em;
height: 20px;
width: 50%;
border: 1px solid orange;
padding: 10px;
font-size: 1.2em;
:focus{

    outline: 1px solid #ff0015;
}
`
const Email = styled.input`
padding: 10px;
font-size: 1.2em;
border: 1px solid purple;
margin-bottom: 2em;
height: 20px;
width: 50%;
:focus{

outline: 1px solid #ff0015;
}
`
const Password = styled.input`
        padding: 10px;
        margin-bottom: 1em;
        font-size: 1.2em;
        height: 20px;
        width: 50%;
        border: 1px solid blue;
        :focus{

outline: 1px solid #ff0015;
}
        `
const Wrapper = styled.div`
    display: flex;
    width: 30em;
    justify-content: space-between;
    `
const Title = styled.h1`
    
    `
const DeleteButton = styled.button`
    background-color: red;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s ease all;
    :hover{
        transform: scale(1.1);
    }
    `
const UpdateButton = styled.button`
    background-color: #990a16;
    color: white;
    padding: 20px;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s ease all;
    :hover{
        transform: scale(1.1);
    }
    
    `

const Profile = () => {
    const {user, dispatch} = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const PF = "http://localhost:5000/images/"

    const handleSubmit =async (e)=>{
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const newUser = {
            userId: user._id    , 
            username,email,password

        }
        if(file){
            const filename = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;  
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      const updatedUser = {...newUser, profilePicture: downloadURL}
      const uploadFile = async ()=>{
        try {
                    
            const res =  await axios.put('https://hamzakhanblogapp.herokuapp.com/api/users/'+user._id, updatedUser)
            setSuccess(true)
            dispatch({type: "UPDATE_SUCCESS", payload: res.data})
          } catch (error) {
            dispatch({type: "UPDATE_FAILURE", payload: error})
      }
      }
      uploadFile()
    });
}
);
        }
      
      
    }
    return (
        <Container>
        <Wrapper>
            <Title>Update account</Title>
            <DeleteButton>Delete</DeleteButton>
        </Wrapper>
    <Form onSubmit={handleSubmit}>
        <label htmlFor="updatePictureInput">

        <ProfilePicture  src={file ? URL.createObjectURL(file) :    user.profilePicture} />
        </label>
        <Username required minLength={4} onChange={e=>setUsername(e.target.value)} placeholder={user.username} />
        <Email required type="email" onChange={e=>setEmail(e.target.value)} placeholder={user.email}  />
        <Password required type="password" onChange={e=>setPassword(e.target.value)} placeholder="password " />
        <input onChange={(e)=> setFile(e.target.files[0])} id='updatePictureInput' type="file" style={{display : 'none'}} />
        <UpdateButton type='submit'>Update</UpdateButton>
        {
            success &&
            <span style={{color: 'green', marginTop: '1em'}}>SUCCESSFULLY UPDATED </span>
        }
    </Form>
    </Container>
  )
}

export default Profile