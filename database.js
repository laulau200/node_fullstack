const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(
  path.join(__dirname, './server/data/sport_club.db')
);

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

function createTables() {
  const schema = `
    -------------------------------------------------
    -- 1. Roles Table
    -------------------------------------------------
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    -------------------------------------------------
    -- 2. Users Table
    -------------------------------------------------
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    );

    -------------------------------------------------
    -- 3. Programs Table
    -------------------------------------------------
    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      coach_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (coach_id)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    );

    -------------------------------------------------
    -- 4. Enrollments Table
    -------------------------------------------------
    CREATE TABLE IF NOT EXISTS enrollments (
      user_id INTEGER NOT NULL,
      program_id INTEGER NOT NULL,
      enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      PRIMARY KEY (user_id, program_id),

      FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

      FOREIGN KEY (program_id)
        REFERENCES programs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
  `;

  try {
    db.exec(schema);
    console.log('Database tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
}

createTables();

module.exports = db;