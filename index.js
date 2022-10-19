const dotenv = require('dotenv');
dotenv.config({path: "./.env"});
const { sequelize } = require('./models')
const express = require('express');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', movieRouter);

const port = process.env.PORT || 5000;
app.listen({port: port}, async() => {
  console.log(`server listening on port ${port}`)
  await sequelize.authenticate();
  console.log('connected to db successfully...');
})