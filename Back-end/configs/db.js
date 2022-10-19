import mongoose from "mongoose";




//making the connection with the mongoDb using mongoose 

const connect=(req,res)=>{
    return mongoose.connect('mongodb+srv://vishnu:vishnu123@cluster0.em98tpp.mongodb.net/?retryWrites=true&w=majority')
}

export default connect
