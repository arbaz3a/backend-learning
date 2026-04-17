const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const postModel = require('./models/post')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())


//middleware
const isLogged = (req, res, next)=>{
    if(!req.cookies.token){
        return res.send("u must be logged in")
    }
    try{
        let data = jwt.verify(req.cookies.token, 'secret')
        req.user = data
        next()
    }
    catch(err){
        return res.send("invalid token")
    }
}

app.get('/', (req, res)=>{
    res.render('index')
})

// protect route
app.get('/profile', isLogged, (req, res)=>{
    console.log(req.user)
    res.send('hello')
})

app.post('/register', async (req, res)=>{
    let {username, email, password, age, name} = req.body;
    let userCheck = await userModel.findOne({email})
    if(userCheck) return res.status(500).send('user already exist')
    
    let salt = 10;
    let hashpassword = await bcrypt.hash(password, salt)

    let createUser = await userModel.create({
        name,
        username,
        email,
        password: hashpassword,
        age
    })

    //generate token
    let token = jwt.sign({email: email, userid: createUser._id}, 'secret')
    res.cookie('token', token) // set cookie on browser

    res.send(createUser)
})

app.get('/logout', (req, res)=>{
    res.cookie('token', '')
    res.redirect('/login')
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
        let token = jwt.sign({email: find.email, userid: find._id}, 'secret') 
        res.cookie('token', token) // set cookie on browser
        res.status(200).send('login successfully!')
    } 
    else{
        res.send('email or password wrong')
    } 
})


app.listen(3000, ()=>{
    console.log("server is running on 3000")
})
