var $ = function (id) {
	return document.getElementById(id);
}
var submitRegistration = function () {
	var isValid = true;

	// 	Validate name
	var name = $("name").value;
	if (name == "") {
		$("name_error").firstChild.nodeValue = "Name required.";
		isValid = false;
	} else {
		$("name_error").firstChild.nodeValue = "";
	}

	// Validate email address
	var email = $("email").value;
	var emailPattern = /^([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)*@([a-zA-Z0-9_-])+(\.[\w\-]+)*\.([\D]{2,3})$/;
	if (email == "") {
		$("email_error").firstChild.nodeValue = "Email address required.";
		isValid = false;
	} else if (!emailPattern.test(email)) {
		$("email_error").firstChild.nodeValue = "Valid email address required.";
		isValid = false;
	} else {
		$("email_error").firstChild.nodeValue = "";
	}
	
	// Validate date of birth
	var dateOfBirth = $("date_of_birth").value;
	var dateOfBirthPattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
	if (dateOfBirthPattern == "") {
		$("date_of_birth_error").firstChild.nodeValue = "Date of birth required.";
		isValid = false;
	} else if (!dateOfBirthPattern.test(dateOfBirth)) {
		$("date_of_birth_error").firstChild.nodeValue = "A valid date following the MM/DD/YYYY format is required."
		isValid = false;
	} else {
		$("date_of_birth_error").firstChild.nodeValue = "";
	}
	
	// Validate phone number
	var phoneNumber = $("phone_number").value;
	var phoneNumberPattern = /^\(?(\d{3})?\)?-?(\s{1})?(\d{3})-?(\s{1})?(\d{4})$/;
	if (phoneNumber == "") {
		$("phone_number_error").firstChild.nodeValue = "Phone number required.";
		isValid = false;		
	} else if (!phoneNumberPattern.test(phoneNumber)) {
		$("phone_number_error").firstChild.nodeValue = "Valid phone number required.";
		isValid = false;		
	} else {
		$("phone_number_error").firstChild.nodeValue = "";
	}
	
	// Validate phone number type
	var phoneNumberType = $("phone_type").value;
	if (phoneNumberType == "Select") {
		$("phone_type_error").firstChild.nodeValue = "Phone number type required.";
		isValid = false;
	} else {
		$("phone_type_error").firstChild.nodeValue = "";
	}

	// Validate password
	var password = $("password").value;
	var passwordPattern = /^[A-Za-z\d]{6,10}$/;
	if (password == "") {
		$("password_error").firstChild.nodeValue = "Password required.";
		isValid = false;
	} else if (!passwordPattern.test(password)) {
		$("password_error").firstChild.nodeValue = "Must be between 6 to 10 characters.";
		isValid = false;	
	} else {
		$("password_error").firstChild.nodeValue = "";
	}
	
	// Validate verify password
	var verifyPassword = $("verify_password").value;
	if (verifyPassword != password || verifyPassword == "") {
		$("verify_password_error").firstChild.nodeValue = "Passwords do not equal each other.";
		isValid = false;
	} else {
		$("verify_password_error").firstChild.nodeValue = "";
	}
	
	// Validate security question
	var securityQuestion = $("security_question").value;
	if (securityQuestion == "Please select a challenging question") {
		$("security_question_error").firstChild.nodeValue = "Please choose a security question.";
		isValid = false;
	} else {
		$("security_question_error").firstChild.nodeValue = "";
	}

	// Validate security answer
	var securityAnswer = $("security_answer").value;
	if (securityAnswer == "") {
		$("security_answer_error").firstChild.nodeValue = "Security answer required.";
		isValid = false;		
	} else {
		$("security_answer_error").firstChild.nodeValue = "";
	}

	// Validate radio button
	var nodeList = document.getElementsByTagName("input");
	for (var i = 0; i < nodeList.length; i++) {
		var node = nodeList[i];			
		if (node.getAttribute("type") == "radio") {
			// checks if neither yes or no is checked
			if (!$("yesOption").checked && !$("noOption").checked) {	
				$("special_offers_error1").firstChild.nodeValue = "Please choose yes or no.";
				isValid = false;
			} else {
				$("special_offers_error1").firstChild.nodeValue = "";
			}
		}	
	}

	// Validate checkboxes
	var nodeList = document.getElementsByTagName("input");
	var blankCheckboxes = true;
	for (var i = 0; i < nodeList.length; i++) {
		var node = nodeList[i];
		// checks for checkbox-type inputs
		if (node.getAttribute("type") == "checkbox" && blankCheckboxes) {	
			// checks if "Yes" radio btn is checked and for unchecked checkboxes
			if ($("yesOption").checked && !node.checked) {	
				$("special_offers_error2").firstChild.nodeValue = "Please choose at least one special offer.";
				isValid = false;
			} else {
				$("special_offers_error2").firstChild.nodeValue = "";
				blankCheckboxes = false;
			}
		}	
	}
	
	if (isValid == true) {
		window.submit();
	} else {
		isValid = false;
	}	
	return isValid;
}
var clearNameField = function () {
	$("name").value = "";
}
var clearEmailField = function () {
	$("email").value = "";	
}
var clearDOBField = function  () {
	$("date_of_birth").value = "";	
}
var clearPhoneNumberField = function () {
	$("phone_number").value = "";	
}
var acceptSpecialOffers = function() {
	var nodeList = document.getElementsByTagName("input");	// array of input tags
	for (var i = 0; i < nodeList.length; i++) {
		var node = nodeList[i];
		if (node.getAttribute("type") == "checkbox") {	// checks for checkbox-type inputs
			node.removeAttribute("disabled");	// re-enables checkboxes
			$("special_offers_error1").firstChild.nodeValue = "";	// removes error text
		}
	}
}
var declineSpecialOffers = function() {
	var nodeList = document.getElementsByTagName("input");	// array of input tags
	for (var i = 0; i < nodeList.length; i++) {
		var node = nodeList[i];
		if (node.getAttribute("type") == "checkbox") {	// checks for checkbox-type inputs
			node.checked = false;	// unchecks checkboxes
			node.setAttribute("disabled", "disabled");	// disables all checkboxes			
			$("special_offers_error2").firstChild.nodeValue = "";	// removes error text
		}
	}
}
// "Yes" radio button is checked if user checks any checkbox
var checkAnyCheckbox = function() {
	var nodeList = document.getElementsByTagName("input");
	for (var i = 0; i < nodeList.length; i++) {
		var node = nodeList[i];
		if (node.getAttribute("type") == "checkbox" && node.checked) {
			$("yesOption").checked = true;
		}
	}
}
window.onload = function () {
	$("name").onclick = clearNameField;	
	$("email").onclick = clearEmailField;
	$("date_of_birth").onclick = clearDOBField;
	$("phone_number").onclick = clearPhoneNumberField;
	$("yesOption").onclick = acceptSpecialOffers;
	$("noOption").onclick = declineSpecialOffers;
	
	$("kickboxing").onclick = checkAnyCheckbox; 
	$("grappling").onclick = checkAnyCheckbox;
	$("weapons").onclick = checkAnyCheckbox;
	$("kravmaga").onclick = checkAnyCheckbox;
	$("women").onclick = checkAnyCheckbox;
	$("wingchun").onclick = checkAnyCheckbox;
	$("bootcamp").onclick = checkAnyCheckbox;
	$("karate").onclick = checkAnyCheckbox;
	$("personal").onclick = checkAnyCheckbox;
	$("kungfu").onclick = checkAnyCheckbox;
	$("mma").onclick = checkAnyCheckbox;
	$("street").onclick = checkAnyCheckbox;

	$("submit").onclick = submitRegistration;

	// auto-populates today's date
	var today = new Date();	
	$("date").value = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();	
}