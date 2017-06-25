var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var config = require("./config");
var setupController = require("./api/controllers/setupController");
var todoController = require("./api/controllers/todoController");

var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.set('view engine', 'ejs');

// get DB information.
console.log(config.getDBConnectionString());
if (mongoose.connect(config.getDBConnectionString())) {
    console.log("Connect successfully!!...");
};


setupController(app);
todoController(app);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('Server listening on port ' + port + '...');
});