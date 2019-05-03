var express = require("express");
var app = express();
const User = require('./users');
const Data = require('./data');
const cors = require('cors');
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    User.adduser(myData, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'failed to register user' });
        } else {
            res.json({ success: true, msg: 'registered user' });
        }
    })
});

app.post("/getCriterias", (req, res) => {
    var myData = new Data(req.body);
    var ret = Data.getCriterias(myData, (err, user) =>{

    });
    // ret.find({}).sort({cli:-1}).limit(100).exec(function(err, docs) { res.json(docs) });
    ret.find({}).exec(function(err, docs){res.json(docs)});
});

app.post("/addData", (req, res) => {
    var myData = new Data(req.body);
    Data.addData(myData, (err, user) => {
        
    });

    var ret = Data.showTable(myData, (err, user)=>{
        
    });
    ret.find({}).sort({cli:-1}).limit(100).exec(function(err, docs) {res.json(docs) });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});