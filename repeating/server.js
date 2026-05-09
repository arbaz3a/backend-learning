const server = require('./src/app')
const connectDb = require('./src/db/db')


connectDb()



const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})