// // users-service/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('User Service is running');
// });

// // Connect to MongoDB
// const PORT = process.env.PORT || 5001;

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('User Service: Connected to MongoDB');
//     app.listen(PORT, () =>
//       console.log(`User Service running on port ${PORT}`)
//     );
//   })
//   .catch((err) => console.error(err));

  
//------------
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./Middleware/ErrorHandler');
const DBcon = require('./Config/DBcon');
const cors = require('cors');
DBcon();
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Users Server is listening on port ${port}`);
});
app.use(errorHandler);
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/users', require('./routes/UserRoutes'));

