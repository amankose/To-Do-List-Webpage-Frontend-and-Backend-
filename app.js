// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
// const https = require("https");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  // var day = "";
  // var currentDay = today.getDay();
  //
  //
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday"
  //     break;
  //   case 1:
  //     day = "Monday"
  //     break;
  //   case 2:
  //     day = "Tuesday"
  //     break;
  //   case 3:
  //     day = "Wednesday"
  //     break;
  //   case 4:
  //     day = "Thursday"
  //     break;
  //   case 5:
  //     day = "Friday"
  //     break;
  //   case 6:
  //     day = "Satuarday"
  //     break;
  //   default:
  //   console.log("Error: current day is equal to: " + currentDay);

  // }


  // if(today.getDay() === 6 || today.getDate() === 0){
  //   day = "weekend";
  //   //res.sendFile(__dirname + "/weekend.html")
  //
  //   //res.render("list", {kindOfDay: day});
  //   //res.write("Yayyyy its the weekend.");
  // }
  // else{
  //   day = "weekday";
  //   // res.render("list", {kindOfDay: day});
  //   //res.sendFile(__dirname + "/weekday.html")
  // }

  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){

  console.log(req.body);
  let item = req.body.newItem;

  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
  // console.log(item);
});


app.get("/work" , function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.get("/about", function(req, res){
  res.render("about");
});

// app.post("/work", function(req, res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });


app.listen(3000, function() {
  console.log("Server started on port 3000.")
});
