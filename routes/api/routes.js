const express = require('express')
const mongoose = require('mongoose')
const model = require('../..//models/model')

const router = express.Router()

router.get('/get',async (req,res)=>{
    const r = await model.find({}).select("ime")
    res.json(r)
})

router.post('/create',async (req,res)=>{
    const user = req.body
    console.log(user)
    const response = model.create(user)
    res.json({status : "ok"})
})
router.post('/delete', async (req,res)=>{
    const {record} = req.body
    await model.deleteOne({record})
    res.json({status : 'ok'})
    
})
router.post('/edit',async (req,res)=>{
    const {old : oldTodo, new : newTodo} = req.body
    await model.updateOne({
        ime : oldTodo
    },
    {
        $set : {
            ime : newTodo
        }
    })
    res.json({status:'ok'})
    
})



module.exports = router