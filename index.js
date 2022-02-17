"use strict";

const validationForm = document.querySelector('#form_with_validation');
const validateBtn = validationForm.querySelector('.validate_btn');
const rowsInput = validationForm.querySelector('.rows_input');
const columnsInput = validationForm.querySelector('.columns_input');

const fields = validationForm.querySelectorAll('.field');

const generateError = function (text) {
    let error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
}

const create_table = function (rowsNumber, columnsNumber) {
    const table_container = document.querySelector('#table_container');

    if (table_container.firstChild) {table_container.firstChild.remove()};

    console.log(table_container.firstChild);
    const new_table = table_container.appendChild(document.createElement('table'));
    console.log(new_table);

    for (let i = 0; i < rowsNumber; i++)
    {
        const main_table_rows =  new_table.insertRow ();

        for (let j = 0; j < columnsNumber; j++)
        {
            const main_table_cells = main_table_rows.insertCell ();
            main_table_cells.appendChild(document.createElement('a'));
        }
    }
}

validationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const errors = validationForm.querySelectorAll('.error')

    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }

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

    create_table(rowsInput.value, columnsInput.value);
})

