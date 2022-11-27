const express = require('express');
const app  = express();
const dotenv = require('dotenv');
const connectDatabase = require('./db');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const cors = require('cors')
const multer = require('multer')
const path = require("path")

//middlewares

app.use(express.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")))


dotenv.config()
connectDatabase()

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images")
    },
    filename:(req,file,cb)=>{
        cb(null, req.body.name)
    },
})


const upload = multer({storage: storage})
app.post('/api/upload', upload.single("file"),(req,res)=>{
    res.status(200).json('file has been uploaded')
})

//routes

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

app.listen(process.env.PORT , ()=>{
    console.log(`SERVER IS RUNNING `)
})