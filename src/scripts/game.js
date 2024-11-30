// DOM Elements
const $furballs = $("#furballs-count");

// Upgrades owned
let upgradesOwned = {
    mainecoons: 0,
    persians: 0,
};

// Valuables Owned
let valueablesOwned = {
    furballs: 0,
};

// Worths
const worths = { // Per second
    mainecoon: {worth: 1, type: "furballs"},
    persian: {worth: 2, type: "furballs"},
};

// Costs
const costs = { // Evaluates to bool
    get mainecoon() {
        return evalCost(valueablesOwned.furballs, 120, null);
    },
    get persian() {
        return evalCost(valueablesOwned.furballs, 400, upgradesOwned.mainecoons);
    },
};

// Events
function buyUpgrade(type) {
    switch (type) {
        case "mainecoon":
            if (costs.mainecoon === false) { // Unable to purchase
                return false;
            }
            upgradesOwned.mainecoons++;
            return true;
        case "persian":
            if (costs.persian === false) { // Unable to purchase
                return false;
            }
            upgradesOwned.persians++;
            return true;
        default:
            return false;
    }
}

// Main game loop
async function mainLoop() {
    // Main loop functionality
    if (upgradesOwned.mainecoons > 0) {
        // Increment
        valueablesOwned.furballs += (worths.mainecoon.worth * upgradesOwned.mainecoons) * effector;
        $furballs.text(precisionNumber(valueablesOwned.furballs));
    }
    if (upgradesOwned.persians > 0) {
        // Increment
        valueablesOwned.furballs += (worths.persian.worth * upgradesOwned.persians) * effector;
        $furballs.text(precisionNumber(valueablesOwned.furballs));
    }
}

// Helpers
function evalCost(valuablesOwned, valuablesRequired, upgradesOwned) {
    /**
     * Evaluates if player has enough valuables and upgrades of a specific type
     *
     * @param {number} valuablesOwned - The number of valuables the player owns.
     * @param {number} valuablesRequired - The number of valuables required for this purchase.
     * @param {number|null} upgradesOwned - The number of upgrades the player owns. If this value is null, there will be no upgrade multiplier and cost will be purely valuablesRequired.
     * 
     * @returns {boolean} - Bool if player has enough valuables & upgrades to make a specific purchase.
     */

    // Calculate upgrades required
    let upgradesRequired = upgradesOwned !== null ? valuablesOwned * 0.2 : 0; // Evaluates to 0 if upgradesOwned is null

    // Check conditions
    if (valuablesRequired > valuablesOwned) {
        return false;
    }

    if (upgradesOwned > upgradesRequired) {
        return false;
    }

    // All conditions are met to purchase item
    return true;
}
function precisionNumber(number) {
    if (number > 100) {
        return Math.floor(number);
    }
    
    return Number(number.toFixed(1));
}