const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5003;

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
  console.log('User Service connected to MongoDB');

});

// Define a User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, "email required!"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password required!"]
  },
  username: {
    type: String,
    required: [true, "username required!"],
    unique: true
  },
  dateCreated: { type: Date, default: Date.now }
});

// Create a User model
const User = mongoose.model('User', userSchema);

// CRUD Operations

// Create a new User
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a User by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a User by name
app.get('/users/:username', async (req, res) => {
  try {
    const user = await User.find({ "username": req.params.username });
    console.log(user);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update a User by ID
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    console.log(user);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a User by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
