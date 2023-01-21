'use strict'

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal')
const circleArea = document.querySelector('.circle-area')
const circle = document.querySelector('.circle')
const body = document.querySelector('body')

let opened = false

const openModal = function (){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function (){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnCloseModal.addEventListener('click', closeModal)

overlay.addEventListener("click", closeModal)

document.addEventListener('keydown', function (e){
    if (e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal()
    }
})


document.addEventListener('click', function(e){

    // console.log(e.target)

    if(circleArea.contains(e.target)){

        let rect = circleArea.getBoundingClientRect()

        let x = rect.x
        let y = rect.y

        let a = e.clientX
        let b = e.clientY

        circle.style.left = a - x + "px"
        circle.style.top = b - y + "px"

    }

    else if((overlay.contains(e.target) || btnCloseModal.contains(e.target)) && opened){
        closeModal()
        opened = false
    }

    else {
        openModal()
        opened = true
    }

})
