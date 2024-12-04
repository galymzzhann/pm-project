// Define arrays to hold habits
let goodHabits = JSON.parse(localStorage.getItem('goodHabits')) || [];
let badHabits = JSON.parse(localStorage.getItem('badHabits')) || [];

// Predefined good habits and their images
const predefinedGoodHabits = {
  "Water": "images/water.png",
  "Running": "images/running.jpg",
  "Swimming": "images/swimming.jpg",
  "Walking": "images/walking.jpg",
  "Cycling": "images/cycling.jpg",
  "Yoga": "images/yoga.jpg",
  "Reading": "images/reading.jpg",
  "Meditation": "images/meditation.jpg",
  "Stretching": "images/stretching.jpg",
  "Sleeping Early": "images/sleeping.jpg"
};

// Predefined bad habits and their images
const predefinedBadHabits = {
  "Smoking": "images/smoking.jpg",
  "Drinking Soda": "images/soda.jpg",
  "Overeating": "images/overeating.jpg",
  "Procrastination": "images/procrastination.jpg",
  "Nail Biting": "images/nailbiting.jpg",
  "Late Night Snacking": "images/snacking.jpg",
  "Watching Too Much TV": "images/tv.jpg",
  "Skipping Meals": "images/skippingmeals.jpg",
  "Excessive Social Media": "images/socialmedia.jpg",
  "Neglecting Sleep": "images/sleepinglate.jpg"
};

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set up event listeners for the links
  document.getElementById('good-habits-link').addEventListener('click', showGoodHabits);
  document.getElementById('bad-habits-link').addEventListener('click', showBadHabits);

  // Initially, load the Good Habits content by default
  showGoodHabits();
});

// Function to render Good Habits
function renderGoodHabits() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <h2>Good Habits</h2>
    <button id="add-good-habit">Add Good Habit</button>
    <div id="good-habits-list"></div>
  `;

  const list = document.getElementById('good-habits-list');
  
  // Render good habits if they exist
  if (goodHabits.length > 0) {
    goodHabits.forEach((habit, index) => {
      const habitDiv = document.createElement("div");
      habitDiv.className = "habit";
      habitDiv.innerHTML = `
        <div style="display:flex; align-items:center; justefy-content: center">
        <img src="${habit.image}" alt="${habit.name}" class="habit-image" />  
        <span>${habit.name} - ${habit.progress}/${habit.goal}</span>
        </div>
        <div>
        <button onclick="incrementGoodHabit(${index})">+</button>
        <button onclick="deleteGoodHabit(${index})">Delete</button>
        </div>
        `;
      list.appendChild(habitDiv);
    });
  } else {
    list.innerHTML = "<p>No good habits added yet. Start by adding one!</p>";
  }

  // Add event listener for the "Add Good Habit" button
  document.getElementById('add-good-habit').addEventListener('click', addGoodHabit);
}

// Function to add a Good Habit
function addGoodHabit() {
  const habitName = prompt("Enter a new good habit:");
  const goal = parseInt(prompt("Enter your daily goal:"), 10);
  if (habitName && goal) {
    // Check if the habit is in the predefined list
    const habitImage = predefinedGoodHabits[habitName] || "images/default.jpg"; // Use default image if not in the predefined list
    goodHabits.push({ name: habitName, goal, progress: 0, image: habitImage });
    saveToLocalStorage();
    renderGoodHabits(); // Re-render the list after adding
  }
}

// Function to increment progress for a Good Habit
function incrementGoodHabit(index) {
  if (goodHabits[index].progress < goodHabits[index].goal) {
    goodHabits[index].progress += 1;
    saveToLocalStorage();
    renderGoodHabits();
  } else {
    alert("Goal achieved!");
  }
}

// Function to delete a Good Habit
function deleteGoodHabit(index) {
  goodHabits.splice(index, 1); // Remove the habit from the array
  saveToLocalStorage(); // Update localStorage
  renderGoodHabits(); // Re-render the list
}

// Function to render Bad Habits
function renderBadHabits() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <h2>Bad Habits</h2>
    <button id="add-bad-habit">Add Bad Habit</button>
    <div id="bad-habits-list"></div>
  `;

  const list = document.getElementById('bad-habits-list');
  
  // Render bad habits if they exist
  if (badHabits.length > 0) {
    badHabits.forEach((habit, index) => {
      const habitDiv = document.createElement("div");
      habitDiv.className = "habit";
      habitDiv.innerHTML = `
        <span>${habit.name} - Days Clean: ${habit.streak}</span>
        <img src="${habit.image}" alt="${habit.name}" class="habit-image" />
        <button onclick="deleteBadHabit(${index})">Delete</button>
      `;
      list.appendChild(habitDiv);
    });
  } else {
    list.innerHTML = "<p>No bad habits added yet. Start by adding one!</p>";
  }

  // Add event listener for the "Add Bad Habit" button
  document.getElementById('add-bad-habit').addEventListener('click', addBadHabit);
}

// Function to add a Bad Habit
function addBadHabit() {
  const habitName = prompt("Enter a new bad habit:");
  if (habitName) {
    // Check if the habit is in the predefined list
    const habitImage = predefinedBadHabits[habitName] || "images/default-bad.jpg"; // Use default image if not in the predefined list
    badHabits.push({ name: habitName, streak: 0, image: habitImage });
    saveToLocalStorage();
    renderBadHabits(); // Re-render the list after adding
  }
}

// Function to delete a Bad Habit
function deleteBadHabit(index) {
  badHabits.splice(index, 1); // Remove the habit from the array
  saveToLocalStorage(); // Update localStorage
  renderBadHabits(); // Re-render the list
}

// Function to save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem('goodHabits', JSON.stringify(goodHabits));
  localStorage.setItem('badHabits', JSON.stringify(badHabits));
}

// Function to switch to the Good Habits page
function showGoodHabits() {
  renderGoodHabits(); // Render the good habits section
}

// Function to switch to the Bad Habits page
function showBadHabits() {
  renderBadHabits(); // Render the bad habits section
}
