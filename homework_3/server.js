//create the data
function Person(first_name, last_name, loginId, startDate) {
	this.first_name = first_name
	this.last_name = last_name
	this.loginId = loginId
	this.startDate = startDate
}

function getAge(dateString) {
	var today = new Date();
    var start = new Date(dateString);
    var age = today.getFullYear() - start.getFullYear();
    var m = today.getMonth() - start.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < start.getDate())) {
        age--;
    }
    return age;
}

var list_of_people = [];
//done creating lists of people

const express = require('express')
const bodyParser = require('body-parser')
var app = express()
var MongoClient = require('mongodb')
var db;

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/people', (req, res) => {
	{
		updatePeople()
	}
	res.json(list_of_people)
})

app.get('/:loginId', (req, res) => {
	const id = req.params["loginId"]
	updatePeople()
	for (person of list_of_people) {
		if (person["loginId"] == id) {
			res.json(person)
			return
		}
	}
	res.sendStatus(404)
})

app.delete('/:loginId', (req, res) => {
	updatePeople()
	const id = req.params["loginId"]
	for (person of list_of_people) {
		if (person["loginId"] == id) {
			index = list_of_people.indexOf(person)
			db.collection("homework_3").remove({id: index})
			res.send("Succesfully deleted " + person.first_name + " " + person.last_name)
		}
	}
})

app.put('/:loginId', (req, res) => {
	updatePeople()
	const id = req.params["loginId"]
	for (person of list_of_people) {
		if (id == person["loginId"]) {
			person.first_name = req.body.first
			person.last_name = req.body.last
			person.loginId = req.body.id
			person.startDate = req.body.startDate
			res.send("Updated:)")
		}
	}
})

app.get('/:loginId/name', (req, res) => {
	updatePeople()
	const id = req.params["loginId"]
	for (person of list_of_people) {
		if (person["loginId"] == id) {
			res.json(person["first_name"] + " " + person["last_name"])
			return
		}
	}
	res.sendStatus(404)
})

app.get('/:loginId/years', (req, res) => {
	updatePeople()
	const id = req.params["loginId"]
	for (person of list_of_people) {
		if (person["loginId"] == id) {
			res.json(getAge(person["startDate"]).toString())
			return
		}
	}
	res.sendStatus(404)
})

app.post('/add_person', (req, res) => {
	var new_person = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		id: req.body.id,
		date: req.body.start_date
	}
	db.collection("homework_3").insertOne(new_person, (err, result) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
	})
	resData = {"first": req.body.first_name,
				"last": req.body.last_name}
	res.json(JSON.stringify(resData))
})

app.post('/find_person', (req, res) => {
	updatePeople()
	for (person of list_of_people) {
		if (person["loginId"] == req.body.id) {
			resData = {"first": person["first_name"],
							"last": person["last_name"],
							"id": person["loginId"],
							"date": person["startDate"]}
			res.json(JSON.stringify(resData))
		}
	}
})

app.listen(3000, () => {
	console.log("listening on port 3000")
})

var mongoUrl = 'mongodb://cs336:PASSWORD@ds147167.mlab.com:47167/cs336'
MongoClient.connect(mongoUrl, function(err, dbConnection) {
	if (err) {
		throw err
	}
	db = dbConnection
})

function updatePeople() {
	db.collection("homework_3").find().toArray((err, items) => {
		list_of_people = []
		for (obj of items) {
			list_of_people.push(new Person(obj["first_name"], obj["last_name"], obj["id"], obj["date"]))
		}
	})
}
