const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URL

// console.log(connectionURL)

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    //useCreateIndex: true Not supported since Mongoose 6.0
})

