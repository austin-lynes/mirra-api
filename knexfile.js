require('dotenv').config()

module.exports = {


  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  }

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'mirra',
  //     user:     'postgres',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'mirra',
  //     user:     'postgres',
  //     password:  process.env
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
  // development: {
  //   client: 'sqlite3',
  //   useNullAsDefault:true,
  //   connection: {
  //     filename: './data/m.db3'
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //     afterCreate: (conn, done) => {
  //       conn.run('PRAGMA foreign_keys = ON', done);
  //     }
  //   },
  // },
  // testing: {
  //   client: 'sqlite3',
  //   useNullAsDefault:true,
  //   connection: {
  //     filename: './data/test.db3'
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //     afterCreate: (conn, done) => {
  //       conn.run('PRAGMA foreign_keys = ON', done);
  //     }
  //   },
  // },

};
