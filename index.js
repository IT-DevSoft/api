const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");
app.use(cors());

const logger = require("./src/utils/logger");

const PORT = process.env?.PORT || 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const authMiddleware = require("./src/middlewares/authMiddleware");

const accountRouter = require("./src/routes/accountRouter");
const userRouter = require("./src/routes/userRouter");
const loginRouter = require("./src/routes/loginRouter");

app.use("/api/account", authMiddleware, accountRouter);
app.use("/api/user", loginRouter);
app.use("/api/user", authMiddleware, userRouter);

app.use((req, res) => {
  res.status(404).send("Not Found");
  logger.requestFail(req, "Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is listening on a port ${PORT}`);
  logger.info(`Server runed on a port ${PORT}`);
});
