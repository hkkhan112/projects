import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios'
import {Context} from '../context/Context'
import app from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import JoditEditor from 'jodit-react';

const Form = styled.form`
    display: flex;
    background-color: #f0f0f0;
    padding: 20px;
    flex-direction: column;
    margin: auto auto;
`   
const Title = styled.input`
    width: 900px;
    height: 40px;
    margin: auto;
    margin-bottom: 10px;
    font-size: 1.2em;
    outline: none;
    border: none;
    `
const Description = styled.textarea`
outline: none;
border: none;
font-size: 1.2em;
border-radius: 10px;
margin: auto;
height: 400px;
width: 900px;
resize: none;
`
const Picture = styled.input`
`
const Button = styled.button`
    width: 70px;
    height: 40px;
    margin: auto;
`
const H1 = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`
const Image = styled.img`
   height: 80px;
   width: 80px;
   align-self: center;
`


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)
    const editor = useRef(null);
	const [content, setContent] = useState('');

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const newPost = {
            username: user.username, 
            userId: user._id,
            title,
            desc: content

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
      const updatedPost = {...newPost, photo: downloadURL}
      const uploadFile = async ()=>{
          try {
                const res = await axios.post('https://hamzakhanblogapp.herokuapp.com/api/posts', updatedPost)
                window.location.replace('/post/' +res.data._id)
                
            } catch (error) {
            
          }

      }
      uploadFile()
    });
}
);
        }
    }
  return (
        
        <Form onSubmit={handleSubmit}>  
       
            <H1>Add a new Post</H1>
            <Title placeholder='Title' onChange={e=>setTitle(e.target.value)} />
            {/* <Description placeholder='Whats on your mind?' onChange={e=>setDesc(e.target.value)}></Description> */}
            <JoditEditor
			ref={editor}
			value={content}
			onChange={newContent => setContent(newContent)}
		/>
            {
            file && (
                <Image src={URL.createObjectURL(file)}/>
            )
        }

            <label style={{margin:'auto'}} htmlFor="pictureInput"><AddAPhotoIcon /></label>
            <Picture onChange={(e)=> setFile(e.target.files[0])} type="file" id="pictureInput" style={{display: 'none'}} />
            <Button type='submit'>Publish</Button>
        </Form>
  )
}

export default CreatePost