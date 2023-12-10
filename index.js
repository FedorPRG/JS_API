const photoContainer = document.getElementById('photo-container');

let page = 1;
const countImg = 20;

async function fetchPhotos() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=${countImg}&client_id=VAOUoxOxDDdi4sk9BKSc3kBMUvGJ52pHsXuQ_9sxMRU`);
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.log('Ошибка при загрузке фотографий'); return [];
    }
}
async function loadMorePhotos() {
    await fetchPhotos().then(obj => Array.from(obj).forEach(element => {
        const photos = `<div class="photo"> <img class="img" src="${element.urls.small}" alt="${element.alt_description}"></img>
<div class="wrapper">

        <p>Имя фотографа: ${element.user.first_name}   <i data-count="0" class="fa-regular fa-heart"></i> <span class="likeCount"></span></p>
        <p>Портфолио фотографа фотографа: <a href="${element.user.portfolio_url}">${element.user.portfolio_url}</a></p></div>
        </div>`;
        photoContainer.insertAdjacentHTML('beforeend', photos);
    }));
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePhotos();
    }
});
loadMorePhotos();

photoContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'I') {
        event.target.classList.replace('fa-regular', 'fa-solid');
        event.target.style.color = 'red';
        const currentLikeCount = +event.target.dataset.count + 1;
        event.target.dataset.count = currentLikeCount;
        event.target.parentElement
            .querySelector('.likeCount').textContent = currentLikeCount;
    }
});
