//User unit test cases file.

const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const {userOneId, userOne, setupDatabase } = require('./fixtures/db')

//Run before each test case
beforeEach(setupDatabase)

//Run after each test case
// afterEach(()=>{
//     console.log('afterEach')
// })

test('Should signup a new user', async () =>{
    const response = await request(app).post('/users').send({
        name: 'Test3',
        email: 'test3@example.com',
        password: 'abcdefG5567*.2267'
    }).expect(201)

    // Assert that the db was changed correctly
    const user = await User.findById(response.body.user._id) // Get User from response
    expect(user).not.toBeNull() // Check if user is not null

    // Assertions about the response
    //expect(response.body.user.name).toBe('Wasin') //Check only on property
    expect(response.body).toMatchObject({ //Check all properties
        user:{
            name: 'Test3',
            email: 'test3@example.com'
        },
        token: user.tokens[0].token
    })

    //Assert password to not be a plain text
    expect(user.password).not.toBe('Fever5567*.2267')
})

test('Should login existing user', async () =>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Assert if token in response matches users second token (login token, the first is signup token)
    const user = await User.findById(response.body.user._id) // Get User from response
    // console.log(response.body)
    // console.log(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () =>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'userOne.password'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () =>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () =>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assert if user is actually removed
    //console.log(response.body)
    const user = await User.findById(userOneId) // Get User from response
    expect(user).toBeNull()

})

test('Should not delete account for unauthenticated user', async () =>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () =>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user = await User.findById(userOneId)
    //Check object to be the same, toBe use === which two objects are not the same
    expect(user.avatar).toEqual(expect.any(Buffer)) //Check only type to be Buffer
})

//Test update properties
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Test5'
        })
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Test5')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Bangkok'
        })
        .expect(400)
    
})

test('Should not signup user with invalid name/email/password', async () => {
    const response = await request(app).post('/users').send({
        name: 'Test4',
        email: 'test4',
        password: 'password'
    }).expect(400)

})

//Test update properties
test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Test5'
        })
        .expect(401) //401 "Unauthorized"
})