const express = require("express");

const {
  getAlltours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require("./controllers/tourControllers");
const {
  loggerMiddleware,
  controlMiddleware,
} = require("./middleware/middleware");

const app = express();
const PORT = 3000;

app.use(express.json());

// // respond to get request
// app.get("/api/v1/tours", getAlltours);

// // respond to post request
// app.post("/api/v1/tours", createTour);

// // respond to get only one tour request
// app.get("/api/v1/tours/:id", getTour);

// // update the significant values of a tour
// app.patch("/api/v1/tours/id", updateTour);

// // delete a tour
// app.delete("/api/v1/tours/:id", deleteTour);

app.use(loggerMiddleware); // middleware in konumu onemli, sonrasinda gelen istekler icin gecerlidir,
//eger beeli bir http istegi icin kullanilacak ise, istek ile gonderilmelidir.

app.route("/api/v1/tours").get(getAlltours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(controlMiddleware, getTour)
  .patch(controlMiddleware, updateTour)
  .delete(controlMiddleware, deleteTour);

app.listen(PORT, () => console.log(`server ${PORT}. port dinleniyor`));
