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

var list_of_people = []
list_of_people.push(new Person("Mitch", "Stark", 001, "1996/6/16"))
list_of_people.push(new Person("Michael", "Scott", 002, "1990/3/14"))
list_of_people.push(new Person("Dwight", "Schrute", 003, "1995/1/1"))
list_of_people.push(new Person("Jim", "Halpert", 004, "2000/10/31"))
//done creating lists of people

const express = require('express')
const bodyParser = require('body-parser')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/people', (req, res) => {
	res.json(list_of_people)
})

app.get('/:loginId', (req, res) => {
	const id = req.params["loginId"]
	for (person of list_of_people) {
		if (person["loginId"] == id) {
			res.json(person)
			return
		}
	}
	res.sendStatus(404)
})

app.delete('/:loginId', (req, res) => {
	const id = req.params["loginId"]
	for (person of list_of_people) {
		if (person["loginId"] == id) {
			index = list_of_people.indexOf(person)
			list_of_people.splice(index, 1)
			res.send("Succesfully deleted " + person.first_name + " " + person.last_name)
		}
	}
})

app.put('/:loginId', (req, res) => {
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
	//add in checks
	list_of_people.push(new Person(req.body.first_name, req.body.last_name, parseInt(req.body.id), req.body.start_date))
	resData = {"first": req.body.first_name,
				"last": req.body.last_name}
	res.json(JSON.stringify(resData))
})

app.post('/find_person', (req, res) => {
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

