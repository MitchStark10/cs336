//Begin Person object
function Person(name, birthdate, friends) {
	this.name = name
	this.birthdate = birthdate
	this.friends = friends
}

//getAge() found at: http://jsfiddle.net/codeandcloud/n33RJ/
Person.prototype.getAge = function() {
	dateString = this.birthdate
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
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
function Student(name, birthdate, friends, subject) {
	Person.call(this, name, birthdate, friends)
	this.subject = subject
}
//create prototype
Student.prototype = Object.create(Person.prototype)
//override sayGreeting()
Student.prototype.sayGreeting = function() {
	console.log("I'm a student")
}
//End Student Object

//create Person instances
var mitch = new Person("Mitch", "1996/6/16", [])

var bob = new Person("Bob", "1995/6/16", [mitch])

//Output for Excercise 2.1
console.log("----------------Excercise 2.1-----------------")
console.log("Original name: " + bob.name) //name should be "Bob"
bob.changeName("Bobby")
console.log("Changed name: " + bob.name) //name should be "Bobby"
mitch.addFriend(bob)
console.log(mitch) //should contain "Bobby" as a friend
console.log("Person's greeting: ")
mitch.sayGreeting()

//message based on ages
if (mitch.getAge() > bob.getAge()) {
	console.log("Mitch is older than Bobby")
} else if (mitch.getAge() < bob.getAge()) {
	console.log("Bobby is older than Mitch")
} else {
	console.log("Mitch and Bobby have the same age")
}

//Output for Excercise 2.2
console.log("---------------Excercise 2.2------------------")
var student_matt = new Student("Matt", "1994/6/16", [], "Computer Science")
console.log(student_matt)
console.log("Student's age: " + student_matt.getAge())
console.log("Student Matt instanceof Student: " + (student_matt instanceof Student)) //true
console.log("Student Matt instanceof Person: " + (student_matt instanceof Person)) //true
console.log("Student's greeting: ")
student_matt.sayGreeting() //I'm a student