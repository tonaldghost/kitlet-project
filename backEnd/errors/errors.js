exports.handleCustom404 = (err, req, res, next) => {
	if (err.msg === '404 custom') {
		res.status(err.status).send(err.send);
	} else {
		next(err);
	}
};

exports.handleCustoms = (err, req, res, next) => {
	if (err.status) res.status(err.status).send(err.send);
	else next(err);
};
