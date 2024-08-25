const database = 'myportofolio';
// Create a new database.
use(database);
db.createUser(
    {
      user: "myportofoliouser",
      pwd:  "myportofoliouserpwd", 
      roles: [ { role: "readWrite", db: "myportofolio" } ]
    }
  )