
const data = [
    {
        'id': 0,
        'scr': './slider1.jpg'
    }, {
        'id': 1,
        'scr': './slider2.jpg'
    }, {
        'id': 2,
        'scr': './slider3.jpg'
    }, {
        'id': 3,
        'scr': './slider4.jpg'
    }, {
        'id': 4,
        'scr': './slider5.jpg'
    }, {
        'id': 5,
        'scr': './slider6.jpg'
    }
];

const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');
const previousBTN = document.querySelector('.previousBTN');
const nextBTN = document.querySelector('.nextBTN');
let sliderIndex = 0;

data.forEach((element) => {
    const slider = `<img hidden src="${element.scr}" alt="">`;
    container.insertAdjacentHTML('beforeend', slider);
    const circle = ` <i data-id=${element.id} class="fa-regular fa-circle"></i>`;
    wrapper.insertAdjacentHTML('beforeend', circle);
});

const sliders = document.querySelectorAll('img');
sliders[sliderIndex].hidden = 0;

const circles = document.querySelectorAll('.fa-circle');
circles[sliderIndex].classList.replace('fa-regular', 'fa-solid');

previousBTN.addEventListener('click', () => {
    sliders[sliderIndex].hidden = 1;
    circles[sliderIndex].classList.replace('fa-solid', 'fa-regular');
    sliderIndex === 0 ? sliderIndex = sliders.length - 1 :
        sliderIndex -= 1;

    sliders[sliderIndex].hidden = 0;
    circles[sliderIndex].classList.replace('fa-regular', 'fa-solid');
});

nextBTN.addEventListener('click', () => {
    sliders[sliderIndex].hidden = 1;
    circles[sliderIndex].classList.replace('fa-solid', 'fa-regular');
    sliderIndex = (sliderIndex + 1) % sliders.length;
    sliders[sliderIndex].hidden = 0;
    circles[sliderIndex].classList.replace('fa-regular', 'fa-solid');
});

wrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-circle')) {
        sliders[sliderIndex].hidden = 1;
        circles[sliderIndex].classList.replace('fa-solid', 'fa-regular');
        sliderIndex = +event.target.dataset.id;
        sliders[sliderIndex].hidden = 0;
        circles[sliderIndex].classList.replace('fa-regular', 'fa-solid');
    }
});