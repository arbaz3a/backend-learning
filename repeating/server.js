const server = require('./src/app')
const connectDb = require('./src/db/db')
require('dotenv').config();

connectDb()


const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})