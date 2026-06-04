'use strict';

function runWaysToCreate() {
    alert(
        "Ways to create functions:\n\n" +
        "1. Declaration: function name() {}\n" +
        "2. Expression: const name = function() {}\n" +
        "3. Arrow: const name = () => {}\n" +
        "4. Constructor: const name = new Function()"
    );
}

function countArgs() {
    return arguments.length;
}

function runCountArguments() {
    alert(
        `0 arguments: ${countArgs()}\n` +
        `2 arguments: ${countArgs(10, 20)}\n` +
        `5 arguments: ${countArgs(1, 2, 3, 4, 5)}`
    );
}

function compare(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function runCompareNumbers() {
    const a = parseFloat(prompt("Enter first number:"));
    const b = parseFloat(prompt("Enter second number:"));
    
    if (isNaN(a) || isNaN(b)) {
        alert("Invalid input.");
        return;
    }
    
    alert(compare(a, b));
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function runFactorial() {
    const n = parseInt(prompt("Enter a number:"));
    if (isNaN(n) || n < 0) {
        alert("Invalid input.");
        return;
    }
    alert(factorial(n));
}

function combineDigits(a, b, c) {
    return Number(`${a}${b}${c}`);
}

function runCombineDigits() {
    const a = prompt("Enter first digit:");
    const b = prompt("Enter second digit:");
    const c = prompt("Enter third digit:");
    
    if (!a || !b || !c || a.length !== 1 || b.length !== 1 || c.length !== 1) {
        alert("Please enter single digits.");
        return;
    }
    
    alert(combineDigits(a, b, c));
}

function getArea(a, b = a) {
    return a * b;
}

function runAreaCalculator() {
    const a = parseFloat(prompt("Enter side A:"));
    if (isNaN(a) || a <= 0) {
        alert("Invalid input.");
        return;
    }
    
    const bInput = prompt("Enter side B (leave empty for square):");
    if (bInput === null) return;
    
    if (bInput.trim() === "") {
        alert(getArea(a));
    } else {
        const b = parseFloat(bInput);
        if (isNaN(b) || b <= 0) {
            alert("Invalid input.");
            return;
        }
        alert(getArea(a, b));
    }
}

function isPerfect(num) {
    if (num <= 1) return false;
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    return sum === num;
}

function runPerfectChecker() {
    const num = parseInt(prompt("Enter a number:"));
    if (isNaN(num) || num <= 0) {
        alert("Invalid input.");
        return;
    }
    alert(isPerfect(num) ? "Perfect number" : "Not perfect");
}

function runPerfectInRange() {
    const min = parseInt(prompt("Enter min:"));
    const max = parseInt(prompt("Enter max:"));
    
    if (isNaN(min) || isNaN(max)) {
        alert("Invalid input.");
        return;
    }
    
    let perfects = [];
    for (let i = Math.min(min, max); i <= Math.max(min, max); i++) {
        if (isPerfect(i)) {
            perfects.push(i);
        }
    }
    
    alert(perfects.length ? perfects.join(", ") : "No perfect numbers found");
}
