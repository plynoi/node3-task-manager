// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const connectionURL = process.env.DATABASE_URL
const databaseName = process.env.DATABASE_NAME

const {MongoClient, ObjectId } = require('mongodb')

// const id = new ObjectId()
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database!')
    }

    //Mongodb automatic creates database when we access it (if not does not exist)
    const db = client.db(databaseName)

    //findOne Return the first data/
    // db.collection('users').findOne({_id: new ObjectId('61d5a557e972d3d732f90aca')}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch user')
    //     }

    //     console.log(user)
    // })

    //fid Return a cursor to iterate over result. Cursor is a pointer to data. 
    // db.collection('users').find({age: 26}).toArray((error, users)=>{
    //     if(error){
    //                 return console.log('Unable to fetch user')
    //      }

    //      console.log(users)
    // })

    // db.collection('users').find({age: 26}).count((error, count)=>{
    //     if(error){
    //                 return console.log('Unable to fetch user')
    //      }

    //      console.log(count)
    // })

    

    // db.collection('tasks').findOne({_id: new ObjectId('61cb23dc579787fb4995a50e')}, (error, task) => {
    //     if(error){
    //         return console.log('Unable to fetch task')
    //     }
    //     console.log(' Task 1')
    //     console.log(task)
    // })

    

    // db.collection('tasks').find({completed: false}).toArray((error, tasks)=>{
    //     if(error){
    //                 return console.log('Unable to fetch tasks')
    //     }
    //     console.log(' Task 2')
    //     console.log(tasks)
    // })



    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Froy',
    //     age: 20
    // },(error, result) => {
    //     if(error){
    //         return console.log('Mongodb unable to insert user')
    //     }

    //     console.log(result)
    //     console.log(`Insert result: ${result.acknowledged}`)
    //     console.log(`Insert IDs: ${JSON.stringify(result.insertedId)}`) //Insert IDs: [object Object]
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Ply',
    //         age: 26
    //     },
    //     {
    //         name: 'Beam',
    //         age: 26
    //     }
    // ],(error, result) =>{
    //     if(error){
    //         return console.log('Mongodb unable to insert users')
    //     }

    //     console.log(result)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'AA',
    //         age: 30
    //     },
    //     {
    //         name: 'CC',
    //         age: 30
    //     },
    //     {
    //         name: 'BB',
    //         age: 30
    //     },
    //     {
    //         name: 'DD',
    //         age: 30
    //     }
    // ]).then((result)=>{
    //     console.log(`Insert result: ${result.acknowledged} with count ${result.insertedCount}`)
    //     console.log(`Insert IDs: ${JSON.stringify(result.insertedIds)}`) //Insert IDs: [object Object]
    //     console.log(result)
    // }).catch((error)=>{
    //      console.log(`Mongodb unable to insert users: ${error}`)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Write a blog post',
    //         completed: true
    //     },
    //     {
    //         description: 'Edit Franch photos',
    //         completed: false
    //     },
    //     {
    //         description: 'Coding with Udemy',
    //         completed: true
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Mongodb unable to insert users')
    //     }

    //     console.log(`Insert result: ${result.acknowledged} with count ${result.insertedCount}`)
    //     console.log(`Insert IDs: ${JSON.stringify(result.insertedIds)}`) //Insert IDs: [object Object]
    //     console.log(result)
    // })

    // https://docs.mongodb.com/drivers/node/current/usage-examples/updateOne/
    // https://docs.mongodb.com/manual/reference/operator/update-field/
    // db.collection('users').updateOne({
    //     _id: new ObjectId('61cb1f302cd6106680274b11')
    // }, {
    //     // $set:{
    //     //     name: 'Ply Ply'
    //     // }
    //     $inc:{
    //         age: 2 //Increase age by 2
    //     }
    // }).then((result)=>{
    //     console.log(`Update DB success!: ${JSON.stringify(result)}`)
    // }).catch((error)=>{
    //     console.log(`Update DB error!: ${error}`)
    // })

    // https://docs.mongodb.com/drivers/node/current/usage-examples/updateMany/
    // https://docs.mongodb.com/manual/reference/operator/update-field/
    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set:{
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(`Update DB success!: ${JSON.stringify(result)}`)
    // }).catch((error)=>{
    //     console.log(`Update DB error!: ${error}`)
    // })

    // db.collection('users').deleteMany({
    //     age : 30
    // }).then((result)=>{
    //     console.log(`Delete DB success!: ${result}`)
    // }).catch((error)=>{
    //     console.log(`Delete DB error!: ${error}`)
    // })

    db.collection('tasks').deleteOne({
        description: 'Edit Bangkok photos'
    }).then((result)=>{
        console.log(`Delete DB success!: ${JSON.stringify(result)}`)
    }).catch((error)=>{
        console.log(`Delete DB error!: ${error}`)
    })

})


