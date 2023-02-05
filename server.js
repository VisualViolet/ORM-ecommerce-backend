// Import packages
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;

// Handle data parsing with express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models and turn on the server
sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
