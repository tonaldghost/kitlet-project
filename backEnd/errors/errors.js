exports.handleCustom404 = (err, req, res, next) => {
  if (err.msg === "404 custom") {
    res.status(err.status).send(err.send);
  } else {
    console.log("nope");
    next(err);
  }
};
