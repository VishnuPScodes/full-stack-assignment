import express from 'express'
import connect from "./configs/db.js";
import userController  from './controllers/user.controller.js'
const app=express();

app.use(express.json())

app.use('/users',userController)

app.listen(4000,async (req,res)=>{
    try {
        await connect()
    } catch (error) {
        console.log(error)
    }
    console.log('listening to the port 5000')
})