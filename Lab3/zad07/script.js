'use strict'

const overlay = document.querySelector('.overlay')

const mod1 = document.querySelector('.mod1')
const mod2 = document.querySelector('.mod2')
const mod3 = document.querySelector('.mod3')
const mod4 = document.querySelector('.mod4')
const mod5 = document.querySelector('.mod5')
const mod6 = document.querySelector('.mod6')
const mod7 = document.querySelector('.mod7')

const modalALl = document.querySelectorAll('.modal-inside')
const buttons = document.querySelectorAll('.btn')

let cityMalopolska = ""
let hasDoubleA = ""
let citiesOver = ""


/////// start OPEN/CLOSE modals


const closeModal = function () {
    overlay.classList.add('hidden');
    for(let i = 0; i < modalALl.length; i++){
        modalALl[i].classList.add('hidden')
    }
};

function openModal(){
    overlay.classList.remove('hidden')
}

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal();
    }
});

for (let i = 0; i < buttons.length; i++)
    buttons[i].addEventListener('click', function (){
        openModal()
        modalALl[i].classList.remove('hidden')
    })


/////// end OPEN/CLOSE modals

// *********** cities req

async function loadCities(){

    const response = await fetch("http://localhost:3000/cities?")
    const data = await response.json();

    for(let el of data){
        getMalopolCity(el)
        getDoubleACity(el)
        getOverCity(el)
    }
    const specialCity = getSpecialCity(data)
    const over = getInfo1(data)
    const avgArea = getInfo2(data)
    const cityNum = getInfo3(data)


    mod1.textContent = `Miasta tylko z wojewodztwa malopolskiego: ${cityMalopolska}`

    mod2.textContent = `Miasta, ktore w swojej nazwie posiadaja wyłącznie dwa znaki 'a', to: ${hasDoubleA}`

    mod3.textContent = `Miasto, piąte pod względem zaludnienia to ${specialCity}`

    mod4.textContent = `Miasta powyżej 100 tys. mieszkancow to: ${citiesOver}`

    mod5.textContent = `Więcej jest miast, które mają po${ over > data.length ? 'wy' : 'ni'}żej 80000 mieszkańców. 
                        Liczba miast, liczących powyżej 80000 mieszkańców to ${over},
                        Liczba miast, liczących co najwyżej 80000 mieszkańców to ${data.length - over}`

    mod6.textContent = `Średnia powierzchnia miast z powiatów zaczynających się na literkę "P" wynosi ${avgArea}`

    mod7.textContent = typeof cityNum === "number" ?
                       `Nie wszystkie miasta sa wieksze od 5000 osob, takich miast jest ${cityNum}` :
                       'wszystkie miasta z wojewodztwa pomorksiego sa wieksze od 5000 osob'
}

loadCities()

function getMalopolCity(element){
    if(element.province === 'małopolskie') cityMalopolska += `${element.name}, `
}

function getDoubleACity(element){
    if(element.name.split('a').length - 1 === 2) hasDoubleA += `${element.name}, `
}

function getSpecialCity(data){
    data.sort((a, b) => b.dentensity - a.dentensity);
    return data[4].name
}

function getOverCity(element){
    if(element.people > 10 ** 5) citiesOver += `${element.name} `+ 'City, '
}

function getInfo1(data){
    return data.filter(element => element.people > 8 * 10 ** 4).length
}

function getInfo2(data){
    const filtered = data.filter(element => element.township.toLowerCase().startsWith('p'))
    return (filtered.reduce((acc, v) => acc + v.area, 0) / filtered.length || 0).toFixed(2)
}

function getInfo3(data){
    const pomorskieFiltered = data.filter(element => element.province === 'pomorskie')
    const pivotCities = pomorskieFiltered.filter(element => element.people > 5 * 10 ** 3)
    if(pivotCities.length === pomorskieFiltered.length) return true
    else return pivotCities.length
}

// **************** end cities req

