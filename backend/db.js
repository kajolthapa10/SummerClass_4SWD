require('dotenv').config();
const { createClient } = require('@libsql/client');
 
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
 
async function get(sql, args = []) {
  const result = await db.execute({ sql, args });
  return result.rows[0];
}
 
async function all(sql, args = []) {
  const result = await db.execute({ sql, args });
  return result.rows;
}
 
async function init() {

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)
`);

db.exec(`
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nationality TEXT
)
`);

db.exec(`
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
)
`);

db.exec(`
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT,
  genre TEXT,
  stock INTEGER DEFAULT 0,
  description TEXT
)
`);

console.log(`✅ Database connected (${dbFile})`);
console.log(`Database connected sucessfuly (Turso)`)
}

async function run(sql, args = []) {
  const result = await db.execute({ sql, args });
  return {
    // Turso returns this as a BigInt — JSON.stringify cannot
    // serialize BigInt, so convert it to a plain Number here.
    lastInsertRowid: result.lastInsertRowid != null
      ? Number(result.lastInsertRowid) : null,
    changes: result.rowsAffected,
  };
}

module.exports = db;