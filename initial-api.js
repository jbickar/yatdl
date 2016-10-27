var express = require("express");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var id_counter = 1100;

var list_data = [{
	"id": 1000,
	"name": "exampleList",
	"todo": [{
	    "id": 1001,
	    "name": "first_todo",
	    "description": "The first todo example",
	    "dueDate": "Next Thursday",
	    "status": "incomplete",
	    "assignee": "Bob",
	    "owner": "me",
	    "media": ""
	}]
    }
    ];

app.get("/", function(req, res) {
        res.send("Hello, World!");
    });

app.get("/yatdl/v1.0/lists", function(req, res) {
	var result  = [];

	for (var i=0; i< list_data.length; i++)
	    result.push({"id": list_data[i].id,"name": list_data[i].name});

	res.status(200).json({result: result})
	    });

app.post("/yatdl/v1.0/list", function(req, res) {
  var newList = {};
  // create a new list
  if (req.body.name) {
    newList = {"id": id_counter, "name": req.body.name};
    id_counter++;
    if (req.body.desc) {
      newList = {"id": id_counter, "name": req.body.name, "description": req.body.desc};
    }
    list_data.push(newList);
    res.status(200).json(newList);
  } else {
    res.status(400).send("list name required.");
  }
});

app.get("/yatdl/v1.0/allListData", function(req, res) {
  res.status(200).json({list_data});
});


app.listen(3000, function() {
	console.log("App started on port 3000");
    });