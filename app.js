const express = require("express");
const mongoose = require("mongoose");


const app = express();
PORT = 3000;
// db
mongoose.connect('mongodb://localhost/todo-app', {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;

// print error if any
db.on('error',console.error.bind(console, 'connection-error: '));
db.once('open', () => {
  console.log("connected to database")
})
// schema 
const todoSchema = new mongoose.Schema({name:String});

// model
// const TodoItems = mongoose.model('TodoItems',todoSchema);

// itms
// const item1 = new TodoItems({name:'buy some milk'});
async function findModels(modelName) {
  // console.log("getting all items: \n")
  var model = await modelName.find({});
  return model; // array

}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
// defining name
var name;

function createModel(name){
  const TodoItems = mongoose.model(name,todoSchema);
  return TodoItems;
}
app.get("/:name", async(req, res) => {
  name = req.params.name;
  console.log("get : /" + name);
  const TodoItems = mongoose.model(name,todoSchema);
  
  let items = await findModels(TodoItems);
  res.render("index", { itemsList: items, name:req.params.name });
});



app.post("/:name", async(req, res) => {
  var inputValue = req.body.name;
  if (inputValue != "") {
    // create model with name of named parameter
    const TodoItems = mongoose.model(name,todoSchema);
    //add to db
    const item = new TodoItems({name:inputValue});
    // save item

    
    item.save((err,item) => {
      if(err)console.log(err);
      // else console.log(item)
    });
    

    // console.log(`item : ${inputValue} added`);
  }
  console.log(`redirected to /${name}`);
  res.redirect(`/${name}`)
});

// listen
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
