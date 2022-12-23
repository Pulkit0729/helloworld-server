const Database = require("arangojs").Database;
const env = require("dotenv");
env.config();
const dbURL = process.env.DB;
const dbName = process.env.DB_NAME;
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

let helloworldDb;
module.exports = {
  connectDb: () => {
    // console.log(dbURL, dbName, userName, password);
    const db = new Database(dbURL);

    db.useBasicAuth(userName, password);
    helloworldDb = db.database("helloword");

    return helloworldDb;
  },
  getDB: () => {
    return helloworldDb;
  },
};