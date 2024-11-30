const $body = $("body");
const $shopTrigger = $("#shop-trigger");
const $shopCloseTrigger = $("#shop-close-trigger");
const $shopUI = $("#shop-ui");
const $shopItemHover = $(".shop-item-image");
const $openAudio = $("#book-open");
const $closeAudio = $("#book-close-2");
const $itemHoverAudio = $("#menu-item-hover");

$shopTrigger.on("click", () => {
    $openAudio[0].play();

    $("html").css("pointer-events", "none");

    $shopUI.css({
        opacity: 1,
        transition: "opacity 1s ease",
        zIndex: 9999,
        "pointer-events": "auto"
    });
});

$shopCloseTrigger.on("click", () => {
    $closeAudio[0].play();

    $("html").css("pointer-events", "auto");

    $shopUI.css({
        opacity: 0,
        transition: "opacity 1s ease",
        zIndex: -99,
        "pointer-events": "none"
    });
});

$shopItemHover.on("mouseover", function () {
    // Audio controls
    $itemHoverAudio[0].currentTime = 0;
    $itemHoverAudio[0].play();

    // Get ID of item
    let ID = $(this).closest(".shop-item").attr("id");

    // Update details
    let upgradesRequired;
    switch (ID) {
        case "mainecoon":
            $("#item-worth").text(`+ ${worths.mainecoon.worth} furballs / s`);
            $("#valuable-cost").text(`- ${costs.mainecoonCost} furballs`);
            $("#upgrade-cost").text(`0 upgrades required`);
            break;
        case "persian":
            upgradesRequired = calcUpgradesRequired(upgradesOwned.mainecoons, valuablesOwned.furballs, 0.2);
            $("#item-worth").text(`+ ${worths.persian.worth} furballs / s`);
            $("#valuable-cost").text(`- ${costs.persianCost} furballs`);
            $("#upgrade-cost").text(`- ${upgradesRequired} Maine Coons`);
            break;
        default:
            break;
    }

    // Visibility of costs
    $("#shop-item-details").css("opacity", 1);
});
$shopItemHover.on("mouseout", function () {
    // Reset the opacity
    $("#shop-item-details").css("opacity", 0);
});