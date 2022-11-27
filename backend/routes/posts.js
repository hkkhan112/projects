const router = require('express').Router();
const Users = require('../models/Users')
const Posts = require('../models/Posts')


//Create a post

router.post('/', async(req,res)=>{
     const newPost = new Posts(req.body)

     try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
     } catch (error) {
        res.status(500).json(error.message)
        console.log(error.message)
     }
    
})
//update a post

router.put('/:id', async(req,res)=>{
        try{
            const post = await Posts.findById(req.params.id)
            if(post.username === req.body.username){
                try {
                    const updatedPost =await Posts.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new:true})

                    res.status(200).json(updatedPost)
                } catch (error) {

                    res.status(500).json(err)
              }
            } 
            else{
                res.status(401).json('you cant update others posts')
            } 
        }   
        catch(err){
            res.status(500).json(err)
        }
})
//delete a post

router.delete('/:id', async(req,res)=>{
        try{
            const post = await Posts.findById(req.params.id)
            if(post.userId === req.body.userId){
                try {
                    const deletedPost = await Posts.findByIdAndDelete(req.params.id)
                    res.status(200).json(`post with ID : ${deletedPost._id} has been deleted`)
                } catch (error) {

                    res.status(500).json(err)
              }
            } 
            else{
                res.status(401).json('you cant delete others posts')
            } 
        }   
        catch(err){
            res.status(500).json(err)
        }
})


//GET A post 

router.get('/:id', async(req,res)=>{
    try {
        const post = await Posts.findById(req.params.id)
        res.status(200).json(post)

      
    } catch (error) {
        res.status(500).json(error)   
    }
})

//GET ALL POSTS

router.get('/', async (req,res)=>{
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts;
        if(username){
            posts = await Posts.find({username})
        }
        else if(catName){
            posts = await Posts.find({categories:{
                $in:[catName]
            }})
        }
        else{
            posts = await Posts.find()
        }
        res.status(200).json(posts)
 } 
 catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router
