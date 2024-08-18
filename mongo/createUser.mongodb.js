const database = 'myportofolio';
// Create a new database.
use(database);
db.createUser(
    {
      user: "myportofoliouser",
      pwd:  "myportofoliouserpwd",   // or cleartext password
      roles: [ { role: "readWrite", db: "myportofolio" } ]
    }
  )