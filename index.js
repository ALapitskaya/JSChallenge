"use strict";

const validationForm = document.querySelector('#form_with_validation');
const rowsInput = validationForm.querySelector('.rows_input');
const columnsInput = validationForm.querySelector('.columns_input');


const generateError = (inputWithError, text) => {
    const error = inputWithError.parentElement.querySelector('.error');
    error.className = 'error visible';
    error.innerHTML = text;
};

const highlightTd = (event) => {
    const target = event.target;
    const cells = document.querySelectorAll('#table_container td[style]');
    cells.forEach(cell => cell.removeAttribute('style'));

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

const checkFields = () => {
    const inputs = validationForm.querySelectorAll('.field');

    inputs.forEach((input) => {
        const inputValue = input.value.replace(/^ +| +$|( ) +/g,"$1");
        console.log(inputValue);
        if (inputValue === '') {
            generateError(input, 'Cant be blank');
        } else if (isNaN(inputValue)) {
            generateError(input, 'Put the number');
        } else if (inputValue <= 0) {
            generateError(input, 'Put the positive number only');
        }
    });
};

const removeValidation = (errorsToRemove) => {
    errorsToRemove.forEach(error => {
        error.innerHTML = '';
        error.className = 'error';
    });
};

validationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const errors = validationForm.querySelectorAll('.error');
    removeValidation(errors);

    checkFields();
    createTable(rowsInput.value, columnsInput.value);
});
