const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

app.use(cookieParser());

app.get("/", async (req, res) => {
  
  // jwt
  let token = jwt.sign({email: "123@gmail.com"}, "secret")
  res.cookie("token", token)
  res.send("done")

  // new
  // let pass = await bcrypt.hash("hey123", 10);
  // console.log(pass)
  // const result = await bcrypt.compare("hey123", "$2b$08$M/EtEWVf7cMehH.qpGhEmuO.cvAwnv/X4Y8fphZQmQ0pZxMdavv3a");
  // console.log(result);

  // old
  // bcrypt.genSalt(8, function (err, salt) {
  //   bcrypt.hash("hey123", salt, function (err, hash) {
  //     console.log(hash);
  //     res.send("doneee");
  //   });
  // });
  // bcrypt.compare('hey123', "$2b$08$M/EtEWVf7cMehH.qpGhEmuO.cvAwnv/X4Y8fphZQmQ0pZxMdavv3a", (err, result)=>{
  //   console.log(result)
  // } )

});

app.get('/read',(req, res)=>{
    // console.log(req.cookies.token)

    let data = jwt.verify(req.cookies.token, "secret")
    console.log(data)
    res.send('read done')
})

app.listen(3000);
