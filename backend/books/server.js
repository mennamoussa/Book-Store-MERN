const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const DBcon = require('./Config/DBcon');
const cors = require('cors');
DBcon();
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Book Server is listening on port ${port}`);
});
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/books', require('./routes/BookRoutes'));