
var name = "zk";
var age = 250;
var hobby = ['MONEY', 'LOVE', 'GIRLFRIEND' ];


var personsinfo = {
	name: name,
	age: age,
	hobby: hobby,

};


personsinfo.hobby.push('DESIGN');
console.log(personsinfo.hobby);


personsinfo.hobby.pop();
console.log(personsinfo.name)

	
console.log('last two', personsinfo.hobby.slice(-2));
console.log('first two', personsinfo.hobby.slice(0,2));
