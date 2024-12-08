const reviewFields = document.querySelectorAll('.review-field');

reviewFields.forEach(field => {
    const percentageElement = field.querySelector('.review-percentage');
    const statusElement = field.querySelector('.status');

    const percentage = parseInt(percentageElement.textContent.replace('%', ''));

    if (percentage >= 90) {
        statusElement.textContent = 'Excellent';
        statusElement.style.color = 'green';
    } else if (percentage >= 70) {
        statusElement.textContent = 'Good';
        statusElement.style.color = '#63AC43';
    } else if (percentage >= 50) {
        statusElement.textContent = 'Average';
        statusElement.style.color = 'orange';
    } else {
        statusElement.textContent = 'Poor';
        statusElement.style.color = 'red';
    }
});

reviewFields.forEach(field => {
    const percentageElement = field.querySelector('.review-percentage');
    const barElement = field.querySelector('.review-bar');

    const percentage = parseInt(percentageElement.textContent.replace('%', ''));

    // Set the width of the bar as a percentage
    barElement.style.width = percentage + '%';
});

function updateStars() {
    const ovrRatingElement = document.querySelector('.ovr-rating');
    const ratingValue = parseFloat(ovrRatingElement.textContent);
  
    const ratingContainer = document.querySelector('.rating');
    ratingContainer.innerHTML = '';
  
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
  
      if (i < ratingValue) {
        star.style.color = 'yellow';
      } else if (i === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
        star.style.color = 'blue'; // Half-filled star
      } else {
        star.style.color = 'gray';
      }
  
      star.textContent = '★';
      ratingContainer.appendChild(star);
    }
  }
  
  // Call the function to update the stars
  updateStars();

function triggerFileInput() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', (event) => {
    const files = event.target.files;

    // Limit to 3 images
    if (files.length > 3) {
        alert('You can only upload 3 images.');
        return;
    }

    const imageContainers = document.querySelectorAll('.small-img');

    // Display the selected images
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageContainers[i].querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(files[i]);
    }
});

function openPopUp() {
  document.getElementById("popup-container").style.display = "flex";
}

function closePopUp() {
  document.getElementById("popup-container").style.display = "none";
}

document.querySelectorAll('.review-option').forEach(option => {
  option.addEventListener('click', () => {
      option.classList.toggle('selected');
      const input = option.querySelector('input');
      input.disabled = !option.classList.contains('selected');
  });
});

const stars = document.querySelectorAll('.starpopup');
const ratingValue = document.getElementById('rating-value');

stars.forEach(starpopup => {
  starpopup.addEventListener('click', () => {
        const value = starpopup.getAttribute('data-value');
        ratingValue.value = value;
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
    });
});

