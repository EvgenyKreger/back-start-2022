import bodyParser from "body-parser";
import {fruitsRouter} from "./routes/fruitsRouter";

const port = process.env.PORT || 3000
const express = require('express')
const app = express()
app.use(bodyParser())

app.use('/fruits', fruitsRouter)
app.listen(port,()=>{
    console.log(`Port: ${port} is working !!!`)
})