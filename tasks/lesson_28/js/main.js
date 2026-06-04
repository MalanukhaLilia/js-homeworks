'use strict';

const car = {
    manufacturer: "Toyota",
    model: "Camry",
    year: 2022,
    averageSpeed: 90,
    fuelCapacity: 60,
    fuelConsumption: 7.5,
    drivers: ["Jack Smith", "Sarah Smith"],

    displayInfo() {
        return `Manufacturer: ${this.manufacturer}
Model: ${this.model}
Year: ${this.year}
Average speed: ${this.averageSpeed} km/h
Fuel capacity: ${this.fuelCapacity} L
Fuel consumption: ${this.fuelConsumption} L/100km
Drivers: ${this.drivers.join(', ')}`;
    },

    addDriver(name) {
        if (!name || !name.trim()) return false;
        this.drivers.push(name.trim());
        return true;
    },

    hasDriver(name) {
        if (!name) return false;
        return this.drivers.some(d => d.toLowerCase() === name.trim().toLowerCase());
    },

    calculateTrip(distance) {
        const pureTime = distance / this.averageSpeed;
        let breaks = Math.floor(pureTime / 4);
        if (pureTime > 0 && pureTime % 4 === 0) {
            breaks--;
        }
        return {
            pureTime,
            breaks,
            totalTime: pureTime + breaks,
            fuel: (distance / 100) * this.fuelConsumption
        };
    }
};

const timeObj = {
    hours: 20,
    minutes: 59,
    seconds: 45
};

function formatTime(t) {
    const hh = String(t.hours).padStart(2, '0');
    const mm = String(t.minutes).padStart(2, '0');
    const ss = String(t.seconds).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

function addSeconds(t, secs) {
    t.seconds += secs;

    t.minutes += Math.floor(t.seconds / 60);
    t.seconds = (t.seconds % 60 + 60) % 60;

    t.hours += Math.floor(t.minutes / 60);
    t.minutes = (t.minutes % 60 + 60) % 60;

    t.hours = (t.hours % 24 + 24) % 24;
}

function addMinutes(t, mins) {
    addSeconds(t, mins * 60);
}

function addHours(t, hrs) {
    addSeconds(t, hrs * 3600);
}

function runShowCarInfo() {
    alert(car.displayInfo());
}

function runAddDriver() {
    const name = prompt("Enter driver's name to add:");
    if (!name) return;

    if (car.addDriver(name)) {
        alert(`Driver "${name.trim()}" successfully added.`);
    } else {
        alert("Invalid driver name.");
    }
}

function runCheckDriver() {
    const name = prompt("Enter driver's name to check:");
    if (!name) return;

    if (car.hasDriver(name)) {
        alert(`Driver "${name.trim()}" is in the drivers list.`);
    } else {
        alert(`Driver "${name.trim()}" is not in the drivers list.`);
    }
}

function runCalculateTravel() {
    const distance = parseFloat(prompt("Enter distance in km:"));
    if (isNaN(distance) || distance <= 0) {
        alert("Invalid distance.");
        return;
    }

    const result = car.calculateTrip(distance);
    alert(`For a distance of ${distance} km:
Pure driving time: ${result.pureTime.toFixed(2)} hours
Number of breaks (1h each): ${result.breaks}
Total travel time: ${result.totalTime.toFixed(2)} hours
Fuel required: ${result.fuel.toFixed(2)} liters`);
}

function runDisplayTime() {
    alert(`Current time: ${formatTime(timeObj)}`);
}

function runAddSeconds() {
    const secsInput = prompt("Enter seconds to add:");
    if (!secsInput) return;
    const secs = parseInt(secsInput);
    if (isNaN(secs)) {
        alert("Invalid input.");
        return;
    }
    addSeconds(timeObj, secs);
    alert(`Updated time: ${formatTime(timeObj)}`);
}

function runAddMinutes() {
    const minsInput = prompt("Enter minutes to add:");
    if (!minsInput) return;
    const mins = parseInt(minsInput);
    if (isNaN(mins)) {
        alert("Invalid input.");
        return;
    }
    addMinutes(timeObj, mins);
    alert(`Updated time: ${formatTime(timeObj)}`);
}

function runAddHours() {
    const hrsInput = prompt("Enter hours to add:");
    if (!hrsInput) return;
    const hrs = parseInt(hrsInput);
    if (isNaN(hrs)) {
        alert("Invalid input.");
        return;
    }
    addHours(timeObj, hrs);
    alert(`Updated time: ${formatTime(timeObj)}`);
}
