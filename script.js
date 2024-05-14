// script.js
const colorMap = {
  red: 1,
  orange: 2,
  yellow: 3,
  green: 4,
  blue: 5,
  indigo: 6,
  violet: 7,
};

const resultText = document.getElementById("result-text");
const playButton = document.getElementById("play-btn");

playButton.addEventListener("click", () => {
  const chosenColor = getChosenColor();
  const userFingers = getUserFingers();

  if (chosenColor === null || userFingers === null) {
    resultText.textContent =
      "Please choose a color and enter number of fingers.";
    return;
  }

  const botFingers = Math.floor(Math.random() * 11); // Generate random number 0-10
  const totalFingers = userFingers + botFingers;
  const matchingNumber = getColorByTotal(totalFingers);

  let result = `You chose ${chosenColor} and showed ${userFingers} fingers.\n`;
  result += `Bot showed ${botFingers} fingers.\n`;
  result += `Total is ${totalFingers}.\n`;

  if (totalFingers === matchingNumber) {
    result += "You win!";
  } else {
    result += "You lose.";
  }

  resultText.textContent = result;
});

function getColorByTotal(totalFingers) {
  const colors = Object.keys(colorMap); // Get all color names as an array
  const index = (totalFingers - 1) % colors.length; // Calculate index based on total
  return colors[index];
}

function getChosenColor() {
  const buttons = document.querySelectorAll(".color-selection button");
  for (const button of buttons) {
    if (button.classList.contains("active")) {
      return button.textContent.toLowerCase();
    }
  }
  return null;
}

function getUserFingers() {
  const userFingersInput = document.getElementById("user-fingers");
  const userFingers = parseInt(userFingersInput.value);
  if (isNaN(userFingers) || userFingers < 0 || userFingers > 10) {
    return null;
  }
  return userFingers;
}

function displayChosenColor(color) {
  // Create a temporary element with some content
  const colorDisplay = document.createElement("span");
  colorDisplay.textContent = `You have chosen the color ${color}`; // Set the text content to the chosen color
  colorDisplay.style.padding = "5px";
  colorDisplay.style.margin = "5px";

  // Clear any existing color display
  resultText.innerHTML = ""; // Remove previous content

  // Display the element
  resultText.appendChild(colorDisplay);

  // Optionally, remove the element after a short delay
  setTimeout(() => {
    resultText.removeChild(colorDisplay);
  }, 1500); // Remove after 1 second
}

// Add event listeners to color buttons to handle selection and display chosen color
const colorButtons = document.querySelectorAll(".color-selection button");
for (const button of colorButtons) {
  button.addEventListener("click", () => {
    colorButtons.forEach((btn) => btn.classList.remove("active")); // Deselect all buttons
    button.classList.add("active"); // Select clicked button
    const chosenColor = button.textContent.toLowerCase();
    displayChosenColor(chosenColor);
  });
}
