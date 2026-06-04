'use strict';

function runPrecisionMath() {
    const std = 0.1 + 0.2;
    const corr = (0.1 * 10 + 0.2 * 10) / 10;
    
    alert(`Precision Math:\n\nStandard addition (0.1 + 0.2): ${std}\nCorrected addition: ${corr}`);
}

function runStringNumberAddition() {
    const a = "1";
    const b = 2;
    
    const std = a + b;
    const corr = Number(a) + b;
    
    alert(`String & Number Addition:\n\nlet a = "${a}" (String);\nlet b = ${b} (Number);\n\nStandard JS (a + b): "${std}"\nCorrected addition (Number(a) + b): ${corr}`);
}

function runFlashDriveCapacity() {
    const gbInput = prompt("Enter flash drive capacity in GB:");
    if (gbInput === null || gbInput === "") return;
    
    const capacityGb = parseFloat(gbInput);
    if (isNaN(capacityGb) || capacityGb <= 0) {
        alert("Please enter a valid positive number for GB capacity.");
        return;
    }
    
    const capacityMb = capacityGb * 1024;
    const filesCount = Math.floor(capacityMb / 820);
    
    alert(`A ${capacityGb} GB flash drive can hold ${filesCount} files of 820 MB.`);
}

function runChocolateCalculator() {
    const moneyInput = prompt("Enter amount of money in your wallet ($):");
    if (moneyInput === null || moneyInput === "") return;
    
    const priceInput = prompt("Enter the price of a single chocolate bar ($):");
    if (priceInput === null || priceInput === "") return;
    
    const money = parseFloat(moneyInput);
    const price = parseFloat(priceInput);
    
    if (isNaN(money) || isNaN(price) || money < 0 || price <= 0) {
        alert("Please enter valid positive numbers.");
        return;
    }
    
    const count = Math.floor(money / price);
    const change = (money - count * price).toFixed(2);
    
    alert(`With $${money} and chocolate bars at $${price} each:\n\nYou can buy: ${count} chocolate bars\nChange remaining: $${change}`);
}

function runReverseNumber() {
    const numInput = prompt("Enter a three-digit number:");
    if (numInput === null || numInput === "") return;
    
    const num = parseInt(numInput);
    if (isNaN(num) || num < 100 || num > 999) {
        alert("Please enter a valid three-digit number (100 - 999).");
        return;
    }
    
    const units = num % 10;
    const tens = Math.floor((num / 10) % 10);
    const hundreds = Math.floor(num / 100);
    const reversed = `${units}${tens}${hundreds}`;
    
    alert(`Original number: ${num}\nReversed digits: ${reversed}`);
}

function runBankDepositInterest() {
    const amountInput = prompt("Enter bank deposit amount ($):");
    if (amountInput === null || amountInput === "") return;
    
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount < 0) {
        alert("Please enter a valid positive deposit amount.");
        return;
    }
    
    const annualRate = 0.05;
    const months = 2;
    const interest = (amount * annualRate * (months / 12)).toFixed(2);
    
    alert(`Deposit: $${amount}\nPeriod: 2 months\nAnnual Rate: 5%\n\nInterest earned: $${interest}`);
}
