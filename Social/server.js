 import express  from "express";
 import cors from 'cors'
 import mongoose from "mongoose";
 const morgan = require('morgan')
 require('dotenv').config()

//rest obj
 const app = express()

//server setup
mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>console.log("connected to db"))
.catch((err)=>console.log(err))

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.get('/', (req,res)=>{
    res.send(`<h1>App is running</h1>`)
})

//listen port 
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`port is running at ${PORT}`)
})