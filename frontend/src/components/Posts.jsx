import React from 'react'
import styled from 'styled-components'
import Post from './Post'

const Container = styled.div`
`


const Posts = ({posts}) => {
    return (
        <Container>
            {posts.map((p)=>(
                <Post key={p._id} post={p} /> 
            ))}
        </Container>
    )
}

export default Posts