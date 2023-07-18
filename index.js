
const getRandomRGB = () => {
    const randomValue = () => Math.ceil(Math.random() * 1000) % 255;
    return [ randomValue(), randomValue(), randomValue() ];
}
const generateCSS = (containerSize, childSize, colCnt, childrenCnt) => {
    const styleEl = document.createElement("style");
    
    const childSquareCSS = new Array(childrenCnt).fill(0).map((one, index) => `
        .child-item-${index} {
            width: ${childSize}px;
            height: ${childSize}px;
            background: rgb(${ getRandomRGB().join(", ") });
        }
        
        .child-item-${index}:hover {
            background: rgb(${ getRandomRGB().join(", ") });
        }
    `);
    styleEl.textContent = `
        #mainSquare {
            width: ${containerSize}px;
            height: ${containerSize}px;
            border: 1px solid black;
            display: grid;
            grid-template-columns: repeat(${colCnt}, ${childSize}px);
            grid-template-rows: repeat(${colCnt}, ${childSize}px);
        }
        ${childSquareCSS.join("")}
    `;

    return styleEl;
}

const hoverChildSquareEvt = e => {
    const timerId = setTimeout(() => {
        e.target.style.opacity = 0;
    }, 2000);

    e.target.setAttribute("timerId", timerId);
}
const hoverOutChildSquareEvt = e => {
    const timerId = e.target.getAttribute("timerId");
    clearTimeout(timerId);
}

const drawContainer = (containerSize, childSize, numberOfChildren) => {
    const containerEl = document.getElementById("mainSquare");
    const messageEl = document.getElementById("messageContainer");

    const rowCnt = colCnt = Math.floor(containerSize / childSize);
    if(!rowCnt) {
        containerEl.innerHTML = `
            <div>
                <span>Child Square is bigger than container Square. Can't put any child square here!</span>
            </div>
        `;
        return;
    }
    const fitableChildrenCnt = rowCnt * colCnt > numberOfChildren? numberOfChildren: rowCnt * colCnt;
    
    const squareCSS = generateCSS(containerSize, childSize, colCnt, fitableChildrenCnt);
    document.head.append(squareCSS);

    const childSquares = new Array(fitableChildrenCnt)
        .fill(0)
        .map((one, index) => `
            <div
                class="child-item-${index}"
                onmouseover="hoverChildSquareEvt(event)"
                onmouseout="hoverOutChildSquareEvt(event)"
            >
            </div>
    `);
    containerEl.innerHTML = childSquares.join("");
    messageEl.innerHTML = `<span>Rendered ${fitableChildrenCnt} child squares of ${numberOfChildren} child squares.</span>`;
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("*******")
    drawContainer(310, 50, 17);
});
