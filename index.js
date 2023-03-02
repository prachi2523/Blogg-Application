const routers = require('./routers/commonRoutes')
const bodyparser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()
require('./models/config')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routers)

const server=app.listen(6000, () => {
    console.log(`server is listening on port:${process.env.PORT}`);
})

module.exports=server
