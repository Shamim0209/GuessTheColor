let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#color-display");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let count = 0;
let modeButtons = document.querySelectorAll(".mode");
init();
function init() {
  colorDisplay.innerHTML = pickedColor;
  setupMode();
  setupSquares();

  reset();
}
resetButton.addEventListener("click", function () {
  reset();
});

function makeColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
function getRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(makeColor());
  }
  return arr;
}
function chooseColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
function changeColors(color) {
  for (const element of squares) {
    element.style.backgroundColor = color;
  }
}
function reset() {
  count = 0;
  colors = getRandomColors(numSquares);
  pickedColor = chooseColor();

  colorDisplay.innerHTML = pickedColor;
  resetButton.innerHTML = "New Colors";
  messageDisplay.innerHTML = "";

  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

function setupMode() {
  for (const element of modeButtons) {
    element.addEventListener("click", function () {
      for (const i of modeButtons) {
        i.classList.remove("selected");
      }

      this.classList.add("selected");
      if (this.innerHTML === "Easy") {
        numSquares = 3;
      } else {
        numSquares = 6;
      }
      reset();
    });
  }
}
function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
      let clickedColor = this.style.backgroundColor
        .toLowerCase()
        .replace(/\s/g, "");
      let pickedColorFormatted = pickedColor.toLowerCase().replace(/\s/g, "");

      if (clickedColor === pickedColorFormatted) {
        messageDisplay.innerHTML = "Correct";
        resetButton.innerHTML = "Play Again";
        changeColors(pickedColor);
        count = 0;
      } else {
        if (numSquares == 6) {
          count++;
          this.style.backgroundColor = "black";
          messageDisplay.innerHTML =
            "Try Again :" + (3 - count) + " steps remaining";

          if (count >= 3) {
            messageDisplay.innerHTML = "Game Over";
            changeColors("black");
            resetButton.innerHTML = "Play Again";
          }
        }
        else{
            messageDisplay.innerHTML = "Game Over";
            changeColors("black");
            resetButton.innerHTML = "Play Again";
        }
      }
    });
  }
}
