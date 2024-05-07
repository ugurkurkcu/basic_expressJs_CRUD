const fs = require("fs");

exports.loggerMiddleware = (req, res, next) => {
  console.log("Middleware is running");
  console.log("Method:", req.method, "URL", req.url);

  next();
};

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.controlMiddleware = (req, res, next) => {
  const found = tours.find((i) => i.id === req.params.id);

  if (!found)
    return next(
      res
        .status(404)
        .json({ status: "Gönderdiğiniz id'ye sahip bir tur bulunamadı" })
    );

  req.tour = found;

  next();
};
