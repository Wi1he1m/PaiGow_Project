var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");
    
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
});

app.post("/", function(req, res){
    console.log(req.body);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
})