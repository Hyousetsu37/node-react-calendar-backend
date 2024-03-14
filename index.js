const express = require('express');
const { dbConncection } = require('./database/config');
const cors = require('cors');

//* Create Express server
const app = express();

//* DataBase
dbConncection();

//* CORS
app.use(cors());

//*Public directory
app.use(express.static('public'));

//* Read and parse requests
app.use(express.json());

//*Routes
app.use('/api/auth', require('./routes/auth'));

//*Listen to request
app.listen(process.env.PORT, () => {
  console.log(`Server running in port ${process.env.PORT}`);
});
