const app = require("express")();

app.get("/", (req, res, next) => {
  console.log(req.params);
  res.send("hello");
});

app.listen(6900, () => {
  console.log("listening on port:  ");
  console.log(6900);
});
