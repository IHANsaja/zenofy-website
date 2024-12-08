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

  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const imagePreview = document.getElementById('imagePreview');   
  
  
  uploadButton.addEventListener('click', () => {
      const file = fileInput.files[0];
  
      if (file) {
          const reader = new FileReader();
  
          reader.onload = (e) => {
              const img = document.createElement('img');
              img.src = e.target.result;
              imagePreview.appendChild(img); 
  
              imagePreview.style.display = 'block';
          };
  
          reader.readAsDataURL(file);
      }
  });

  const ratingLabels = document.querySelectorAll('.rating label');

ratingLabels.forEach((label, index) => {
  label.addEventListener('mouseover', () => {
    for (let i = 0; i <= index; i++) {
      ratingLabels[i].style.color = 'gold';
    }
  });

  label.addEventListener('mouseout', () => {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    const selectedIndex = Array.from(ratingLabels).indexOf(selectedRating.nextElementSibling);

    for (let i = 0; i < ratingLabels.length; i++) {
      if (i <= selectedIndex) {
        ratingLabels[i].style.color = 'gold';
      } else {
        ratingLabels[i].style.color = 'black'; // Or any default color
      }
    }
  });
});