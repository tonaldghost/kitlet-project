exports.handleCustom404 = (err, req, res, next) => {
	if (err.msg === '404 custom') {
		res.status(err.status).send(err.send);
	} else {
		next(err);
	}
};

exports.handlePSQLerrors = (err, req, res, next) => {
	const errorsArr = [ '22P02' ];
	if (errorsArr.includes(err.code)) {
		res.status(404).send({ msg: 'Path not found' });
	} else {
		next(err);
	}
};

exports.handleCustoms = (err, req, res, next) => {
	if (err.status) res.status(err.status).send(err.send);
	else next(err);
};

exports.handle500s = (err, res, req, next) => {
	res.status(500).send({ msg: 'internal server error' });
};

//-------------------ERROR CONTROLLERS----------------------//

exports.handle405s = (req, res, next) => {
	res.status(405).send({ msg: 'invalid method' });
};

exports.handle404s = (re, res, next) => {
	res.status(404).send({ msg: 'Path not found' });
};
