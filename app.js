const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000;
const {sequelize} = require("./models")
const cors = require("cors")
app.use(cors({origin: "http://localhost:5000"}))
app.use(express.json());
app.use(express.urlencoded());
const userRoutes = require('./routes/users');
const spotRoutes = require('./routes/spots');
const {checkAuth} = require("./middleware/auth");
// precheck database conenction 
(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB OK');
      } catch (error) {
        console.error('DB conenction failed:', error);
      }
})()
app.use('/auth', userRoutes);
app.use('/', checkAuth, spotRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
