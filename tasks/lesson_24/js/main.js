'use strict';

// This is a single-line comment

/*
This is a multi-line comment
*/

// let firstName;
// let lastName;
// let nameFirst;
// let nameLast;

// let 1stName;
// let last-name;
// let first name;
// let const;
// let last@name;

const CURRENT_YEAR = 2026;

function runGreeting() {
    let userName = prompt('Enter your name:');
    if (userName) {
        alert('Hello, ' + userName);
    }
}

function runAgeCalculator() {
    let birthYearInput = prompt('Enter your birth year:');
    if (birthYearInput) {
        let age = CURRENT_YEAR - parseInt(birthYearInput);
        alert('Your age is: ' + age);
    }
}

function runSquarePerimeter() {
    let side = prompt('Enter the side length of the square:');
    if (side) {
        alert('Perimeter: ' + (parseFloat(side) * 4));
    }
}

function runCircleArea() {
    let radius = prompt('Enter the radius of the circle:');
    if (radius) {
        alert('Area: ' + (Math.PI * parseFloat(radius) * parseFloat(radius)).toFixed(2));
    }
}
