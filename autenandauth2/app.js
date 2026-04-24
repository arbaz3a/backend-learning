const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())



app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/create-user', async (req, res)=>{
    let {username, email, password, age} = req.body;
    let salt = 10;
    let hashpassword = await bcrypt.hash(password, salt)

    let createUsed = await userModel.create({
        username,
        email,
        password: hashpassword,
        age
    })

    //generate token
    let token = jwt.sign({email}, 'secret')
    res.cookie('token', token) // set cookie on browser

    res.send(createUsed)
})


app.get('/logout', (req, res)=>{
    res.cookie('token', '')
    res.redirect('/')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login-user',async (req, res)=>{
    let find = await userModel.findOne({email: req.body.email})
    if(!find) return res.send("something went wrong")

    let bool = await bcrypt.compare(req.body.password, find.password)
    if(bool){
        //generate token
        let token = jwt.sign({email: find.email}, 'secret') 
        res.cookie('token', token) // set cookie on browser
        res.send('login successfully!')
    } 
    else{
        res.send('email or password wrong')
    } 
})



app.listen(3000, ()=>{
    console.log("server is running on 3000")
})
