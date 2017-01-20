/**
 * Created by sara.nielsen on 1/19/2017.
 */

function helloFunction(event) {
    console.log("Hello");
}

var button1 = $('#button1');
button1.on("click", helloFunction);

function addFunction(event) {
    var field1 = $('#field1').val();
    var field2 = $('#field2').val();
    var field3 = Number(field1) + Number(field2);
    $('#field3').val(field3);
}

var button2 = $('#button2');
button2.on("click", addFunction);

function hideFunction(event) {
	var hideMe = $('#paragraphToHide');
	if (hideMe.is(":visible")) {
		hideMe.hide(500);
	}
	else {
		hideMe.show(500);
	}
}

var button3 = $('#button3');
button3.on("click", hideFunction);

function validateFunction(event) {
	var validateMe = $('#phoneField').val();
	var reg = /^(\d{3})[-](\d{3})[-](\d{4})$/;
	if(reg.test(validateMe)) {
		console.log("Ok");
	}
	else {
		console.log("Bad");
	}
}

var button4 = $('#button4');
button4.on("click", validateFunction);

function jsonFunction(event) {
	var firstName = $('#firstName').val();
	var lastName = $('#lastName').val();
	var email = $('#email').val();
	var formObject = {"fistName" : firstName, "lastName" : lastName, "email" : email};
	console.log(formObject);
}

var button5 = $('#button5');
button5.on("click", jsonFunction);