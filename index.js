"use strict";

const validationForm = document.querySelector('#form_with_validation');
const rowsInput = validationForm.querySelector('.rows_input');
const columnsInput = validationForm.querySelector('.columns_input');

const generateError = (text) => {
    const error = document.createElement('div')
    error.className = 'error';
    error.innerHTML = text;
    return error;
};

const highlightTd = (event) => {
    const target = event.target;
    if (/td/i.test(target.tagName)) {
        target.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    }
    return
};

const createTable = (rowsNumber, columnsNumber) => {
    const tableContainer = document.querySelector('#table_container');

    if (tableContainer.firstChild) {
       (tableContainer.firstChild).removeEventListener('click', highlightTd);
       tableContainer.innerHTML = null;
   }

    const newTable = document.createElement('table');

    for (let i = 0; i < Math.round(rowsNumber); i++)
    {
        const mainTableRows =  newTable.insertRow();

        for (let j = 0; j < Math.round(columnsNumber); j++)
        {
            mainTableRows.insertCell();
        }
    }

    tableContainer.appendChild(newTable);

    newTable.addEventListener('click', highlightTd);
};

const checkFields = (fieldsToCheck) => {
    let error;
    fieldsToCheck.forEach((field) => {
        let fieldValue = Number(field.value);

        if (!field.value) {
            error = generateError('Cant be blank');
        } else if (isNaN(fieldValue)) {
            error = generateError('Put the number');
        } else if (fieldValue <= 0) {
            error = generateError('Put the positive number only');
        }

        if (error) {
            field.parentElement.appendChild(error);
        }
    });
};

const removeValidation = (errorsToRemove) => {
    errorsToRemove.forEach(error => {error.remove()});
};

validationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const errors = validationForm.querySelectorAll('.error');
    removeValidation(errors);

    const fields = validationForm.querySelectorAll('.field');
    checkFields(fields);
    createTable(rowsInput.value, columnsInput.value);
});
