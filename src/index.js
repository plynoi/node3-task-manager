///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

//The main app file.

//Load Express app
const app = require('./app')

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})


