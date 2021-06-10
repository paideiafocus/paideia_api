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
  migrations: ["./src/database/migrations/**.ts"],
  entities: ["./src/models/**.ts"],
  logging: false,
  cli: {
    "migrationsDir": "./src/database/migrations"
  }
}
