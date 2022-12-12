const {json} = require('express')
const jwt=require('jsonwebtoken')
const cors=require("cors")

const express=require("express")
const app = express()
const bcrypt=require('bcrypt')
const {connection}=require('./config/db')
const {UserModel}=require('./models/User.model')
const {todosRouter}=require("./routes/todos.route")
const {authenicate, authenticate}=require("./middlewares/authentication")


app.use(express.json())
app.use(cors({
    origin:"*"
}))

const port = 9000

app.get('/', (req, res) => {
  res.send('welcome to my new website!')
})

app.post("/signup",async(req,res)=>{
    const {email,password,name,age}=req.body
    
    try{
        bcrypt.hash(password, 5, async function(err, hash) {
           const user=new UserModel({email,password:hash,name,age})
           await user.save()
           res.send("signup successfully")
        });

    }catch(err){
        console.log(err)
        res.send("something is wrong ,try again some time")
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            const hash_password =user[0].password
            bcrypt.compare(password,hash_password, function(err,result){
                if(result){
                    const token=jwt.sign({"userID":user[0]._id},"hash")
                    res.send({"msg":"login successfully","token":token})
                }else{
                    res.send("login failed")
                }
            })
        }
        else{
            res.send("Login failed")
        }
    }
    catch{
        res.send("something went wrong , please try again later")
    }
})

app.get('/about',(req,res)=>{
    res.send("testing")
})

app.use(authenticate)
app.use("/todos",todosRouter)


app.listen(port, async() => {
    try{
        await connection;
        console.log("connected to db successfully")
    }catch(err){
        console.log("errror connecting to Db")
    }
  console.log(`Example app listening on port ${port}`)
})