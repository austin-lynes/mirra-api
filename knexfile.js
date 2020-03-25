require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/m.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/test.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
  },

};
