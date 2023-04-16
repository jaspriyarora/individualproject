const express = require('express');
let router = express.Router();
const test = require('../models/Test2');
const { body, validationResult } = require('express-validator');

router.post('/addData', [
    body('data', 'Enter a valid Name'),
    body('status', 'Enter a valid email'),
] , async (req, res)=>{
    // return if there is error
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        success=false
        return res.status(400).json({success,errors: errors.array()});
    }
    // check whether user is already registered or not
    try {

        
        // create a new user
        const note = new test({
            data:req.body.data,status:req.body.status
        })
    
    
        const saveNote = await note.save();
        res.json({saveNote})


    }
    catch (error) {
        console.log("error"+error)
        res.status(500).send("Error")}
})

router.get('/getData', async(req, res)=> {
    try {
        const notes = await test.find({});
        res.json(notes)   
    } catch (error) {
        return res.status(500).send({error:"error occured"})
    }
})

module.exports=router