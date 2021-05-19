const express = require("express");

const app = express();
PORT = 3000;
// tempororyily storing in this list array
// db not intagrated now
var items = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { itemsList: items });
});

app.post("/", (req, res) => {
  var inputValue = req.body.name;
  if (inputValue != "") {
    items.push(inputValue);
    console.log(items);
  }

  res.render("index", { itemsList: items });
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
