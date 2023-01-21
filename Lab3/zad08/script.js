'use strict'

const circle = document.querySelector('.circle')
const body = document.querySelector('body')
const form = document.querySelector('form')
const pass1 = document.getElementById('new-pass')
const pass2 = document.getElementById('repeat-pass')

const eye1 = document.getElementById('eye-icon-1')
const eye2 = document.getElementById('eye-icon-2')

let newPassword = ''
let repeatNewPassword = ''

function init(){

    for(let i = 1; i <= 4; i++){
        hide(`${i}1`)
        reveal(`${i}2`)
        changeColor(i, '#d21404')
    }
}

init()

function checkLength(pass){
    return pass.length > 7
}

function checkSpecialChar(pass){
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass)
}

function checkCapital(pass){
    return /[A-Z]/.test(pass)
}

function checkDigit(pass){
    return /[0-9]/.test(pass)
}


function changeColor(circleNumber, color){
    document.querySelector( `.circle${circleNumber}`).style.background = `${color}`
}

function hide(number){
    document.querySelector(`.icon-${number}`).classList.add('hidden')
}

function reveal(number){
    document.querySelector(`.icon-${number}`).classList.remove('hidden')
}


function check(func, passwd, reqNum){

    if (func(passwd)){

        hide(`${reqNum}2`)
        reveal(`${reqNum}1`)
        changeColor(reqNum, '#5DCD33')

    }

    else{
        hide(`${reqNum}1`)
        reveal(`${reqNum}2`)
        changeColor(reqNum, '#d21404')
    }
}

function changeVisibility(opacity){
    document.querySelector('.not-visible').style.opacity = `${opacity}`
}


function passAgreement(){

    if(newPassword === '' || repeatNewPassword === '' || repeatNewPassword === newPassword){
        changeVisibility(0)
    }
    else{
        changeVisibility(1)
    }
}


pass1.addEventListener('keyup',(e)=> {

    newPassword = pass1.value

    check(checkLength, newPassword, 1)
    check(checkSpecialChar, newPassword, 2)
    check(checkCapital, newPassword, 3)
    check(checkDigit, newPassword, 4)
    passAgreement()

})

pass2.addEventListener('keyup',(e)=> {
    repeatNewPassword = pass2.value
    passAgreement()
})


eye1.addEventListener('click', function(){


    if(pass1.type === 'password'){
        pass1.type = 'text'
        eye1.style.color = '#c1eeb5'

    }

    else {
        pass1.type = 'password'
        eye1.style.color = '#51e327'

    }

})

eye2.addEventListener('click', function(){


    if(pass2.type === 'password'){
        pass2.type = 'text'
        eye2.style.color = '#c1eeb5'
    }

    else {
        pass2.type = 'password'
        eye2.style.color = '#51e327'

    }

})


