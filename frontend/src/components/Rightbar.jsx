import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from 'styled-components';

const Container = styled.div`
margin-left: 2em;
@media only screen and (max-width: 400px) {
        display: none;
        }
`
const Wrapper = styled.div`
    width: 100% ;
`
const FeaturedPostsContainer = styled.div`
    background-color: white;
    padding: 2em;
    margin-bottom: 50px;
    `
const FPTitle = styled.h1`
    
    `
const Ul = styled.div`
    display: flex;
    flex-direction: column  ;
    justify-content: space-around;
    height: 250px;
    `

const Li = styled.li`
    list-style: none;
    color: gray;
    cursor: pointer;
    font-size: 1.2em;
    white-space: nowrap;
    font-weight: 500;
    transition: 0.3s ease all;
    
    :hover{
        color: #990a16;
    }
    
    `
const SearchContainer = styled.div`
    padding: 2em;
    `
const SearchTitle = styled.h1`
    margin-bottom: 10px;
    `
const SearchInputContainer = styled.div`
display: flex;
align-items: center;
background-color: white;
padding: 10px;
justify-content: space-between;
transition: 1s ease all;
:hover{

    transform: scale(1.2);
}


`
const SearchInput = styled.input`
    width: 100%;
    font-size: 1.2em;
    border: none;
    :focus{
        outline: none;
        }
    
`
const LatestPostsContainer = styled.div`
    padding: 2em;
`
const LatestPostsTitle = styled.h1`
    
`


const Rightbar = () => {
  return (
    <Container>
        <Wrapper>
            <FeaturedPostsContainer>
                <FPTitle>Featured Posts</FPTitle>
                <Ul>

                    <Li>How to create a Blog</Li>
                    <Li>How to start an online store</Li>
                    <Li>.org vs .com</Li>
                    <Li>How to find out who owns a domain</Li>
                    <Li>Wordpress landing page templates</Li>
                </Ul>
            </FeaturedPostsContainer>
            <SearchContainer>
                <SearchTitle>
                    Search Here
                </SearchTitle>
                <SearchInputContainer className='rightbar-search-container'>
                    <SearchInput  placeholder='Search' />
                    <SearchOutlinedIcon />
                </SearchInputContainer>
            </SearchContainer>
            <LatestPostsContainer>
            <LatestPostsTitle>Latest Posts</LatestPostsTitle>
            <Ul>
                <Li>What is scrolly telling</Li>
                <Li>5 best elementor alternatives</Li>
                <Li>10 Real One Page Website Examples</Li>
            </Ul>
            </LatestPostsContainer>
        </Wrapper>
    </Container>
  )
}

export default Rightbar