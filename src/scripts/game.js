// DOM Elements
const $furballs = $("#furballs-count");
const $shopPurchaseAudio = $("#shop-purchase")[0];
$shopPurchaseAudio.volume = 0.5;

// Upgrades owned
let upgradesOwned = {
    mainecoons: 0,
    persians: 0,
};

// Valuables Owned
let valuablesOwned = {
    furballs: 0,
};

// Worths
const worths = { // Per second
    mainecoon: {worth: 1, type: "furballs"},
    persian: {worth: 2, type: "furballs"},
};

// Costs
const costs = {
    // Costs [Number of base valuables the upgrade costs]
    mainecoonCost: 120,
    persianCost: 400,

    // Eligibility
    get mainecoon() { // Evaluates to bool
        return evalCost(valuablesOwned.furballs, this.mainecoonCost, null);
    },
    get persian() { // Evaluates to bool
        return evalCost(valuablesOwned.furballs, this.persianCost, upgradesOwned.mainecoons);
    },
};

// Events
function buyUpgrade(type) {
    switch (type) {
        case "mainecoon":
            if (costs.mainecoon === false) { // Unable to purchase
                return false;
            }

            // Increment upgrade, subtract valuable
            upgradesOwned.mainecoons++;
            valuablesOwned.furballs -= costs.mainecoonCost;
            $shopPurchaseAudio.play();
        case "persian":
            if (costs.persian === false) { // Unable to purchase
                return false;
            }

            // Increment upgrade, subtract valuable
            upgradesOwned.persians++;
            valuablesOwned.furballs -= costs.persianCost;
            $shopPurchaseAudio.play();
        default:
            break;
    }

    // Do upgrade display updates
    updateUpgradeCosts();

    // Return
    return true;
}

// Main game loop
async function mainLoop() {
    // Main loop functionality
    if (valuablesOwned.furballs > 0) {
        $furballs.text(precisionNumber(valuablesOwned.furballs));
    }
    if (upgradesOwned.mainecoons > 0) {
        // Increment
        valuablesOwned.furballs += (worths.mainecoon.worth * upgradesOwned.mainecoons) * effector;
        $furballs.text(precisionNumber(valuablesOwned.furballs));
    }
    if (upgradesOwned.persians > 0) {
        // Increment
        valuablesOwned.furballs += (worths.persian.worth * upgradesOwned.persians) * effector;
        $furballs.text(precisionNumber(valuablesOwned.furballs));
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
    let upgradesRequired = calcUpgradesRequired(upgradesOwned, valuablesOwned, 0.2) // Evaluates to 0 if upgradesOwned is null

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
function calcUpgradesRequired(upgradesOwned, valuablesOwned, multiplier) {
    let upgradesRequired = upgradesOwned !== null ? valuablesOwned * multiplier : 0; // Evaluates to 0 if upgradesOwned is null

    if (upgradesOwned !== null && upgradesRequired < 1) {
        upgradesRequired = 1;
    }

    return upgradesRequired;
}
function precisionNumber(number) {
    if (number > 100) {
        return Math.floor(number);
    }
    
    return Number(number.toFixed(1));
}
function updateUpgradeCosts() {
    // Elements
    $persians = $("#up-cost-persian");

    // Updates
    $persians.text(`- ${calcUpgradesRequired(upgradesOwned.mainecoons, valuablesOwned.furballs, 0.2)} Maine Coons`);
}