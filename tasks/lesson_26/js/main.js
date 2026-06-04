'use strict';

function runAgeCategory() {
    const input = prompt("Enter your age:");
    if (input === null || input === "") return;
    
    const age = parseInt(input);
    if (isNaN(age) || age < 0 || age > 120) {
        alert("Please enter a valid age.");
        return;
    }
    
    let category = "";
    if (age <= 11) {
        category = "a child";
    } else if (age <= 17) {
        category = "a teenager";
    } else if (age <= 59) {
        category = "an adult";
    } else {
        category = "a senior citizen";
    }
    
    alert(`You are ${category}.`);
}

function runSpecialCharacter() {
    const input = prompt("Enter a number from 0 to 9:");
    if (input === null || input === "") return;
    
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 9) {
        alert("Please enter a number between 0 and 9.");
        return;
    }
    
    const specialChars = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
    alert(`The special character on key ${num} is: ${specialChars[num]}`);
}

function runSumOfRange() {
    const startInput = prompt("Enter the start of the range:");
    if (startInput === null || startInput === "") return;
    
    const endInput = prompt("Enter the end of the range:");
    if (endInput === null || endInput === "") return;
    
    const start = parseInt(startInput);
    const end = parseInt(endInput);
    
    if (isNaN(start) || isNaN(end)) {
        alert("Please enter valid numbers.");
        return;
    }
    
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    
    let sum = 0;
    for (let i = min; i <= max; i++) {
        sum += i;
    }
    
    alert(`The sum of numbers from ${min} to ${max} is: ${sum}`);
}

function runGCD() {
    const aInput = prompt("Enter the first number:");
    if (aInput === null || aInput === "") return;
    
    const bInput = prompt("Enter the second number:");
    if (bInput === null || bInput === "") return;
    
    let a = Math.abs(parseInt(aInput));
    let b = Math.abs(parseInt(bInput));
    
    if (isNaN(a) || isNaN(b) || a === 0 || b === 0) {
        alert("Please enter valid non-zero numbers.");
        return;
    }
    
    const num1 = a;
    const num2 = b;
    
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    
    alert(`The greatest common divisor of ${num1} and ${num2} is: ${a}`);
}

function runDivisors() {
    const input = prompt("Enter a number:");
    if (input === null || input === "") return;
    
    const num = parseInt(input);
    if (isNaN(num) || num <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    
    const divisors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            divisors.push(i);
        }
    }
    
    alert(`Divisors of ${num}: ${divisors.join(', ')}`);
}

function runPalindromeCheck() {
    const input = prompt("Enter a five-digit number:");
    if (input === null || input === "") return;
    
    if (input.length !== 5 || isNaN(parseInt(input))) {
        alert("Please enter a valid five-digit number.");
        return;
    }
    
    const reversed = input.split('').reverse().join('');
    const isPalindrome = input === reversed;
    
    alert(`The number ${input} is ${isPalindrome ? "" : "not "}a palindrome.`);
}

function runPurchaseDiscount() {
    const input = prompt("Enter the purchase amount:");
    if (input === null || input === "") return;
    
    const amount = parseFloat(input);
    if (isNaN(amount) || amount < 0) {
        alert("Please enter a valid amount.");
        return;
    }
    
    let discount = 0;
    if (amount >= 200 && amount < 300) {
        discount = 0.03;
    } else if (amount >= 300 && amount < 500) {
        discount = 0.05;
    } else if (amount >= 500) {
        discount = 0.07;
    }
    
    const finalAmount = amount - amount * discount;
    alert(`Amount to pay: $${finalAmount.toFixed(2)} (discount applied: ${discount * 100}%)`);
}

function runNumberStatistics() {
    let positive = 0;
    let negative = 0;
    let zeros = 0;
    let even = 0;
    let odd = 0;
    
    for (let i = 1; i <= 10; i++) {
        const input = prompt(`Enter number ${i} of 10:`);
        if (input === null) return;
        
        if (input === "") {
            alert("Input cannot be empty.");
            i--;
            continue;
        }
        
        const num = parseFloat(input);
        if (isNaN(num)) {
            alert("Please enter a valid number.");
            i--;
            continue;
        }
        
        if (num > 0) {
            positive++;
        } else if (num < 0) {
            negative++;
        } else {
            zeros++;
        }
        
        if (num % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }
    
    alert(`Positive: ${positive}\nNegative: ${negative}\nZeros: ${zeros}\nEven: ${even}\nOdd: ${odd}`);
}

function runDayOfWeekLoop() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let i = 0;
    
    while (confirm(`${days[i]}. Do you want to see the next day?`)) {
        i = (i + 1) % 7;
    }
}

function runMultiplicationTable() {
    let table = "";
    for (let i = 2; i <= 9; i++) {
        let row = "";
        for (let j = 1; j <= 10; j++) {
            row += `${i} * ${j} = ${i * j}    `;
        }
        table += `${row}\n`;
    }
    alert(table);
}
