const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Absolute directory path
const dbDir = path.resolve(__dirname, 'server', 'data');

// Create folder if missing
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Absolute database file path
const dbPath = path.join(dbDir, 'sport_club.db');

console.log('DB PATH:', dbPath);

let db;

try {
  db = new Database(dbPath);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  console.log('Connected to SQLite database successfully.');
} catch (err) {
  console.error('Database connection failed:');
  console.error(err.message);
}

module.exports = db;