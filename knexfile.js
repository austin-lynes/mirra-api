require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'postgresql',
    connection: {
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