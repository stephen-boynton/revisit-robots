const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const roboData = require("./data");
const robots = roboData.users;

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.get("/home/", (req, res) => {
	res.render("home", { robots: robots });
});

app.get("/home/:id", (req, res) => {
	let robot = robots.find((elm, ind, arr) => {
		if (elm.id == req.params.id) return elm;
	});
	res.render("individual", robot);
});

app.get("/data/", (req, res) => {
	res.send(roboData);
});

app.set("port", 3000);

app.listen(app.get("port"), () => {
	console.log("Your app has started, sir.");
});
