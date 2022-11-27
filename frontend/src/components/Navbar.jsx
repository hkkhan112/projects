import React, { useContext, useState } from 'react'
import '../additionalcss.scss'
import styled from 'styled-components'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {Link } from 'react-router-dom'
import { Context } from '../context/Context';
import {mobile, tablet} from '../responsive'

const Container = styled.div`
    max-width: 100vw;
    z-index: 10;
    background-color: white;
    height: 100px;
    border-bottom: 1px solid lightgray;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
`
const Left = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    `
const Center = styled.div`
flex: 6;
display: flex;
justify-content: space-around;
${tablet({
    flexDirection: 'column',
    position: 'absolute',
    right: '0px',
    top: '-320px',
    transition: '0.3s ease all',
    backgroundColor: '#ebebeb',
    borderRadius: '20px'
})}

`
const Right = styled.div`
flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    `
const Logo = styled.h1`
    font-size: 3em;
    color: #990a16;
    
    border-radius: 10%;
transition: 0.3s ease all;
cursor: pointer;
 
    `   
// const Ul = styled.ul`
// display: flex;
// justify-content: space-around;
// `
const Li = styled.li`
    list-style: none;
    display: flex;
    color: gray;
    align-items: center;
    font-weight: 300;
    flex-direction: column;
    font-size: 1.5rem;
    transition: 0.5s ease all;
    padding: 0px 20px ;
    cursor: pointer;

    &:hover{
        .navbar-icons{

            transition: 0.3s ease all;
            color: #990a16;
        }
        transform: scale(1.2);
        background-color: #d3d3d3;
        border-radius: 5px;
    }
`
const ProfileImage = styled.img`
    height: 4em;
    aspect-ratio: 1;
    border-radius: 50%;
    
    object-fit: cover;
`
const SearchContainer = styled.div`
    border: 1px solid black;
    display: flex;
    align-items: center;
    padding: 7px 7px;
    border-radius: 10px;
    ${mobile({
        display: "none"
})}
    :hover{

    }
`
const SearchInput = styled.input`
    border: none;
    :focus{
        outline: none;
    }
`
const Hamburger = styled.div`
display: none;
${tablet({
  display: 'block'
})}

.hamburger{
    font-size: 4em;
}
`


const Navbar = () => {
    const {user, dispatch} = useContext(Context)
    const handleLogout = ()=>{
        dispatch({type: "LOGOUT"})

    }
    const [menu, setMenu] = useState(false)
    const handleHamburger = ()=>{
       setMenu(prevMenu => !prevMenu)
    }
  return (
    <Container>
         <Left>
            <Link className='link' to="/">
            <Logo>BLOG</Logo>
            </Link>
          
         </Left>
         <Center className={menu && "active"}>
         {/* <Ul> */}
               <Link className='link' to='/'> <Li onClick={()=>setMenu(false)}> <HomeOutlinedIcon className='navbar-icons' fontSize='large'  />Home</Li></Link>
                <Li onClick={()=>setMenu(false)}> <InfoOutlinedIcon className='navbar-icons' fontSize='large'  />About</Li>
                {
                    user &&
                    <Link className='link' to='createpost'>  <Li onClick={()=>setMenu(false)}> <PostAddOutlinedIcon className='navbar-icons' fontSize='large'  />Post</Li></Link>
                }
                <Li onClick={()=>setMenu(false)}> <ContactMailOutlinedIcon className='navbar-icons' fontSize='large'  />Contact</Li>    
               {
                   user ?
                   <Li onClick={handleLogout} > <LogoutOutlinedIcon className='navbar-icons' fontSize='large'  />LOGOUT</Li>
                   :
                  <Link className='link' to="/login"> <Li onClick={()=>setMenu(false)}> <LoginOutlinedIcon className='navbar-icons' fontSize='large'  />LOGIN</Li></Link>
                }
            {/* </Ul> */}
         </Center>
         <Right>
            {
                user &&
                <Link to="/profile">
                <ProfileImage src={user.profilePicture} />
                </Link>
            
            }
        <SearchContainer >
            <SearchInput placeholder='Search here' />
            <SearchOutlinedIcon />
        </SearchContainer>
         </Right>
         <Hamburger onClick={handleHamburger}><MenuIcon  className='hamburger'  /></Hamburger>
    </Container>
  )
}

export default Navbar