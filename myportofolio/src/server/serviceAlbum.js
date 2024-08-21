const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

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
  console.log('Album Service connected to MongoDB');

});

// Define an Album Schema
const albumSchema = new mongoose.Schema({
  name: String,
  desc: String,
  publicView: Boolean,
  user: String,
  pinned: Boolean
});

// Create a User model
const Album = mongoose.model('Album', albumSchema);

// CRUD Operations

app.post('/album', async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find({});
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/album/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).send();
    }
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/albums/:user', async (req, res) => {
  try {
    const album = await Album.find({ "user": req.params.user });
    if (!album) {
      return res.status(404).send();
    }
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/album/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!album) {
      return res.status(404).send();
    }
    res.status(200).send(album);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/album/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).send();
    }
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Album Service running on port ${port}`);
});
