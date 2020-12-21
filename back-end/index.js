const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method);
  if (req.method === "POST") {
    res.send({ msg: "不允许随意更改哦！", code: "200" });
    return;
  }
  next();
});

require("./db/index")(app);
require("./router/api/index")(app);

app.use("/", express.static(__dirname + "/static"));
app.listen(2333, () => {
  console.log(2333, "success");
});
