// Constants
const RED_TEXT = 'red';
const YELLOW_TEXT = 'yellow';
const GREEN_TEXT = 'green';
const trafficLightSchematic = function(element) {
    this.element = element,
    this.showRed = function(duration) {
        displayLightAndCounter(duration, this.element, RED_TEXT);
    },
    this.showYellow = function(duration) {
        displayLightAndCounter(duration, this.element, YELLOW_TEXT);
    },
    this.showGreen = function(duration) {
        displayLightAndCounter(duration, this.element, GREEN_TEXT);
    },
    this.runDisplay = function() {
        runTrafficSimulationFromObj(this);
    }
};

// Traffic Light References
const trafficLightA = new trafficLightSchematic(document.getElementById('traffic-1'));
const trafficLightB = new trafficLightSchematic(document.getElementById('traffic-2'));
const trafficLightC = new trafficLightSchematic(document.getElementById('traffic-3'));
const trafficLightD = new trafficLightSchematic(document.getElementById('traffic-4'));
                        
// Elements References
const traffic1LightElement = document.getElementById('traffic-1');
const traffic2LightElement = document.getElementById('traffic-2');
const traffic3LightElement = document.getElementById('traffic-3');
const traffic4LightElement = document.getElementById('traffic-4');

function enableLight(trafficLightElement, color) {
    const light = trafficLightElement.getElementsByClassName(`circle-${color}`)[0];
    light.style.opacity = 1;
}

function disableLight(trafficLightElement, color) {
    const light = trafficLightElement.getElementsByClassName(`circle-${color}`)[0];
    light.style.opacity = 0.1;
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

function displayLightAndCounterForCounterDuration(color, durationObj) {
    let duration = 0;
    let text = '';

    switch(color) {
        case RED_TEXT:
            duration = durationObj.red;
            text = RED_TEXT;
            break;
        case YELLOW_TEXT:
            duration = durationObj.yellow;
            text = YELLOW_TEXT;
            break;
        case GREEN_TEXT:
            duration = durationObj.green;
            text = GREEN_TEXT;
            break;
    }

    function triggerLight(count, color) {
        enableLight(durationObj.element, color);
        if (count === 0) {
            disableLight(durationObj.element, color);
            return;
        }
        displayCurrentCount(durationObj.element, count, color);
        count--;
        setTimeout(() => triggerLight(count, color), 1000);
    }

    triggerLight(--duration, text);
}

function runTrafficSimulation(trafficLightObj) {
    function showLights(runCount) {
        timeoutValue = 0;
        switch (runCount) {
            case 0:
            case 4:
                timeoutValue = trafficLightObj.red;
                displayLightAndCounterForCounterDuration(RED_TEXT, trafficLightObj);
                break;
            case 1:
            case 3:
                timeoutValue = trafficLightObj.yellow;
                displayLightAndCounterForCounterDuration(YELLOW_TEXT, trafficLightObj);
                break;
            case 2:
                timeoutValue = trafficLightObj.green;
                displayLightAndCounterForCounterDuration(GREEN_TEXT, trafficLightObj);
                break;
            default:
                runCount = timeoutValue = 0;
                break;
        }
        runCount++;
        setTimeout(() => showLights(runCount), timeoutValue * 1000);
    }

    showLights(0);
}

function runTrafficSimulationFromObj(trafficLightObj) {
    function showLights(runCount) {
        timeoutValue = 0;
        switch (runCount) {
            case 0:
            case 4:
                timeoutValue = trafficLightObj.red;
                trafficLightObj.showRed();
                break;
            case 1:
            case 3:
                timeoutValue = trafficLightObj.yellow;
                trafficLightObj.showYellow();
                break;
            case 2:
                timeoutValue = trafficLightObj.green;
                trafficLightObj.showGreen();
                break;
            default:
                runCount = timeoutValue = 0;
                break;
        }
        runCount++;
        setTimeout(() => showLights(runCount), timeoutValue * 1000);
    }

    showLights(0);
}

trafficLightA.showRed(10);