import bodyParser from "body-parser";
import {videoDeleteAllRoutes, videoRoutes} from "./routes/videoRoutes";

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser())
app.use('/videos', videoRoutes)
app.use('/testing/all-data', videoDeleteAllRoutes)
app.listen(port, () => {
    console.log(`Port ${port} is working good !!!`)
})