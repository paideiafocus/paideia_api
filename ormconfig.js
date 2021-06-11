const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD || '' ;

const env = process.env.ENVIRONMENT || 'dev';
const buildPath = env === 'prod' ? 'build/' : '';
const fileExtension = env === 'prod' ? 'js' : 'ts';
const migrations = `./${buildPath}src/database/migrations/**.${fileExtension}`;
const entities = `./${buildPath}src/models/**.${fileExtension}`;
const migrationsDir = `./${buildPath}src/database/migrations`

module.exports = {
  type: "mysql",
  database,
  host,
  port,
  username,
  password,
  migrations: [migrations],
  entities: [entities],
  logging: false,
  cli: {
    "migrationsDir": migrationsDir
  }
}
