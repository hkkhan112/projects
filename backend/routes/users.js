const router = require('express').Router();
const Users = require('../models/Users')
const Posts = require('../models/Posts')
const bcrypt = require('bcrypt')


//Update a user

router.put('/:id', async(req,res)=>{
        if(req.body.userId=== req.params.id){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
                     
            }
            try{
                const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedUser)
            }
            catch(err){
                console.log(err)
            }
        }   
        else{
            res.status(401).json('you cant update others account')
        }
    
})
//Delete a user

router.delete('/:id', async(req,res)=>{
        if(req.body.userId=== req.params.id){
            try {
                const user = await Users.findById(req.params.id)
                if(user){
                    await Posts.deleteMany({username: user.username})
                }
                else{
                    res.status(400).json('user not found')
                }
                
           
                const deletedUser = await Users.findByIdAndDelete(req.params.id)
                 
                res.status(200).json(`${deletedUser.username} has been deleted`)
            }
            catch(err){
                console.log(err)
            }
        }   
        else{
            res.status(401).json('you cant delete others account')
        }
    
})


//GET A USER 

router.get('/:id', async(req,res)=>{
    try {
        const user = await Users.findById(req.params.id)
        if(user){
            const {password, ...others} = user._doc
            res.status(200).json(others)
        }

        else{
            res.status(400).json('user not found')
        }
    } catch (error) {
        res.status(500).json(err)   
    }
})






module.exports = router
