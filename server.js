const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const Routes = require('./app/routes/index');

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello there" });
});

app.use((req, res, next) =>  {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 8080;

app.use('/api' , Routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
