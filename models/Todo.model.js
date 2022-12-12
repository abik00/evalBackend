
const mongoose=require('mongoose')

const todoSchema=mongoose.Schema({
    taskname:String,
    Status:Boolean,
    tag:String
})

const TodoModel=mongoose.model("todo",todoSchema)
module.exports={
    TodoModel
}