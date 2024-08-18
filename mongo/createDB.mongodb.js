/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'myportofolio';
const pictureCollection = 'pictures';
const albumCollection = 'albums';
const userCollection = 'users';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(pictureCollection);
db.createCollection(albumCollection);
db.createCollection(userCollection);

db.createUser(
    {
      user: database + "user",
      pwd:  database + "pwd",  
      roles: [ { role: "readWrite", db: database } ]
    }
  )