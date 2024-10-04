
//TRADITIONAL
function CCL(age,account,money) {
	return 'MYAGE: ' + (age * 2);

}

// VARIABLE
var CCL = function(age) {
	return 'MYAGE: ' + (age * 2);

}


//ES6 STYLE FUNCTION 
var CCL = (age) => 'MYAGE:' + (age * 2)

;console.log(
	CCL(18)
);
