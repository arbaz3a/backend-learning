const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

//view engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

app.listen(3000, () => {
    console.log('Server running on 3000');
});