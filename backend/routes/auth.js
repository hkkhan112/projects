const router = require('express').Router();
const Users = require('../models/Users')
const bcrypt = require('bcrypt')


//REGISTER

router.post('/register', async(req,res)=>{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,

        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// LOGIN

router.post('/login', async(req,res)=>{
    try{
        const user = await Users.findOne({email: req.body.email})
        if(user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json('Wrong Credentials')
            const {password, ...others } = user._doc
            res.status(200).json(others)
        }
        else{
            res.status(400).json('Wrong Credentials')
        }
            
       
    }catch(err){
        console.log(err)
    }
})



module.exports = router
