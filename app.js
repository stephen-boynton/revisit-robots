const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const dal = require("./dal");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.get("/", (req, res) => {
	const robots = dal.getRobots();
	console.log("this is from app.get: " + robots);
	res.render("home", { robots: robots });
});

app.get("/:id", (req, res) => {
	let robot = robots.find((elm, ind, arr) => {
		if (elm.id == req.params.id) return elm;
	});
	res.render("individual", robot);
});

app.get("/robots/unemployed", (req, res) => {
	const unemployed = dal.getUnemployed();
	res.render("home", { robots: unemployed });
});

app.get("/robots/employed", (req, res) => {
	const employed = dal.getEmployed();
	res.render("home", { robots: employed });
});

app.get("/robots", (req, res) => {
	res.send(dal.getRobots());
});

app.set("port", 3000);

app.listen(app.get("port"), () => {
	console.log("Your app has started, sir.");
});
