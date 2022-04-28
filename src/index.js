require('./db/mongoose')
const express = require('express')

// Use Router files
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


app.use(express.json()) // Express.js automatic parses JSON for us
app.use(userRouter) // Use Router for Users
app.use(taskRouter) // Use Router for Tasks

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})


