const mongoose = require('mongoose');
const Data = require('./models/data');
const fs = require('fs');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jsonData = JSON.parse(fs.readFileSync('./data/jsondata.json', 'utf-8'));

Data.insertMany(jsonData)
  .then(() => {
    console.log('Data imported successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });
