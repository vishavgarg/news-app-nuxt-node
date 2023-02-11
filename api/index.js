const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const routes = require("./routes");
const cors = require("cors");
app.use(bodyParser.json());
app.use(
  session({
    secret: "random string",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("TNEWS");
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
