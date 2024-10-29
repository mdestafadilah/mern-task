const express = require('express');
const connectDb = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5001;

// connect to database
connectDb();

// Testing route :)
app.get("/", (req,res) => res.send('Hello, world'))

app.listen(5001,() => console.log(`server started port ${PORT}`))