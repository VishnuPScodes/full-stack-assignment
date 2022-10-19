import express from 'express';

const router=express.Router();

import User from '../models/user.model.js'


//to send the data to the user =>Read request on the crud operation

router.get('/',async (req,res)=>{
    const page=req.query.page || 1
    const size=req.query.size || 8
    try {
        const users=await User.find().skip((page-1)*size).limit(size).lean().exec(); 
        const totalPages=Math.ceil((await User.find().countDocuments())/size);
        res.status(201).send({data:users,totalPages})
    } catch (error) {
        console.log(error);
    }
})

//to post any new data to the database .=>Create request on the crud operations


router.post('/',async (req,res)=>{
    try { 
        const posts=await User.create(req.body)
        res.send(posts);
    } catch (error) {
        console.log(error)
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
