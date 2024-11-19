//carrusel de la pagina:3

let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

function showImage(index) {
    if (index >= totalImages) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalImages - 1;
    } else {
        currentIndex = index;
    }

    images.forEach(img => img.classList.remove('active'));
    images[currentIndex].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => showImage(currentIndex - 1));
document.querySelector('.next').addEventListener('click', () => showImage(currentIndex + 1));


showImage(currentIndex);