const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
// const ejs = require('ejs');
connectToMongo();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
// app.get('/',(req,res)=>{res.send('djhg')})
app.use('/', require("./routes/Test3"));
// app.use('/api/notes', require("./routes/Notes"));

// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//  res.render("index.ejs"); // index refers to index.ejs
// });

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
