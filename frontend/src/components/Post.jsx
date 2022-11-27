import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    background-color: white;
    padding: 3em;
    margin-bottom: 20px ;
    @media only screen and (max-width: 720px) {
        flex-direction: column;
        }
`
const Left = styled.div`
    flex: 2;
`
const Right = styled.div`
    flex: 4;
   
`
const Image = styled.img`
    max-width: 300px;
    margin-right: 1em;
   aspect-ratio: 2;
    transition: 0.3s ease all;
    cursor: pointer;
   :hover{
    filter: blur(5px);
   }

`
const Title = styled.h1`
    font-size: 1.5em;
    color: #424242;
    cursor: pointer;
    transition: 0.5;
    :hover{
        color: #990a16;
    }
`
const Description = styled.p`
    color: gray;
    font-weight: 500;
    padding: 15px 5px;
    font-size: 1em;
    @media only screen and (max-width: 772px) {
        display: none;
        }
`

const Post = ({post}) => {
  return (
    <Wrapper>
        {
            post.photo &&
    <Left>
        <Image src={post.photo} />
    </Left>
        }
    <Right>
        <Link className='link' to={`/post/${post._id}`}>
        <Title>{post.title}</Title>
        </Link>
        <Description>{post.desc}</Description>
    </Right>
</Wrapper>
  )
}

export default Post