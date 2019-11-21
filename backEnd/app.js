const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/api-router');
const { handleCustom404 } = require('./errors/errors');

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.all('*', (req, res, next) => {
	res.status(404).send({ wildcard: 'Page not found!' });
});

//heroku staging

app.use(handleCustom404);

module.exports = app;
