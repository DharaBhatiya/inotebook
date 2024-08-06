const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

connectToMongo();

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
