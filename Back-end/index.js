import express from 'express'
import connect from "./configs/db.js";

const app=express();

app.listen(4000,async (req,res)=>{
    try {
        await connect()
    } catch (error) {
        console.log(error)
    }
    console.log('listening to the port 5000')
})