const express = require('express')
const cors = require('cors')
const rootRouter = require('./Routes/index')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/app/v1', rootRouter)

app.listen(3000, () => console.log('Server is Up!!!!'))