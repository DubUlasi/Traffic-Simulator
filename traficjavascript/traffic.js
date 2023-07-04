// JavaScript code

let runLight = false;
let interval;
let step = 1;
let count = 0;//index of the colors class (red, yellow, green.)
const durations = [10, 2, 10]; // Durations for each color in seconds

/**
 * Removes the classes from the elements
 * 
 * @param {HTMLCollection} elem - The collection of elements
 * @param {string[]} colors - The array of class names
 */
function removeClasses(elem, colors) {
  let len = colors.length;
  for (let item of elem) {
    for (let i = 0; i < len; i++) {
      if (item.classList.contains(colors[i])) {
        item.classList.remove(colors[i]);

      }
    }
  }
}

/**
 * Runs the interval for the traffic light sequence
 * 
 * @param {HTMLCollection} elem - The collection of elements
 * @param {string[]} colors - The array of class names
 */
function runInterval(elem, colors) {
  elem[count].classList.add(colors[count]);
  let len = elem.length;
  let duration = durations[count] * 1000; // Convert duration to milliseconds
  let countdown = duration / 1000; // Countdown in seconds.
  interval = setInterval(function () {
    removeClasses(elem, colors);
    count += step;
    elem[count].classList.add(colors[count]);
    if (count === len - 1 || count === 0) {
      step = -step;
    }
    duration = durations[count] * 1000; // Update duration for the next color
    countdown = duration / 1000; // Update countdown in seconds
    document.getElementById("counter-bar").innerHTML = `<span class="duration">${countdown}s</span>`;
    setTimeout(() => {
      if (countdown >= 0) {
        for(let i=0; i<=countdown; i--){
          document.querySelector('.duration').textContent = `${i}s`;
        }
      }
    }, 100);
  }, duration);
}

/**
 * Runs the traffic light sequence
 */
function run() {
  let light = document.querySelectorAll('.circle');
  if (light !== null) {
    let lightColor = ["red" , "yellow" , "green" ];
    runInterval(light, lightColor);
  }
}

/**
 * Initializes the event handler for the run button
 */
function start() {
  let btn = document.querySelector('.btn-run');
  if (btn !== null) {
    btn.onclick = function (event) {
      runLight = !runLight;
      if (runLight) {
        run();
        btn.innerText = "Pause";
      } else {
        clearInterval(interval);
        btn.innerText = "Run";
      }
    };
  }
}

// Call the start function
start();
