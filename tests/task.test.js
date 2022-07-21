///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

//Task unit test cases file.

const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const {
    userOneId, 
    userOne, 
    userTwoId,
    userTwo, 
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase 
} = require('./fixtures/db')

//Run before each test casew
beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    //console.log(response.body.length)
    expect(response.body).toEqual(expect.any(Array)) //The return data should be array
    expect(response.body.length).toBe(2) //The return 2 tasks
    
})

test('Should not delete other user task', async () => {

    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    // Assert that the task for userOne is not deleted
    const task = await Task.findById(taskOne._id) // Get Task from response
    expect(task).not.toBeNull() // Check if task is not null
})