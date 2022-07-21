///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

//The Express app file

require('./db/mongoose')
const express = require('express')

// Use Router files
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json()) // Express.js automatic parses JSON for us
app.use(userRouter) // Use Router for Users
app.use(taskRouter) // Use Router for Tasks

module.exports = app
