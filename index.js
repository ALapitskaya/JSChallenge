"use strict";

var validationForm = document.querySelector('#form_with_validation');
var validateBtn = validationForm.querySelector('.validate_btn');
var rowsInput = validationForm.querySelector('.rows_input');
var columnsInput = validationForm.querySelector('.columns_input');

var fields = validationForm.querySelectorAll('.field');

var generateError = function (text) {
    var error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
}

validationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var errors = validationForm.querySelectorAll('.error')

    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }

    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            var error = generateError('Cant be blank')
            fields[i].parentElement.appendChild(error);
        } else if (fields[i].value <= 0) {
            var error = generateError('Put the positive number only')
            fields[i].parentElement.appendChild(error);
        } else if (isNaN(fields[i].value)) {
            var error = generateError('Put the number')
            fields[i].parentElement.appendChild(error);
        }
    };


})
