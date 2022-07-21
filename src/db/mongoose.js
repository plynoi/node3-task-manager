///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URL

// console.log(connectionURL)

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    //useCreateIndex: true Not supported since Mongoose 6.0
})

