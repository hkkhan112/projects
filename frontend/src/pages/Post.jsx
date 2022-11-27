import React from 'react'
import styled from 'styled-components'
import Rightbar from '../components/Rightbar'
import SinglePost from '../components/SinglePost'

const Container = styled.div`
    width: 100%;
height: 100%;
background-color: #f6f7f9;
`
const Wrapper = styled.div`
    display: flex;
    width: 80%;
    margin: auto;
    `
const Left = styled.div`
    flex:6;
    margin-top: 40px;
`
const Right = styled.div`
    flex: 1.4;
    height: 100%;
margin-top: 40px;

`

const Post = () => {
  return (
    <Container>
        <Wrapper>
        <Left>
            <SinglePost />
        </Left>
        <Right>
            <Rightbar />
        </Right>
        </Wrapper>
    </Container>

  )
}

export default Post