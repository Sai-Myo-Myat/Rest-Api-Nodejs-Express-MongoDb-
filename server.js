const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DBTABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("err",err.message)
})

db.once('open', () => {
  console.log("database is connected")
})

app.use(express.json())

const subscriber = require("./routes/subscriber");

app.use('/subscribers', subscriber);

app.listen(3000, () => {
  console.log("server is started")
})
