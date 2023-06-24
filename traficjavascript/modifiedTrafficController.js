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
    this.showRed = function(duration = undefined) {
        displayLightAndCounter(duration ?? this.redDuration, this.element, RED_TEXT);
    };
    this.showYellow = function(duration = undefined) {
        displayLightAndCounter(duration ?? this.yellowDuration, this.element, YELLOW_TEXT);
    };
    this.showGreen = function(duration = undefined) {
        displayLightAndCounter(duration ?? this.greenDuration, this.element, GREEN_TEXT);
    };
    this.runDisplay = function(redDuration, yellowDuration, greenDuration) {
        this.showRed(redDuration);
        setTimeout(() => this.showYellow(yellowDuration), (redDuration * 1000) + 500);
        setTimeout(() => this.showGreen(greenDuration), ((redDuration + yellowDuration) * 1000) + 500);
        setTimeout(() => this.showYellow(yellowDuration), ((redDuration + yellowDuration + greenDuration) * 1000) + 500);
    };
    this.runDisplay = function() {
        this.showRed(this.redDuration);
        setTimeout(() => this.showYellow(this.yellowDuration), (this.redDuration * 1000) + 500);
        setTimeout(() => this.showGreen(this.greenDuration), ((this.redDuration + this.yellowDuration) * 1000) + 500);
        setTimeout(() => this.showYellow(this.yellowDuration),
            ((this.redDuration + this.yellowDuration + this.greenDuration) * 1000) + 500);
    };
    this.totalDuration = function () {
        return this.redDuration + (this.yellowDuration * 2) + this.greenDuration;
    };
};

// Traffic Light References
const trafficLightA = new trafficLightSchematic(
    document.getElementById('traffic-1'), 100, 17);
const trafficLightB = new trafficLightSchematic(
    document.getElementById('traffic-2'), 98, 21);
const trafficLightC = new trafficLightSchematic(
    document.getElementById('traffic-3'), 100, 18);
const trafficLightD = new trafficLightSchematic(
    document.getElementById('traffic-4'), 95, 23);

function enableLight(trafficLightElement, color) {
    const light = trafficLightElement.getElementsByClassName(`circle-${color}`)[0];
    light.style.opacity = '1';
}

function disableLight(trafficLightElement, color) {
    const light = trafficLightElement.getElementsByClassName(`circle-${color}`)[0];
    light.style.opacity = '0.1';
}

function displayCurrentCount(trafficElement, count, color) {
    const counter = trafficElement.getElementsByClassName('counter-bar')[0];
    counter.innerHTML = count;
    counter.style.color = color;
}

function displayLightAndCounter(time, element, text) {
    let duration = time;

    function triggerLight(count, color) {
        enableLight(element, color);
        if (count === 0) {
            disableLight(element, color);
            return;
        }
        displayCurrentCount(element, count, color);
        count--;
        setTimeout(() => triggerLight(count, color), 1000);
    }

    triggerLight(--duration, text);    
}

function simulateTrafficRhythm(trafficLightObj) {
    trafficLightObj.runDisplay();
    setInterval(() => trafficLightObj.runDisplay(), (trafficLightObj.totalDuration() * 1000) + 2000);
}

// Start
trafficLightA.showRed(6);
trafficLightB.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration + 6);
trafficLightC.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration +
    (trafficLightB.yellowDuration * 2) + 20 + 7
);
trafficLightD.showRed((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration +
    (trafficLightB.yellowDuration * 2) + 20 + (trafficLightC.yellowDuration * 2)
    + 25 + 7
);

// Traffic Light A show yellow
setTimeout(() => trafficLightA.showYellow(), 5700);

// Traffic Light A shows Green
setTimeout(() => trafficLightA.showGreen(), (trafficLightA.yellowDuration * 1000) + 5200);

setTimeout(() => trafficLightA.showYellow(),
    ((trafficLightA.yellowDuration + trafficLightA.greenDuration) * 1000) + 5700);

setTimeout(() => {
        simulateTrafficRhythm(trafficLightA);
        trafficLightB.showYellow();
    },
    (((trafficLightA.yellowDuration * 2) + trafficLightA.greenDuration) * 1000) + 6200);

setTimeout(() => trafficLightB.showGreen(20),
    (((trafficLightA.yellowDuration * 3) + trafficLightA.greenDuration) * 1000) + 6450);

setTimeout(() => trafficLightB.showYellow(),
    (((trafficLightA.yellowDuration * 3) + trafficLightA.greenDuration + 20) * 1000) + 7200);

setTimeout(() => {
        trafficLightC.showYellow();
        simulateTrafficRhythm(trafficLightB);
    },
    (((trafficLightA.yellowDuration * 4) + trafficLightA.greenDuration + 20) * 1000) + 7200);

setTimeout(() => trafficLightC.showGreen(25),
    (((trafficLightA.yellowDuration * 5) + trafficLightA.greenDuration + 20) * 1000) + 7200);

setTimeout(() => trafficLightC.showYellow(),
    (((trafficLightA.yellowDuration * 5) + trafficLightA.greenDuration + 20 + 25) * 1000) + 7200);

setTimeout(() => {
        trafficLightD.showYellow();
        simulateTrafficRhythm(trafficLightC);
    },
    (((trafficLightA.yellowDuration * 6) + trafficLightA.greenDuration + 20 + 25) * 1000) + 7200);


setTimeout(() => trafficLightD.showGreen(25),
    (((trafficLightA.yellowDuration * 7) + trafficLightA.greenDuration + 20 + 25) * 1000) + 7700);

setTimeout(() => trafficLightD.showYellow(),
    (((trafficLightA.yellowDuration * 7) + trafficLightA.greenDuration + 20 + 25 + 25) * 1000) + 8700);

setTimeout(() => simulateTrafficRhythm(trafficLightD),
    (((trafficLightA.yellowDuration * 8) + trafficLightA.greenDuration + 20 + 25 + 25) * 1000) + 8700);
