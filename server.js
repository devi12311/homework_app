const express = require("express");
const cors = require("cors");
const Routes = require('./app/routes/index');
const db = require("./app/models");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync();

app.use((req, res, next) =>  {
  req.models = db;
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
