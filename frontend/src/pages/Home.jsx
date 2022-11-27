import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Rightbar from '../components/Rightbar'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
width: 100vw;
height: 100%;
background-color: #f6f7f9;
`
const Wrapper = styled.div`
    display: flex;
    width: 80%;
    margin: auto;
    @media only screen and (max-width: 1280px) {
      flex-direction: column;
        }
`
const Left = styled.div`
    flex: 6;
    width: 100%;
    overflow-y:scroll;  
    height: 900px;
    ::-webkit-scrollbar {
  width: 20px;}
  ::-webkit-scrollbar-track {  background-color: transparent;}::-webkit-scrollbar-thumb { background-color: #9b4444;}::-webkit-scrollbar-thumb { background-color: #0e6585;border-radius: 20px;}::-webkit-scrollbar-thumb {background-color: #dfc8c8;border-radius: 20px;border: 6px solid transparent;background-clip: content-box;}::-webkit-scrollbar-thumb:hover {background-color: #b3837f;
}
    `
const Right = styled.div`
    flex: 1.4;
    height: 100%;
`
const Home = () => {
  
  const [posts, setPosts] =useState([])
  const {search} = useLocation()


  useEffect(()=>{
    const getPosts = async()=>{
        const res = await axios.get(`https://hamzakhanblogapp.herokuapp.com/api/posts`+search)
        setPosts(res.data)
    }
    getPosts()
  }, [search])
  return (
    <Container>
      <Header />
      <Wrapper>
        <Left>
          <Posts posts={posts} />
        </Left>
        <Right>
          <Rightbar />
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Home