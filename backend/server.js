const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Database
MongoClient.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true
})
  .then(client => {
    const db = client.db('your_database_name')
    const countersCollection = db.collection('your_collection_name')
    console.log('Connected to Database')
  })


// Heroku deployment compatibility: 
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));