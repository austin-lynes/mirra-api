require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: 'utf8'
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

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: 'utf8'
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