document.addEventListener("DOMContentLoaded", () => {
    const homeTab = document.getElementById("home-tab");
    const shopTab = document.getElementById("shop-tab");
    const homeSection = document.getElementById("home-section");
    const shopSection = document.getElementById("shop-section");
  
    // Simulate current details
    const currentDetails = {
      home: {
        title: "WELCOME TO ZENOFY",
        description: "Zenofy specializes in providing top-quality products including computers, gadgets, and office accessories."
      },
      shop: {
        caption: "Top Affordable Product Prices in Sri Lanka for Every Budget",
        imageCaption: "Any Caption You Like to be Displayed"
      }
    };
  
    // Populate placeholders
    document.getElementById("home-title").placeholder = currentDetails.home.title;
    document.getElementById("home-description").placeholder = currentDetails.home.description;
    document.getElementById("shop-caption").placeholder = currentDetails.shop.caption;
    document.getElementById("shop-image-caption").placeholder = currentDetails.shop.imageCaption;
  
    // Tab functionality
    homeTab.addEventListener("click", () => {
      homeTab.classList.add("active");
      shopTab.classList.remove("active");
      homeSection.classList.add("active");
      shopSection.classList.remove("active");
    });
  
    shopTab.addEventListener("click", () => {
      shopTab.classList.add("active");
      homeTab.classList.remove("active");
      shopSection.classList.add("active");
      homeSection.classList.remove("active");
    });
  });
  
