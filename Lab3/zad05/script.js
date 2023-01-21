'use strict'

const score = document.querySelector('.score')
const redBox = document.querySelector('.box-color-red')
const yellowBox = document.querySelector('.box-color-yellow')
const grayBox = document.querySelector('.box-color-gray')
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector('.reset')
const propBtn = document.querySelector('.start-stop-propagation')
const startStop = document.querySelector('.start-stop')
const list = document.querySelectorAll('.initial-list')[0]
const changeBtn = document.querySelector('.change-order')
const changeOrderSpan = document.querySelector('.change-order-span')

let points, propagation, change

// boxes.forEach(function (item){
//     item.addEventListener('click', function (e){
//         console.log(e.target)
//     })
// })

function displayMessage(color, gained){

    const li = document.createElement("li")
    li.classList.add("propagation-message")
    li.classList.add("to-be-deleted")
    li.textContent = `You clicked on ${color} square, you received ${gained} points`
    li.style.backgroundColor = `${color}`
    list.insertBefore(li, list.firstChild)
}


const init = function (){

    points = 0
    propagation = false
    score.textContent = points
    change = false

    redBox.classList.remove('disabled')

    yellowBox.classList.remove('disabled')

    grayBox.classList.remove('disabled')
    startStop.textContent = "Start propagation"
    changeOrderSpan.textContent = !change ? 'Change order' : 'Take me back'

    document.querySelectorAll('.to-be-deleted').forEach(e => e.remove());

}

init()


resetBtn.addEventListener('click', function () {
    init()
})


function update(){

    if(points >= 30){
        redBox.classList.add('disabled')
    }

    if(points >= 50){
        yellowBox.classList.add('disabled')
    }
}


grayBox.addEventListener('click', function (e){

    points += 1
    score.textContent = points
    update()

    displayMessage('gray', 1)

})



redBox.addEventListener('click', function (e){


    if(points < 30 && propagation && !change){
        points += 3
        displayMessage('gray', 1)
        displayMessage('red', 2)

    }

    else if(points < 30 && propagation && change){
        points += 3
        displayMessage('red', 2)
        displayMessage('gray', 1)
    }

    else if (points >= 30){
        points += 1
        displayMessage('gray', 1)

    }

    else {
        points += 2
        displayMessage('red', 2)
    }

    score.textContent = points
    update()

})


yellowBox.addEventListener('click', function (){

    if(points < 30 && propagation && !change){
        points += 8
        displayMessage('gray', 1)
        displayMessage('red', 2)
        displayMessage('yellow', 5)
    }

    else if(points < 30 && propagation && change){
        points += 8
        displayMessage('yellow', 5)
        displayMessage('red', 2)
        displayMessage('gray', 1)
    }


    else if(points < 50 && propagation && !change){
        points += 6
        displayMessage('gray', 1)
        displayMessage('yellow', 5)

    }

    else if(points < 50 && propagation && change){
        points += 6
        displayMessage('yellow', 5)
        displayMessage('gray', 1)
    }

    else if (points >= 50){
        points += 1
        displayMessage('gray', 1)
    }

    else {
        points += 5
        displayMessage('yellow', 5)

    }

    score.textContent = points
    update()
})


propBtn.addEventListener('click', function(){

    propagation = !propagation
    startStop.textContent = !propagation ? 'Start propagation' : 'Stop propagation'

})

changeBtn.addEventListener('click', function(){

    change = !change
    changeOrderSpan.textContent = !change ? 'Change order' : 'Take me back'

})






