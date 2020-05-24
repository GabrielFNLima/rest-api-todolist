require('dotenv/config')
module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "data/dev-db.sqlite3",
    "operatorsAliases": false
  },
  "test": {
    "dialect": "sqlite",
    "storage": "data/test-db.sqlite3",
    "operatorsAliases": false
  },
  "production": {
    "dialect": process.env.DB_DIALECT,
    "host":process.env.DB_HOST,
    "username":process.env.DB_USER,
    "password":process.env.DB_PASS,
    "database":process.env.DB_NAME,
    "operatorsAliases": false
  }
}
