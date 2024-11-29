// script.js
const canvas = document.getElementById('petCanvas');
const ctx = canvas.getContext('2d');

let hunger = 5;
let happiness = 5;
let health = 5;
let feedingCount = 0;
let isFeeding = false;
let isSpecialAnimation = false;
let breathScale = 1.0;
let breathDirection = 1;

// Function to draw the pet
function drawPet() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply breathing or special animation effect
  const scale = isFeeding ? 1.2 : isSpecialAnimation ? 1.3 : breathScale;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Body
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(30, 30, 40, 40);

  // Eyes
  ctx.fillStyle = '#000';
  ctx.fillRect(38, 40, 4, 4);
  ctx.fillRect(58, 40, 4, 4);

  // Mouth (Changes based on mood)
  if (happiness > 5) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(50, 60, 5, 0, Math.PI, false); // Smile
    ctx.stroke();
  } else {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(50, 65, 5, 0, Math.PI, true); // Frown
    ctx.stroke();
  }

  ctx.restore();
}

// Function to update pet status display
function updateStatus() {
  document.getElementById('hunger').innerText = hunger;
  document.getElementById('happiness').innerText = happiness;
  document.getElementById('health').innerText = health;
  document.getElementById('progress-count').innerText = feedingCount;

  const progressPercentage = (feedingCount / 10) * 100;
  document.getElementById('progress-fill').style.width =
    `${progressPercentage}%`;
}

// Functions to update pet status
function feedPet() {
  if (hunger > 0) {
    hunger--;
    health++;
    happiness++;
    feedingCount++;
    startFeedingAnimation();

    if (feedingCount >= 10) {
      startSpecialAnimation();
    }
  }
  updateStatus();
}

function playWithPet() {
  if (happiness < 10) {
    happiness++;
  }
  hunger++;
  health = Math.min(health + 1, 10);
  updateStatus();
  drawPet();
}

function healPet() {
  if (health < 10) {
    health++;
    happiness++;
  }
  updateStatus();
  drawPet();
}

// Function to start feeding animation
function startFeedingAnimation() {
  isFeeding = true;
  setTimeout(() => {
    isFeeding = false;
  }, 1000); // Feeding animation lasts 1 second
}

// Function to start special animation
function startSpecialAnimation() {
  isSpecialAnimation = true;
  feedingCount = 0; // Reset the feeding progress
  setTimeout(() => {
    isSpecialAnimation = false;
  }, 2000); // Special animation lasts 2 seconds
}

// Function to automatically decrease health and happiness over time
function decreaseStats() {
  if (hunger < 10) hunger++;
  if (happiness > 0) happiness--;
  if (hunger >= 8 && health > 0) health--; // If very hungry, decrease health

  if (health <= 0) {
    alert('Your pet has passed away! Resetting...');
    resetPet();
  }

  updateStatus();
}

// Function to reset pet stats
function resetPet() {
  hunger = 5;
  happiness = 5;
  health = 5;
  feedingCount = 0;
  updateStatus();
}

// Breathing animation function
function breathingAnimation() {
  // Change the scale factor to simulate breathing in and out
  if (breathDirection === 1) {
    breathScale += 0.005;
    if (breathScale > 1.05) breathDirection = -1;
  } else {
    breathScale -= 0.005;
    if (breathScale < 0.95) breathDirection = 1;
  }

  drawPet();
  requestAnimationFrame(breathingAnimation);
}

// Initial setup function
function init() {
  updateStatus();
  setInterval(decreaseStats, 5000); // Decrease stats every 5 seconds
  breathingAnimation(); // Start the breathing animation loop
}

// Start the pet
init();
