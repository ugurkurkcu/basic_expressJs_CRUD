const fs = require("fs");
const crypto = require("crypto");

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAlltours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    tours: tours,
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: "Aradağınız tur bulundu",
    tour: req.tour,
  });
};

exports.updateTour = (req, res) => {
  const updatedData = req.body;
  const id = req.params.id;

  const index = tours.findIndex((i) => i.id === id);
  const updatedTour = { ...req.tour, ...updatedData };
  tours.splice(index, 1, updatedTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(404).json({ status: "Islem basarisiz oldu" });
      } else {
        res.status(200).json({
          status: "Tur başarıyla güncellendi",
          tour: updatedTour,
        });
      }
    }
  );
};

exports.createTour = (req, res) => {
  const newTour = Object.assign({ id: crypto.randomUUID() }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: "Başarıyla oluşturuldu",
        newTour: newTour,
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const updatedTours = tours.filter((i) => i.id !== req.params.id);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    () => {
      res.status(204).send();
    }
  );
};
