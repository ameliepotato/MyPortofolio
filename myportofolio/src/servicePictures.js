const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5002;

// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB container
mongoose.connect('mongodb://myportofoliouser:myportofoliopwd@localhost:27017/myportofolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Picture Service connected to MongoDB');

});

// Define an Album Schema
const pictureSchema = new mongoose.Schema({
  name: String,
  desc: String,
  album: String,
  photo: { type: Buffer }
});

// Create a User model
const Picture = mongoose.model('Picture', pictureSchema);

// CRUD Operations

app.post('/pictures', async (req, res) => {
  try {
    const picture = new Picture(req.body);
    await picture.save();
    res.status(201).send(picture);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/pictures', async (req, res) => {
  try {
    const pictures = await Picture.find({});
    res.status(200).send(pictures);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a User by ID
app.get('/pictures/:id', async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).send();
    }
    res.status(200).send(picture);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/pictures/:id', async (req, res) => {
  try {
    const picture = await Picture.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!picture) {
      return res.status(404).send();
    }
    res.status(200).send(picture);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/pictures/:id', async (req, res) => {
  try {
    const picture = await Picture.findByIdAndDelete(req.params.id);
    if (!picture) {
      return res.status(404).send();
    }
    res.status(200).send(picture);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Picture Service running on port ${port}`);
});
