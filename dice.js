const die = document.querySelector("#die");
const pips = document.querySelector("#pips");
const result = document.querySelector("#result");
const rollButton = document.querySelector("#roll-button");
const facePips = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
};

let isRolling = false;

function showFace(value) {
    pips.replaceChildren();

    for (let position = 0; position < 9; position += 1) {
        const pip = document.createElement("span");
        if (facePips[value].includes(position)) {
            pip.className = "pip";
        }
        pips.append(pip);
    }

    die.setAttribute("aria-label", `Die showing ${value}`);
}

function finishRoll() {
    const value = Math.floor(Math.random() * 6) + 1;
    showFace(value);
    result.textContent = `You rolled a ${value}!`;
    die.classList.remove("is-rolling");
    rollButton.disabled = false;
    isRolling = false;
}

die.addEventListener("animationend", (event) => {
    if (event.animationName === "tumble" && isRolling) {
        finishRoll();
    }
});

rollButton.addEventListener("click", () => {
    if (isRolling) {
        return;
    }

    isRolling = true;
    rollButton.disabled = true;
    result.textContent = "Rolling...";
    die.classList.add("is-rolling");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishRoll();
    }
});

showFace(1);
