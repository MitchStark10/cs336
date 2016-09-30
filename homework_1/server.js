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
var app = express()

app.get('/', (req, res) => {
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

app.listen(3000, () => {
	console.log("listening on port 3000")
})