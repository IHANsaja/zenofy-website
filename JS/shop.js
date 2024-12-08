let slideIndex = 0;
showSlides(slideIndex);

// Function to set the slide directly when a dot is clicked
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function to change slide by a given increment (e.g., -1 for prev, 1 for next)
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Function to display the correct slide and update active dot
function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    // Loop back to the first slide if we go past the last one, and vice versa
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }

    // Show the current slide and highlight the current dot
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active-dot");
}

// Auto-advance slides every 3 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

let currentIndex1 = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // width + margin
    const visibleCards = Math.floor(carousel.parentElement.offsetWidth / cardWidth);
    const maxIndex1 = cards.length - visibleCards;

    currentIndex1 += direction;
    if (currentIndex1 < 0) {
        currentIndex1 = 0;
    } else if (currentIndex1 > maxIndex1) {
        currentIndex1 = maxIndex1;
    }

    carousel.style.transform = `translateX(${-currentIndex1 * cardWidth}px)`;
}

let currentIndex2 = 0;

function moveCarousel2(direction) {
    const carousel2 = document.querySelector('.carousel2');
    const cards2 = document.querySelectorAll('.card2');
    const cardWidth = cards2[0].offsetWidth + 20; // width + margin
    const visibleCards = Math.floor(carousel2.parentElement.offsetWidth / cardWidth);
    const maxIndex2 = cards2.length - visibleCards;

    currentIndex2 += direction;
    if (currentIndex2 < 0) {
        currentIndex2 = 0;
    } else if (currentIndex2 > maxIndex2) {
        currentIndex2 = maxIndex2;
    }

    carousel2.style.transform = `translateX(${-currentIndex2 * cardWidth}px)`;
}