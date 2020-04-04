require('dotenv').config()

module.exports = {
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    useNullAsDefault: true
  },

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'pg',
    connection: {
      host:'127.0.0.1',
      database: 'mirra-test',
      user: 'postgres',
      password: process.env.LOCAL_PASSWORD,
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    useNullAsDefault: true
  },

};