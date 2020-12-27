# forms-dynamically
This is a npm package that allows you to convert an HTML Form to JSON and back

*formToJson* reads input elements of the form one by one and then stores them in a JSON format

e.g.

```<form id="testForm">

  <input type="text" id="name" name="name" placeholder="What is your name?">

  <input type="number" id="age" name="age" class="agefield">

</form>```

Suppose there is a form like above in the HTML of any page.

When formToJson("testForm") is called it should return something like this

```{
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
}```

Note : This is just a suggestive JSON. You can define your own structure.
The idea is to be able to store a structure of the form in JSON format.
