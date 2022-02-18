"use strict";

const validationForm = document.querySelector('#form_with_validation');
const rowsInput = validationForm.querySelector('.rows_input');
const columnsInput = validationForm.querySelector('.columns_input');
const fields = validationForm.querySelectorAll('.field');

const generateError = function (text) {
    let error = document.createElement('div')
    error.className = 'error';
    error.innerHTML = text;
    return error;
};

const highlightTd= function (td) {
    td.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
};

const create_table = function (rowsNumber, columnsNumber) {
    const table_container = document.querySelector('#table_container');
    
    if (table_container.firstChild) {table_container.firstChild.remove()};

    const new_table = table_container.appendChild(document.createElement('table'));

    for (let i = 0; i < Math.round(rowsNumber); i++)
    {
        const main_table_rows =  new_table.insertRow();

        for (let j = 0; j < Math.round(columnsNumber); j++)
        {
            const main_table_cells = main_table_rows.insertCell();
        }
    }

    new_table.addEventListener('click', function(event) {
        let target = event.target;

        if (target.tagName != 'TD') return;

        highlightTd(target);
    });
};

var checkFields = function () {
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            const error = generateError('Cant be blank')
            fields[i].parentElement.appendChild(error);
        } else if (fields[i].value <= 0) {
            const error = generateError('Put the positive number only')
            fields[i].parentElement.appendChild(error);
        } else if (isNaN(fields[i].value)) {
            const error = generateError('Put the number')
            fields[i].parentElement.appendChild(error);
        }
    };
};

var removeValidation = function () {
    var errors = validationForm.querySelectorAll('.error');

    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
};

validationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    removeValidation();

    checkFields();

    create_table(rowsInput.value, columnsInput.value);
});

/*
https://github.com/ALapitskaya/JSChallenge*/
