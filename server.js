var express = require("express"),
	ejs = require("ejs"),
	app = express();

app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.get("/", function(req, res) {
	res.render("../index.html");
});

app.use(express.static(__dirname + "/dist"));
app.use("/views", express.static(__dirname + "/source/views"));

app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(err.status||500).send(err.message);
});

app.listen(3030, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("App is listening on port 3030");
	}
});