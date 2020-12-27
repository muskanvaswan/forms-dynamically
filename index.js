/*
Here we will convert a structure of a HTML form to JSON and then generate that form
back from the JSON.
*/

module.exports = function formToJson(formId) {
	/*

	formToJson reads input elements of the form one by one and then stores them in a JSON format

	e.g.

	<form id="testForm">

		<input type="text" id="name" name="name" placeholder="What is your name?">

		<input type="number" id="age" name="age" class="agefield">

	</form>

	Suppose there is a form like above in the HTML of any page.

	When formToJson("testForm") is called it should return something like this

	{
	"formId": "testForm",
	"elements": [{
			"elementType": "input",
			"type": "text",
			"id": "name",
			"name": "name",
			"placeholder": "What is your name"
		},
		{
			"elementType": "input",
			"type": "number",
			"id": "age",
			"name": "age",
			"class": "agefield"

		}
	]
}

	Note : This is just a suggestive JSON. You can define your own structure.
	The idea is to be able to store a structure of the form in JSON format.

	*/


	// formId is id of a <form> element in HTML
	//getting form element
	var mainForm = document.getElementById(formId);
	var formData = {};

	formData['id'] = formId;
	formData['elements'] = []
	var elements = mainForm.querySelectorAll('input , select , textarea');

	//considering each element
	for (var i = 0; i < elements.length; i++) {
		let element = {}; //using let because global or blocked scope is not required
		if (elements[i].name) {
			element['elementType'] = elements[i].tagName;

			if (elements[i]['id']) {
				//if the field has a label associated with it using the for field, this will ensure adding it to it.
				var id = 'label[for="' + elements[i]['id'] + '"]'
				if (document.querySelector(id)) {
					element["label"] = document.querySelector(id).innerHTML;
				}
			}

			var attributes = elements[i].attributes;
			for (var j = 0; j < attributes.length; j++) {
				element[attributes[j].name] = attributes[j].value;
			}
			if (elements[i].tagName == 'SELECT') {
				element["options"] = [];
				for (var k = 0; k < elements[i].options.length; k++) {
					var o = {};
					o["name"] = elements[i].options[k].innerHTML;
					o["value"] = elements[i].options[k].value;
					element["options"].push(o)
				}
			}
			formData['elements'].push(element)
		}
	}
	//returning a json string
	return JSON.stringify(formData);
}




module.exports = function jsonToForm(formJSON, targetDivId) {
	// formJSON : This is the type of JSON which would be returned in formToJson function
	// targetDivId : This is the target div where we will create the form from the JSON
	var formData = JSON.parse(formJSON);
	/*

	This function will parse the JSON which we generated in the previous function and generate
	a form HTML and populate the form HTML in the div given with targetDivId


	*/
	form = document.createElement('form')
	form.id = formData['id']
	elements = formData['elements']
	for (var i = 0; i < elements.length; i++) {
		var element = document.createElement(elements[i]['elementType']);
		var attributes = Object.keys(elements[i]);

		for (var j = 0; j < attributes.length; j++) {

			if (attributes[j] == "class") {
				//since class name could only be set like this
				element.className = elements[i][attributes[j]];
			} else if (attributes[j] == "options") {
				//dealing with options of the select menu
				options = elements[i]['options'];
				for (var k = 0; k < options.length; k++) {
					var opt = document.createElement('option');
					opt.appendChild(document.createTextNode(options[k]['name']));
					opt.value = options[k]['value'];
					element.appendChild(opt);
				}

			} else if (attributes[j] == "label") {
				//handeling input labels with for field
				var label = document.createElement('label');
				label.appendChild(document.createTextNode(elements[i][attributes[j]]));
				form.append(label);
			} else {
				element[attributes[j]] = elements[i][attributes[j]];
			}

		}
		form.append(element)
	}
	document.getElementById(targetDivId).append(form) //not overwritting previous data
}


// If you have any questions, ask them without any hesistation like you would ask when you will be
// doing your internship. This is how you will learn and grow.