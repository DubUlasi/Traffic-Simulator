// Constants
const RED_TEXT = 'red';
const YELLOW_TEXT = 'yellow';
const GREEN_TEXT = 'green';
const YELLOW_LIGHT_DURATION = 4;

// Traffic Light Schematic Object
const trafficLightSchematic = function(element, redDuration, greenDuration, yellowDuration = YELLOW_LIGHT_DURATION) {
    this.redDuration = redDuration;
    this.yellowDuration = yellowDuration;
    this.greenDuration = greenDuration;
    this.element = element;

    // Method to show the red signal of the traffic light using nullish coalescing operator
    this.showRed = function(duration = undefined) {
        displayLightAndCounter(duration ?? this.redDuration, this.element, RED_TEXT);
    };

    // Method to show the yellow signal of the traffic light using nullish coalescing operator
    this.showYellow = function(duration = undefined) {
        displayLightAndCounter(duration ?? this.yellowDuration, this.element, YELLOW_TEXT);
    };

    // Method to show the green signal of the traffic light using nullish coalescing operator
    this.showGreen = function(duration = undefined) {
        displayLightAndCounter(duration ?? this.greenDuration, this.element, GREEN_TEXT);
    };

    // Method to run the display sequence of the traffic light with the three colors duration as parameters
    this.runDisplay = function(redDuration, yellowDuration, greenDuration) {
        this.showRed(redDuration);
        setTimeout(() => this.showYellow(yellowDuration), (redDuration * 1000) + 500);
        setTimeout(() => this.showGreen(greenDuration), ((redDuration + yellowDuration) * 1000) + 500);
        setTimeout(() => this.showYellow(yellowDuration), ((redDuration + yellowDuration + greenDuration) * 1000) + 500);
    };

    // Overloaded method to run the default display sequence of the traffic light
    this.runDisplay = function() {
        this.showRed(this.redDuration);
        setTimeout(() => this.showYellow(this.yellowDuration), (this.redDuration * 1000) + 500);
        setTimeout(() => this.showGreen(this.greenDuration), ((this.redDuration + this.yellowDuration) * 1000) + 500);
        setTimeout(() => this.showYellow(this.yellowDuration),
            ((this.redDuration + this.yellowDuration + this.greenDuration) * 1000) + 500);
    };

    // Method to calculate the total duration of the traffic light sequence
    this.totalDuration = function() {
        return this.redDuration + (this.yellowDuration * 2) + this.greenDuration;
    };
};


// Traffic Light References
/*Traffic lights durations and position objects
 * each of the traffic lights here have been assigned to only one of the 4 traffic lights.
 * the numbers reppresents the duration of the red and green lights respectively. 
 * so the lights onl switch when the seconds for each light ended.
 * overall they just specify the traffic lights durations while being used in the trafficLightSchematic object
 */
const trafficLightA = new trafficLightSchematic(
    document.getElementById('traffic-1'), 100, 17);
const trafficLightB = new trafficLightSchematic(
    document.getElementById('traffic-2'), 98, 21);
const trafficLightC = new trafficLightSchematic(
    document.getElementById('traffic-3'), 100, 18);
const trafficLightD = new trafficLightSchematic(
    document.getElementById('traffic-4'), 95, 23);

/*function to enable the light color of any of the element in the traffic light container.
 * @param {HTMLCollection} trafficLightElement - The three lights(circles) in the traffic light container
 * @param {HTMLCollection} colors - The three colors
 * here we just set the opacity to 1.
 */

function enableLight(trafficLightElement, color) {
    // get all elements with class name circle-<color> from <trafficLightElement>
    const light = trafficLightElement.getElementsByClassName(`circle-${color}`)[0];
    // set opacity to 1
    light.style.opacity = '1';
}

/*function to disable the light color of any of the element in the traffic light container
 * @param {HTMLCollection} trafficLightElement - The three lights(circles) in the traffic light container
 * @param {HTMLCollection} colors - The three colors
 * here we just reduced the opacity of the element to 0.1.
 */
function disableLight(trafficLightElement, color) {
    // get all elements with class name circle-<color> from <trafficLightElement>
    const light = trafficLightElement.getElementsByClassName(`circle-${color}`)[0];
    // set opacity to 0.1
    light.style.opacity = '0.1';
}
/*The displayCurrentCount function is responsible for updating the display of the counter associated with a specific traffic light element
 * @param {HTMLCollection} trafficLightElement - The three lights(circles) in the traffic light container
 * @param {HTMLCollection} count - This parameter holds the value that should be displayed as the current count on the counter.
 * @param {HTMLCollection} color - his parameter determines the color of the counter text.
 */

function displayCurrentCount(trafficElement, count, color) {
    const counter = trafficElement.getElementsByClassName('counter-bar')[0];
    counter.innerHTML = count;
    counter.style.color = color;
}

/* The displayLightAndCounter function is responsible for displaying the light and updating the counter associated with a specific traffic light element.
 * @param Time - The duration of the light or the number of seconds it should be displayed.
 * @param {HTMLCollection} element - The traffic light element to which the light and counter belong.
 * @param {HTMLCollection} text - the constant colors of the light (e.g., 'red', 'yellow', or 'green')
 * triggerLight(--duration, text) -this function
 */
function displayLightAndCounter(time, element, text) {
    //initialize a local variable called duration with the value of time.
    let duration = time;
    
/* The triggerLight function is an example of a nested function.
 * It continually triggers the light and updates the counter until the count reaches 0.
 * @param count - The duration of the light or the number of seconds it should be displayed.
 * @param {HTMLCollection} count- it represents the countdown of the number that is displayed on the counter-bar
 * @param {HTMLCollection} color- the constant colors of the light (e.g., 'red', 'yellow', or 'green')
 * enableLight(element, color);
 * disableLight(element, color);
 * displayCurrentCount(element, count, color);
 * setTimeout(() => triggerLight(count, color), 1000)
 */
    function triggerLight(count, color) {
        //This line calls the enableLight function, which increases the opacity of the element for the color thst is given in the parameter
        enableLight(element, color);
        if (count === 0) {
            // here it just says if the count is 0 then call the disable light function with its parameters assigned
            disableLight(element, color);
            return;
        }
        //This line calls the displayCurrentCount function 
        //to update the counter associated with the element using the provided count and color values.
        displayCurrentCount(element, count, color);
        count--;// this count just continually decrement the count variable by 1 for the iteration
        // This method assigns the next iteration of the triggerLight function after a 1-second delay(1000ms) using the set timeout method
        //It does this by continously calling count and color updated values. 
        setTimeout(() => triggerLight(count, color), 1000);
    }
    // Now we call the function in the displayLightAndCounter function
    triggerLight(--duration, text);    
}
// The simulateTrafficRhythm function is responsible for simulating the rhythm of the traffic light changes.
function simulateTrafficRhythm(trafficLightObj) {
    // This line immediately triggers the initial display of the traffic light according to its predefined timings.
    trafficLightObj.runDisplay();
    //This line sets up a recurring interval using setInterval. 
    //It calls the runDisplay method of the trafficLightObj object at regular intervals defined by the total duration of the traffic light sequence plus an additional 2 seconds.
    setInterval(() => trafficLightObj.runDisplay(), (trafficLightObj.totalDuration() * 1000) + 2000);
}

// Start
//This line initiates trafficLightA by showing the red signal for a duration of 6 seconds.
trafficLightA.showRed(6);
//trafficLightB would show red for a total of yellow-duration of trafficlightA multiplied by 2 plus the green-light duration plus 6
trafficLightB.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration + 6);
/*trafficLightC showing red method would now involve the durations of trafficLightA's yellow and green lights 
*as well as the duration of trafficlightB yellowsduration multiplied by 2 plus 20 plus 7. 
*/
trafficLightC.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration +
    (trafficLightB.yellowDuration * 2) + 20 + 7
);
/*trafficLightD showing red method would now involve the durations of trafficLightA's yellow and green lights plus 
*trafficLightB yellows duration multiplied by 2 plus 20 plus trafficLightC's yellow duration *2  plus 25 plus 7
as well as the duration of trafficlightB yellowsduration multiplied by 2 plus 
*/
trafficLightD.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration +
    (trafficLightB.yellowDuration * 2) + 20 + (trafficLightC.yellowDuration * 2)
    + 25 + 7
);

// Start
// Initialize trafficLightA with a red signal for 6 seconds
trafficLightA.showRed(6);

// Initialize trafficLightB with a red signal
// The duration is calculated based on the durations of trafficLightA
trafficLightB.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration + 6);

// Initialize trafficLightC with a red signal
// The duration is calculated based on the durations of trafficLightA and trafficLightB
trafficLightC.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration +
    (trafficLightB.yellowDuration * 2) + 20 + 7
);

// Initialize trafficLightD with a red signal
// The duration is calculated based on the durations of trafficLightA, trafficLightB, and trafficLightC
trafficLightD.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration +
    (trafficLightB.yellowDuration * 2) + 20 + (trafficLightC.yellowDuration * 2)
    + 25 + 7
);

// Traffic Light A show yellow
// Set a timer to change trafficLightA to a yellow signal after 5.7 seconds
setTimeout(() => trafficLightA.showYellow(), 5700);

// Traffic Light A shows Green
// Set a timer to change trafficLightA to a green signal
// The timer is based on the duration of its yellow signal and additional 5.2 seconds
setTimeout(() => trafficLightA.showGreen(), (trafficLightA.yellowDuration * 1000) + 5200);

// Set a timer to change trafficLightA back to yellow
// The timer is based on the durations of its yellow and green signals, plus an additional 5.7 seconds
setTimeout(() => trafficLightA.showYellow(),
    ((trafficLightA.yellowDuration + trafficLightA.greenDuration) * 1000) + 5700
);

// Set a timer to invoke simulateTrafficRhythm for trafficLightA
// Change trafficLightB to a yellow signal simultaneously
// The timer is based on the durations of two yellow signals from trafficLightA,
// the duration of its green signal, and additional 6.2 seconds
setTimeout(() => {
    simulateTrafficRhythm(trafficLightA);
    trafficLightB.showYellow();
}, (((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration) * 1000) + 6200
);

// Set a timer to change trafficLightB to a green signal with a duration of 20 seconds
// The timer is based on the durations of three yellow signals from trafficLightA,
// the duration of its green signal, and additional 6.45 seconds
setTimeout(() => trafficLightB.showGreen(20),
    (((trafficLightA.yellowDuration * 3) + trafficLightA.greenDuration) * 1000) + 6450
);

// Set a timer to change trafficLightB back to yellow
// The timer is based on the durations of three yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, and additional 7.2 seconds
setTimeout(() => trafficLightB.showYellow(),
    (((trafficLightA.yellowDuration * 3) + trafficLightA.greenDuration + 20) * 1000) + 7200
);

// Set a timer to change trafficLightC to a yellow signal
// Invoke simulateTrafficRhythm for trafficLightB simultaneously
// The timer is based on the durations of four yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, and additional 7.2 seconds
setTimeout(() => {
    trafficLightC.showYellow();
    simulateTrafficRhythm(trafficLightB);
}, (((trafficLightA.yellowDuration * 4) + trafficLightA.greenDuration + 20) * 1000) + 7200
);

// Set a timer to change trafficLightC to a green signal with a duration of 25 seconds
// The timer is based on the durations of five yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, and additional 7.2 seconds
setTimeout(() => trafficLightC.showGreen(25),
    (((trafficLightA.yellowDuration * 5) + trafficLightA.greenDuration + 20) * 1000) + 7200
);

// Set a timer to change trafficLightC back to yellow
// The timer is based on the durations of five yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, 25 seconds, and additional 7.2 seconds
setTimeout(() => trafficLightC.showYellow(),
    (((trafficLightA.yellowDuration * 5) + trafficLightA.greenDuration + 20 + 25) * 1000) + 7200
);

// Set a timer to change trafficLightD to a yellow signal
// Invoke simulateTrafficRhythm for trafficLightC simultaneously
// The timer is based on the durations of six yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, 25 seconds, and additional 7.2 seconds
setTimeout(() => {
    trafficLightD.showYellow();
    simulateTrafficRhythm(trafficLightC);
}, (((trafficLightA.yellowDuration * 6) + trafficLightA.greenDuration + 20 + 25) * 1000) + 7200
);

// Set a timer to change trafficLightD to a green signal with a duration of 25 seconds
// The timer is based on the durations of seven yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, 25 seconds, and additional 7.2 seconds
setTimeout(() => trafficLightD.showGreen(25),
    (((trafficLightA.yellowDuration * 7) + trafficLightA.greenDuration + 20 + 25) * 1000) + 7700
);

// Set a timer to change trafficLightD back to yellow
// The timer is based on the durations of seven yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, 25 seconds, 25 seconds, and additional 8.7 seconds
setTimeout(() => trafficLightD.showYellow(),
    (((trafficLightA.yellowDuration * 7) + trafficLightA.greenDuration + 20 + 25 + 25) * 1000) + 8700
);

// Set a timer to invoke simulateTrafficRhythm for trafficLightD
// The timer is based on the durations of eight yellow signals from trafficLightA,
// the duration of its green signal, 20 seconds, 25 seconds, 25 seconds, and additional 8.7 seconds
setTimeout(() => simulateTrafficRhythm(trafficLightD),
    (((trafficLightA.yellowDuration * 8) + trafficLightA.greenDuration + 20 + 25 + 25) * 1000) + 8700
);


