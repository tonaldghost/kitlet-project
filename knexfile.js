const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
	client: 'sqlite3',
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
	}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
