//............................................................... Script ...................................................................
// Data for the sections
let h1Texts = ["Pear", "Apple", "Exotic"];
let logoColors = [
  "var(--pear-logo)",
  "var(--apple-logo)",
  "var(--exotic-logo)"
];
let keyframes = ["wave-pear-effect", "wave-apple-effect", "wave-exotic-effect"];

// Custom random function for GSAP replacement
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Normal JS animation without GSAP
function animateImages() {
  const images = document.querySelectorAll('.fruit-image img');
  
  // Initial animation for fruit-image containers
  document.querySelectorAll('.fruit-image').forEach((el, i) => {
    el.style.transform = 'translateY(-100vh)';
    el.style.opacity = '0';
    
    setTimeout(() => {
      el.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, 500 + (i * 100));
  });

  // Floating animation for images
  images.forEach(img => {
    animateFloat(img);
  });
}

// Floating animation function
function animateFloat(element) {
  let directionX = 1;
  let directionY = 1;
  let posX = 0;
  let posY = 0;
  const speed = 0.5;
  
  function move() {
    // Change direction randomly
    if (Math.random() < 0.02) {
      directionX = Math.random() < 0.5 ? -1 : 1;
    }
    if (Math.random() < 0.02) {
      directionY = Math.random() < 0.5 ? -1 : 1;
    }
    
    // Calculate new position
    posX += (random(-1, 1) + directionX * 0.5) * speed;
    posY += (random(-1, 1) + directionY * 0.5) * speed;
    
    // Limit movement range
    posX = Math.max(-20, Math.min(20, posX));
    posY = Math.max(-20, Math.min(20, posY));
    
    // Apply transformation
    element.style.transform = `translate(${posX}px, ${posY}px)`;
    element.style.zIndex = '22';
    
    // Continue animation
    requestAnimationFrame(move);
  }
  
  move();
}

// get the elements
const waveEffect = document.querySelector(".wave");
const sections = document.querySelectorAll(".section");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const caneLabels = document.querySelector(".cane-labels");
const sectionContainer = document.querySelector(".section-container");
// Set index and current position
let index = 0;
let currentIndex = 0;
let currentPosition = 0;

// Initialize animations
animateImages();

// Add event listeners to the buttons
nextButton.addEventListener("click", () => {
  // Decrease the current position by 100% (to the left)
  if (currentPosition > -200) {
    currentPosition -= 100;
    // Update the left position of the cane-labels
    caneLabels.style.left = `${currentPosition}%`;
    sectionContainer.style.left = `${currentPosition}%`;
  }
  // Increment index and currentIndex
  currentIndex++;
  // Update the h1 text if currentIndex is less than the length of h1Texts
  if (currentIndex < h1Texts.length) {
    document.querySelector(".h1").innerHTML = h1Texts[currentIndex];
  }
  
  // JS animation for next section components without GSAP
  const logo = document.querySelector(".logo");
  const h1 = document.querySelector(".h1");
  const fruitImages = document.querySelectorAll(".fruit-image");
  
  // Logo animation
  logo.style.transition = 'color 1s ease, opacity 1s ease';
  logo.style.color = logoColors[currentIndex];
  logo.style.opacity = '1';
  
  // H1 animation
  h1.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  h1.style.transform = 'translateY(20%)';
  h1.style.opacity = '0';
  
  setTimeout(() => {
    h1.style.transform = 'translateY(0)';
    h1.style.opacity = '1';
  }, 50);
  
  // Fruit image animation
  fruitImages.forEach((img, i) => {
    img.style.transition = 'transform 0.4s ease-out 0.4s';
    img.style.transform = 'translateY(-100vh)';
    
    setTimeout(() => {
      img.style.transform = 'translateY(0)';
    }, 400 + (i * 100));
  });

  // Disable the nextButton if the last section is active
  if (currentIndex === h1Texts.length - 1) {
    nextButton.style.display = "none";
  }
  // Enable the prevButton if it's not the first section
  if (currentIndex > 0) {
    prevButton.style.display = "block";
  }
  // Button colors and animations
  if (currentIndex + 1 < logoColors.length) {
    nextButton.style.color = logoColors[currentIndex + 1];
  }
  if (currentIndex - 1 >= 0) {
    prevButton.style.color = logoColors[currentIndex - 1];
  }
  
  if (currentIndex + 1 < keyframes.length) {
    nextButton.style.animationName = keyframes[currentIndex + 1];
  }
  if (currentIndex - 1 >= 0) {
    prevButton.style.animationName = keyframes[currentIndex - 1];
  }
});

// Add event listeners to the buttons
prevButton.addEventListener("click", () => {
  if (currentPosition < 0) {
    currentPosition += 100;
    // Update the left position of the cane-labels
    caneLabels.style.left = `${currentPosition}%`;
    sectionContainer.style.left = `${currentPosition}%`;
    sectionContainer.style.transition = `all 0.5s ease-in-out`;
  }
  // Decrement index and currentIndex
  currentIndex--;
  if (currentIndex >= 0) {
    document.querySelector(".h1").innerHTML = h1Texts[currentIndex];
  }
  
  // JS animation for previous section components without GSAP
  const logo = document.querySelector(".logo");
  const h1 = document.querySelector(".h1");
  const fruitImages = document.querySelectorAll(".fruit-image");
  
  // Logo animation
  logo.style.transition = 'color 1s ease';
  logo.style.color = logoColors[currentIndex];
  
  // H1 animation
  h1.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  h1.style.transform = 'translateY(20%)';
  h1.style.opacity = '0';
  
  setTimeout(() => {
    h1.style.transform = 'translateY(0)';
    h1.style.opacity = '1';
  }, 50);
  
  // Fruit image animation
  fruitImages.forEach((img, i) => {
    img.style.transition = 'transform 0.5s ease-out 0.5s';
    img.style.transform = 'translateY(100vh)';
    
    setTimeout(() => {
      img.style.transform = 'translateY(0)';
    }, 500 + (i * 100));
  });

  // Enable the nextButton if it was disabled
  nextButton.style.display = "block";
  // Disable the prevButton if it's the first section
  if (currentIndex === 0) {
    prevButton.style.display = "none";
  }
  // Button colors and animations
  if (currentIndex + 1 < logoColors.length) {
    nextButton.style.color = logoColors[currentIndex + 1];
  }
  if (currentIndex - 1 >= 0) {
    prevButton.style.color = logoColors[currentIndex - 1];
  }
  
  if (currentIndex + 1 < keyframes.length) {
    nextButton.style.animationName = keyframes[currentIndex + 1];
  }
  if (currentIndex - 1 >= 0) {
    prevButton.style.animationName = keyframes[currentIndex - 1];
  }
});

//hamburger-menu
document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})

document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})