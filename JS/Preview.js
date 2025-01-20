const minusButton=document.getElementById('minus');
    const plusButton=document.getElementById('plus');
    const inputQuontity=document.getElementById('quantity');

    function getValue() {
        return parseInt(inputQuontity.value)||0;
    }

    plusButton.onclick = function (event) {
      if (getValue() < 5) { // Limit the value to 5
          inputQuontity.value = getValue() + 1;
      }};

    minusButton.onclick = function (event) {
      if (getValue() > 1) { // Prevent going below 0
          inputQuontity.value = getValue() - 1;
      }};

        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            const closeMenu = document.querySelector('.close-menu');

            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.add('show');
            });

            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
            });
        });