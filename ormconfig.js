const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD || '' ;

module.exports = {
  type: "mysql",
  database,
  host,
  port,
  username,
  password,
  migrations: ["./build/src/database/migrations/**.js"],
  entities: ["./build/src/models/**.js"],
  logging: false,
  cli: {
    "migrationsDir": "./build/src/database/migrations"
  }
}
