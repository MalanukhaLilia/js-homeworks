'use strict';

let shoppingList = [
    { name: "Milk", quantity: 2, bought: false, price: 1.5, total: 3.0 },
    { name: "Bread", quantity: 1, bought: true, price: 1.20, total: 1.20 },
    { name: "Apples", quantity: 5, bought: false, price: 0.80, total: 4.0 },
    { name: "Cheese", quantity: 1, bought: true, price: 5.50, total: 5.50 },
    { name: "Chocolate", quantity: 3, bought: false, price: 2.20, total: 6.60 }
];

function formatProduct(product) {
    const status = product.bought ? "Bought" : "Not bought";
    return `${product.name} (${status}) - Qty: ${product.quantity}, Price: $${product.price.toFixed(2)}, Total: $${product.total.toFixed(2)}`;
}

function getSortedList() {
    return [...shoppingList].sort((a, b) => {
        if (a.bought === b.bought) return 0;
        return a.bought ? 1 : -1;
    });
}

function purchaseProduct(name) {
    if (!name || !name.trim()) return false;
    const targetName = name.trim().toLowerCase();
    
    const product = shoppingList.find(item => item.name.toLowerCase() === targetName);
    if (product) {
        product.bought = true;
        return true;
    }
    return false;
}

function deleteProduct(name) {
    if (!name || !name.trim()) return false;
    const targetName = name.trim().toLowerCase();
    
    const exists = shoppingList.some(item => item.name.toLowerCase() === targetName);
    if (exists) {
        shoppingList = shoppingList.filter(item => item.name.toLowerCase() !== targetName);
        return true;
    }
    return false;
}

function addProduct(name, quantity, price) {
    if (!name || !name.trim() || isNaN(quantity) || quantity <= 0 || isNaN(price) || price < 0) {
        return false;
    }
    
    const productName = name.trim();
    const existing = shoppingList.find(item => item.name.toLowerCase() === productName.toLowerCase());
    
    if (existing) {
        existing.quantity += quantity;
        existing.total = existing.quantity * existing.price;
    } else {
        shoppingList.push({
            name: productName,
            quantity: quantity,
            bought: false,
            price: price,
            total: quantity * price
        });
    }
    return true;
}

function calculateTotalSum() {
    let sum = 0;
    for (const item of shoppingList) {
        sum += item.total;
    }
    return sum;
}

function calculateFilteredSum(boughtStatus) {
    let sum = 0;
    for (const item of shoppingList) {
        if (item.bought === boughtStatus) {
            sum += item.total;
        }
    }
    return sum;
}

function runDisplayList() {
    if (shoppingList.length === 0) {
        alert("Shopping list is empty!");
        return;
    }
    const sorted = getSortedList();
    const formatted = sorted.map(formatProduct).join("\n");
    alert(`Shopping list:\n${formatted}`);
}

function runPurchaseProduct() {
    const name = prompt("What product did you buy?");
    if (!name) return;
    
    if (purchaseProduct(name)) {
        alert(`"${name.trim()}" marked as bought.`);
    } else {
        alert(`Could not find "${name.trim()}" in the list.`);
    }
}

function runDeleteProduct() {
    const name = prompt("Which product do you want to delete?");
    if (!name) return;

    if (deleteProduct(name)) {
        alert(`Removed "${name.trim()}" from the list.`);
    } else {
        alert(`"${name.trim()}" is not in the list.`);
    }
}

function runAddProduct() {
    const name = prompt("Product name:");
    if (!name) return;

    const qtyInput = prompt("How many?", "1");
    if (!qtyInput) return;
    const quantity = parseInt(qtyInput);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Invalid quantity.");
        return;
    }

    const priceInput = prompt("Price per unit:");
    if (!priceInput) return;
    const price = parseFloat(priceInput);
    if (isNaN(price) || price < 0) {
        alert("Invalid price.");
        return;
    }

    if (addProduct(name, quantity, price)) {
        alert("Added to list!");
    } else {
        alert("Something went wrong. Check your inputs.");
    }
}

function runCalculateTotalSum() {
    const total = calculateTotalSum();
    alert(`Total price: $${total.toFixed(2)}`);
}

function runCalculateFilteredSum() {
    const choice = prompt("Type '1' for unpurchased or '2' for purchased:");
    if (!choice) return;

    const selected = choice.trim();
    if (selected === "1") {
        const sum = calculateFilteredSum(false);
        alert(`Unpurchased total: $${sum.toFixed(2)}`);
    } else if (selected === "2") {
        const sum = calculateFilteredSum(true);
        alert(`Purchased total: $${sum.toFixed(2)}`);
    } else {
        alert("Invalid choice.");
    }
}
