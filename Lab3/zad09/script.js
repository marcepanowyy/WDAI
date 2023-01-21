const carouselSlide = document.querySelector('.carousel-slide')
const sliders = document.querySelectorAll('.slider')

const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const randomBtn = document.querySelector('.random')


let counter = 1;
const size = sliders[0].clientWidth;

carouselSlide.style.transform = `translateX(${-size * counter}px)`

nextBtn.addEventListener('click', function (e){

    if(counter >= sliders.length - 1) return

    carouselSlide.style.transition = "transform 0.5s ease-in-out"
    counter += 1
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

prevBtn.addEventListener('click', function (e){

    if(counter <= 0) return

    carouselSlide.style.transition = "transform 0.5s ease-in-out"
    counter -= 1
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

carouselSlide.addEventListener('transitionend', function (){

    if(sliders[counter].id === "lastClone"){
        carouselSlide.style.transition = "none"
        counter = sliders.length - 2
        carouselSlide.style.transform = `translateX(${-size * counter}px)`

    }
    if(sliders[counter].id === "firstClone"){
        carouselSlide.style.transition = "none"
        counter = sliders.length - counter
        carouselSlide.style.transform = `translateX(${-size * counter}px)`

    }
})

randomBtn.addEventListener('click', function(){
    counter = (counter + random(6)) % 6
    carouselSlide.style.transition = "transform 0.5s ease-in-out"
    carouselSlide.style.transform = `translateX(${-size * counter}px)`

})

function random(limit){
    return Math.floor(Math.random() * limit)
}

