const MongoClient = require("mongodb").MongoClient,
	assert = require("assert");
const url = "mongodb://localhost:27017/robotsdb";
let robots = [];
let unemployed = [];
let employed = [];

function getAllDocs(err, db) {
	console.log(err);
	const collection = db.collection("robots");
	collection.find({}).toArray(function(err, docs) {
		robots = docs;
		db.close();
	});
}

function findUnemployed(err, db) {
	console.log(err);
	const collection = db.collection("robots");
	collection.find({ job: null }).toArray(function(err, docs) {
		unemployed = docs;
		db.close();
	});
}

function findEmployed(err, db) {
	console.log(err);
	const collection = db.collection("robots");
	collection.find({ job: { $ne: null } }).toArray(function(err, docs) {
		employed = docs;
		console.log(employed);
		db.close();
	});
}

function connectMongodb(url, cb) {
	MongoClient.connect(url, cb);
}

robots = connectMongodb(url, getAllDocs);
unemployed = connectMongodb(url, findUnemployed);
employed = connectMongodb(url, findEmployed);

function getRobots(callback) {
	return robots;
}

function getUnemployed() {
	return unemployed;
}

function getEmployed() {
	return employed;
}

module.exports = {
	getRobots,
	getUnemployed,
	getEmployed
};
