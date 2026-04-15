const express = require("express")
const app = express();
const userModel = require("./models/user");


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))




app.get('/',(req, res)=>{
    res.render('index')
})

app.get('/read', async (req, res)=>{
    let allusers = await userModel.find()
    res.render('read', {data: allusers})
})

app.post('/create', async(req, res)=>{
    let {name, email, image} = req.body
    await userModel.create({
        name,
        email,
        image 
    })

    res.redirect('/')
})

app.get('/delete/:id', async(req, res)=>{
    await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect('/read')
})

app.get('/edit/:userid', async (req, res)=>{
    let user = await userModel.findOne({_id: req.params.userid})
    res.render('edit', {user})
})

app.post('/update/:userid', async (req, res)=>{
    let {name, email, image} = req.body
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name, email, image})
    res.redirect('/read')
    
})



let PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})