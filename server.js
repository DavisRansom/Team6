const path = require('path');
const express = require('express');


const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;





// Inform Express.js on which template engine to use
app.engine();
app.set();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
