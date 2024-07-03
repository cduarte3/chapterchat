require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});