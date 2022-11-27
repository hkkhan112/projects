import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Context } from '../context/Context';

const Container = styled.div`
  background-color: white;
  padding: 30px;
`
const Wrapper = styled.div`
`
const Image = styled.img`
  width: 100%;
  height: 400px;
`
const Title = styled.h1`
  padding: 10px;
`
const Description = styled.p`
  padding: 10px;
  font-size: 1.2em;
`
const InfoWrapper = styled.div`
margin-top: 15px;
display: flex;
justify-content: space-between;
` 
const Author = styled.span`
color: #990a16;
padding: 10px;  
:hover{
  text-decoration: underline;
}
` 
const PostDate = styled.span`
color: #990a16;
padding: 10px;
:hover{
  text-decoration: underline;
}
` 

const SinglePost = () => {
  const [post, setPost] = useState({})
  const {user} = useContext(Context)
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  useEffect(()=>{
    const getPost = async()=>{
        const res = await axios.get(`https://hamzakhanblogapp.herokuapp.com/api/posts/${path}`)
        setPost(res.data)
      }
      getPost()
console.log(post) 
  },[path])

  const handleDelete = async () =>{
    try{
      await axios.delete('https://hamzakhanblogapp.herokuapp.com/api/posts/'+path, {data:{userId: user._id  }})
      window.location.replace("/")
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <Container>
      <Wrapper>
        {
        post.photo && 
        <Image src={post.photo} />
        }
        <InfoWrapper>
          <Link className='link' to={"/?user="+post.username} >
          <Author>Author : <b>{post.username}</b></Author>
          </Link>
          <PostDate>{new Date(post.createdAt).toDateString()}</PostDate>
        </InfoWrapper>
        
         {
           post.userId === user?._id &&

        <DeleteIcon style={{cursor: 'pointer'}} onClick={handleDelete} />
      } 
         {
          post.userId === user?._id &&

        <EditIcon style={{cursor: 'pointer'}}/>
      } 
      
          
          
        
        <Title>{post.title}</Title>
        <Description>{post.desc}</Description>
      </Wrapper>
    </Container>
  )
}

export default SinglePost