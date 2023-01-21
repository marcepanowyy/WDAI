'use strict'

const submit = document.querySelector('.submit-btn')
const phoneBookList = document.querySelector('.phone-book-list')
const form = document.querySelector('.form')[0]

const nameField = document.getElementById('nameField')
const phoneField = document.getElementById('phoneField')

function addElement(name, phone){

    const newElement = document.createElement('li')
    newElement.classList.add("phone-book-list-element")

    newElement.innerHTML = `

            <div class="name">${name}</div>
            <div class="phone-number">${phone}</div>
            <i class="fa-sharp fa-solid fa-trash trashbin"></i>
    `
    phoneBookList.insertBefore(newElement, phoneBookList.firstChild)

}

submit.addEventListener('click', function(e){

    let name = document.getElementById('nameField').value
    let phone = document.getElementById('phoneField').value

    e.preventDefault();

    if(isCorrectName(name) && isCorrectPhone(phone)){
        addElement(name, phone)
        nameField.value = ''
        phoneField.value = ''
    }

    else{
        alert("prosze podac poprawne dane")
    }
    }
)


function isCorrectName(nameAndSurname) {

    let regName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    return regName.test(nameAndSurname);


}



function isCorrectPhone(phone) {

    let regName = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    return regName.test(phone);

}


addEventListener('click', function (e){

    let clickedObject = e.target

    if(clickedObject.className === 'fa-sharp fa-solid fa-trash trashbin'){
        clickedObject.parentElement.remove()
    }


})

