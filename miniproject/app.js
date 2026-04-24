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
        // console.log("u must be logged in")
        res.redirect('/login')
    }
    try{
        let data = jwt.verify(req.cookies.token, 'secret')
        // console.log(data)
        req.user = data
        next()
    }
    catch(err){
        return res.send("invalid token")
    }
}

// main router fisrt page
app.get('/', (req, res)=>{
    res.render('index')
})

// protect routes
app.get('/profile', isLogged, async (req, res)=>{
    // console.log(req.user)
    // let user = await userModel.findOne({_id: req.user.userid}) // find based on the id
    let user = await userModel.findOne({email: req.user.email})
    await user.populate('posts')
    res.render('profile', {user})

})
app.get('/like/:id', isLogged, async (req, res)=>{
    let post = await postModel.findOne({_id: req.params.id})
    post.likes.push(req.user.userid)
    await post.save()
    res.redirect('/profile')
})

app.post('/post', isLogged, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let {content} = req.body;
    let createdpost = await postModel.create({
        user: user._id,
        content
    })
    user.posts.push(createdpost._id)
    await user.save()
    res.redirect("/profile")

})


// un-protected route
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

    res.redirect('/profile')
    // res.send(createUser)
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
        // res.status(200).send('login successfully!')
        res.redirect('/profile')
    } 
    else{
        res.send('email or password wrong')
    } 
})

Port = 3000
app.listen(3000, ()=>{
    console.log(`server is running on ${Port}`)
})
