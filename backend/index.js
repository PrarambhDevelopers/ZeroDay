require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./src/config/db");
const app = express();
const port = process.env.PORT || 5000;

connectToMongo();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/stage", require("./src/routes/stageRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
