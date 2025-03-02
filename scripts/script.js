const gridArea = document.querySelector(".grid-area");
const button = document.querySelector(".generation > button");
const generation = document.querySelector(".generation");
let resetButton = null;
let colorMode = "red-only"

function cleanUpGrid() {
    while (gridArea.firstElementChild) {
        gridArea.removeChild(gridArea.firstElementChild);
    }
    if (resetButton != null) {
        generation.removeChild(resetButton);
    }
}

function addResetButton() {
    resetButton = document.createElement("button");
    resetButton.textContent = "Reset current grid";
    generation.appendChild(resetButton);

    resetButton.addEventListener('click', () => {
        for (const child of gridArea.children) {
            if (colorMode === "red-only") {
                child.classList.remove("color-it-red");
            } else if (colorMode === "random") {
                child.style.backgroundColor = "transparent";
            } else if (colorMode === "button-colours") {
                child.classList.remove("color-it-red");
                child.classList.remove("color-it-blue");
                child.classList.remove("color-it-black");
                child.classList.remove("color-it-green");
            }
        }
    });
    
}

function paintGrid(gridSize) {
    // To paint a gridSize x gridSize grid, we need to add gridSize^2 divs
    for (let i = 0; i < gridSize*gridSize; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("square");
        gridElement.style.flexBasis = `calc(90vh/${gridSize})`;
        gridElement.style.height = `calc(90vh/${gridSize})`;
        if (colorMode === 'random') {
            gridElement.style.backgroundColor = "transparent";
        }
        // Including opacity would just entail adding the background color here, and then an opacity of 0.
        // Then adding a incremental opacity on events.
        gridElement.addEventListener('mouseenter', (e) => {
            if (colorMode === 'red-only') {
                gridElement.classList.add("color-it-red");
            } else if (colorMode === 'random') {
                if (gridElement.style.backgroundColor === "" || gridElement.style.backgroundColor === "transparent") {
                    gridElement.style.backgroundColor = `#${Math.floor(Math.random() * 256).toString(16).toUpperCase()}${Math.floor(Math.random() * 256).toString(16).toUpperCase()}${Math.floor(Math.random() * 256).toString(16).toUpperCase()}`;
                }
            } else if (colorMode === 'button-colours') {
                if (e.altKey) {
                    gridElement.classList.add("color-it-blue");
                } else if (e.shiftKey) {
                    gridElement.classList.add("color-it-black");
                } else if (e.metaKey) {
                    gridElement.classList.add("color-it-green");
                } else {
                    gridElement.classList.add("color-it-red");
                }
            }
        });
        // Noticed some lag, added an event listener for mouse leave to account for those events where mouse enter didn't work
        gridElement.addEventListener('mouseleave', (e) => {
            if (colorMode === 'red-only') {
                gridElement.classList.add("color-it-red");
            } else if (colorMode === 'random') {
                if (gridElement.style.backgroundColor === "" || gridElement.style.backgroundColor === "transparent") {
                    gridElement.style.backgroundColor = `#${Math.floor(Math.random() * 256).toString(16).toUpperCase()}${Math.floor(Math.random() * 256).toString(16).toUpperCase()}${Math.floor(Math.random() * 256).toString(16).toUpperCase()}`;
                }
            } else if (colorMode === 'button-colours') {
                if (e.altKey) {
                    gridElement.classList.add("color-it-blue");
                } else if (e.shiftKey) {
                    gridElement.classList.add("color-it-black");
                } else if (e.metaKey) {
                    gridElement.classList.add("color-it-green");
                } else {
                    gridElement.classList.add("color-it-red");
                }
            }
        });

        gridArea.appendChild(gridElement);
    }
    addResetButton();
}

button.addEventListener('click', () => {
    cleanUpGrid();
    const input = document.querySelector(".generation > input");
    let gridSize = parseInt(input.value);
    if (isNaN(gridSize) || gridSize > 100) {
        alert("Please enter a valid number");
        return;
    }
    console.log(`Number entered: ${parseInt(gridSize)}`);
    input.value = ``;
    const modeInput = document.querySelectorAll(".mode input");
    modeInput.forEach((inp) => {
        if (inp.checked) {
            console.log(`${inp.value} was checked.`);
            colorMode = inp.value;
            return;
        }
    });
    paintGrid(gridSize);
});