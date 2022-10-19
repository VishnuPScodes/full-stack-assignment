import express from 'express';

const router=express.Router();

import User from '../models/user.model.js'


//to send the data to the user =>Read request on the crud operation

router.get('/',async (req,res)=>{
    const users=await User.find().lean().exec(); //lean will convert mongoose object to json object!
    res.send(users)

})

//to post any new data to the database .=>Create request on the crud operations

router.post('/',async (req,res)=>{
    try {
        const postUser=new User(req.body);
        await postUser.save();
        res.status(201).send(postUser)     
    } catch (error) {
        res.status(501).send(error);
    }
})

//delete the data from the database =>delete option in the crud operations

router.delete('/:id',async (req,res)=>{
    try {
        const newUser=await User.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send(error)
    }
})

//update the already present data from the database =>update operation in the crud operations

router.patch('/:id',async (req,res)=>{
    try {
        const newUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send(error)
    }
   
})

export default router;
