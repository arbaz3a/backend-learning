const express = require("express")
const app = express();
const userModel = require("./usermodel");


app.get('/', (req, res)=>{
    res.send("hey") 
})

app.get('/create', async (req, res)=>{
    let userr = await userModel.create({
        name: "kenni",
        email: "kenni@gmail.com",
        username: "kenee33"
    })
    
    console.log("done", userr) 
})

app.get('/update', async (req, res)=>{
    
    let updatee = await userModel.findOneAndUpdate({username: "ken33"}, {name: "kenny"}, {new: true})
    console.log(updatee) 
})

app.get('/read', async (req, res)=>{
    
    let readd = await userModel.find()
    console.log(readd)
})

app.get('/delete', async (req, res)=>{
    
    let deletee = await userModel.findOneAndDelete({username: "ken33"})
    console.log(deletee) 
})

app.listen(3000);