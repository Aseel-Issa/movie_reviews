const cookieParser = require('cookie-parser');
require('dotenv').config();
const express = require('express');
const api = require('./routes/api')
const cors = require('cors')

// cors

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
const port = 8000;
app.use('/', api)

app.listen(port, () => console.log(`Listening on port: ${port}`) );