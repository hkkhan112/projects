import React from 'react'
import styled from 'styled-components'
import '../additionalcss.scss'

const Container = styled.div`
  display: flex;
  min-width: 100%;
  flex-direction: column;
  margin-top: 7rem;
  align-items: center;
  margin-bottom: 7rem;
  width: 100vw;
  `
const Title = styled.h1`
margin-bottom: 10px;
color: white;
position: absolute;
top: 148px;
font-size: 100px;
z-index: 2;
text-shadow:
        0.07em 0 black,
        0 0.07em black,
        -0.07em 0 black,
        0 -0.07em black;
`

const Image = styled.img`
  position: relative;
  height: 500px;
  width: 100vw;
  object-fit: cover;
  border: 10px solid black;
`

const Header = () => {
  return (
    <Container>
      <Title className='header-title'>Blog</Title>
      <Image src="https://scontent.fkhi2-3.fna.fbcdn.net/v/t1.15752-9/306859720_1244860229389640_2574707415536112338_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=rBRepwObxhkAX_2UCXS&_nc_ht=scontent.fkhi2-3.fna&oh=03_AdThmKj9517tMj6EhgYVvnfhrLO3DYqEG21-I4ehkS54IQ&oe=63987DAD" />
    </Container>
  )
}

export default Header