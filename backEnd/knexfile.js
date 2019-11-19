const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "sqlite3",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  },
  useNullAsDefault: true
};

const customConfig = {
  development: {
    connection: {
      filename: "./db/kitlet_project.db"
    }
  },
  test: {
    connection: {
      filename: "./db/kitlet_project_test.db"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
