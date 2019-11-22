const ENV = process.env.NODE_ENV || 'development';
const { DATABASE_URL } = process.env;

const baseConfig = {
	client: 'pg',
	migrations: {
		directory: './db/migrations'
	},
	seeds: {
		directory: './db/seeds'
	}
};

const customConfig = {
	development: {
		connection: {
			database: 'kitlet_project'
		}
	},
	test: {
		connection: {
			database: 'kitlet_project_test'
		}
	},
	production: {
		connection: `${DATABASE_URL}?ssl=true`
	}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
