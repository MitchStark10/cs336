//Begin Person object
function Person(name, age, birthdate, friends) {
	this.name = name
	this.age = age
	this.birthdate = birthdate
	this.friends = friends
}

Person.prototype.changeName = function(newName) {
	this.name = newName
}

Person.prototype.addFriend = function(friendName) {
	this.friends.push(friendName)
}

Person.prototype.sayGreeting = function() {
	console.log("I'm a person")
}
//End Person object

//Begin Student object
function Student(name, age, birthdate, friends, subject) {
	Person.call(this, name, age, birthdate, friends)
	this.subject = subject
}
//create prototype
Student.prototype = Object.create(Person.prototype)
//override sayGreeting()
Student.prototype.sayGreeting = function() {
	console.log("I'm a student")
}
//End Student Object

//create Person objects
var mitch = new Person("Mitch", 20, "6/16/1996", [])

var bob = new Person("Bob", 21, "6/16/1995", [])

//Output for Excercise 2.1
console.log("----------------Excercise 2.1-----------------")
console.log(bob.name) //name should be "Bob"
bob.changeName("Bobby")
console.log(bob.name) //name should be "Bobby"
mitch.addFriend(bob)
console.log(mitch) //should contain "Bobby" as a friend
mitch.sayGreeting()

//message based on ages
if (mitch.age > bob.age) {
	console.log("Mitch is older than Bobby")
} else if (mitch.age < bob.age) {
	console.log("Bobby is older than Mitch")
} else {
	console.log("Mitch and Bobby have the same age")
}

//Output for Excercise 2.2
console.log("---------------Excercise 2.2------------------")
var student_matt = new Student("Matt", 22, "6/16/1994", [mitch, bob], "Computer Science")
console.log(student_matt)
student_matt.sayGreeting()