const express=require("express")
const { TodoModel } = require("../models/Todo.model")
const todosRouter=express.Router();

todosRouter.get("/",async(req,res)=>{
    const todos=await TodoModel.find()
    res.send(todos)
})


todosRouter.post('/create',async(req,res)=>{
    const payload=req.body
    try{
        const new_todo=new TodoModel(payload)
        await new_todo.save()
        res.send({"msg":"todo created successfully"})
    }catch(err){
        res.send({"err":'something wrong'})
    }
})
todosRouter.patch("/update/:todoID", async (req,res)=>{
    const todoID=req.params.todoID
    const userID=req.body.userID
    const todo=await TodoModel.findOne({_id:todoID})
    if(userID !==todo.userID){
        res.send('Not authorised')
    }
    else{
        await TodoModel.findByIdAndUpdate({_id:noteID},payload)
        res.send({"msg":"todo update successfully"})
    }
})
todosRouter.delete('/delete/:todoID',async(req,res)=>{
    const todoID=req.params.todoID
    const userID=req.body.userID
    const todo=await TodoModel.findOne({_id:todoID})
    if(userID !==todo.userID){
        res.send("Not authorised")
    }
    else{
        await TodoModel.findOneAndDelete({_id:todoID})
        res.send({"msg":"note deleted successfully"})
    }
})
module.exports={todosRouter}