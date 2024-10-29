const express = require('express');
const connectDb = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5001;

// connect to database
connectDb();

// Init
app.use(express.json({ extended: false }))

app.use("/api/users", require("./routes/api/users"));

app.listen(5001,() => console.log(`server started port ${PORT}`))