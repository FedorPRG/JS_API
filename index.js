
const timetableOfClassesList = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 0
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
];
let timetableOfClasses = [];

const nameKey = 'timetableOfClasses';
if (localStorage.getItem(nameKey)) {
    timetableOfClasses = JSON.parse(localStorage.getItem(nameKey));
} else {
    localStorage.setItem(nameKey, JSON.stringify(timetableOfClasses));
    timetableOfClasses = JSON.parse(localStorage.getItem(nameKey));
}
//изменение в LocalStorage
function adjustmentLocalStorage(id, newParticipants) {
    currentLocalStorage = JSON.parse(localStorage.getItem(nameKey));
    for (const activity of currentLocalStorage) {
        if (+activity.id === +id) {
            activity.currentParticipants = newParticipants;
        }
    }
    localStorage.setItem(nameKey, JSON.stringify(currentLocalStorage));
}

const container = document.querySelector('.container');
const title = document.createElement('h1');
title.textContent = 'Расписание занятий';
container.insertAdjacentElement('afterbegin', title);

for (const element of timetableOfClasses) {
    const activity = `<div data-id='${element.id}' class='activity'>
    <h1>${element.name}</h1>
    <p>Bремя проведения: ${element.time}</p>
    <p>Mаксимальное количество участников: <snap class='maxParticipants'>${element.maxParticipants}</snap></p>
    <p>Tекущее количество участников: <snap class='currentParticipants'>${element.currentParticipants}</snap></p>
    <div class="wrapper">    
    <button class="signUp">Записаться</button><button  class="cancelEntry">Отменить запись</button></div>
    </div>`;
    container.insertAdjacentHTML('beforeend', activity);
    //Для определения активности/не активности кнопок
    const currentActivity = document.querySelector(`[data-id="${element.id}"]`);
    if (+element.currentParticipants === +element.maxParticipants) {
        currentActivity.querySelector('.signUp').hidden = true;
    }
    if (+element.currentParticipants === 0) {
        currentActivity.querySelector('.cancelEntry').hidden = true;
    }
}
//Записаться
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('signUp')) {
        const parent = event.target.parentElement.parentElement;
        const id = parent.dataset.id;
        const currentParticipants = parent.querySelector('.currentParticipants');
        const maxParticipants = parent.querySelector('.maxParticipants');
        const buttonCancelEntry = parent.querySelector('.cancelEntry');
        if (Number(currentParticipants.textContent) < Number(maxParticipants.textContent)) {
            const newParticipants = Number(currentParticipants.textContent) + 1;
            currentParticipants.textContent = `${newParticipants}`;
            buttonCancelEntry.hidden = 0;
            //изменение в LocalStorage
            adjustmentLocalStorage(id, newParticipants);
            if (newParticipants === Number(maxParticipants.textContent)) {
                event.target.hidden = 1;
            }
        }
    }
});
//Отменить запись
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('cancelEntry')) {
        const parent = event.target.parentElement.parentElement;
        const id = parent.dataset.id;
        const currentParticipants = parent.querySelector('.currentParticipants');
        const buttonSignUp = parent.querySelector('.signUp');
        if (Number(currentParticipants.textContent) > 0) {
            const newParticipants = Number(currentParticipants.textContent) - 1;
            currentParticipants.textContent = `${newParticipants}`;
            //изменение в LocalStorage
            adjustmentLocalStorage(id, newParticipants);
            buttonSignUp.hidden = 0;
            if (newParticipants === 0) {
                event.target.hidden = 1;
            }
        }
    }
});