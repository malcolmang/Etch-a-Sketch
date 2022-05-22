const container = document.querySelector('#container');
let shadingbool = false;
let trailbool = true;
 
function makeGrid(rows,cols){
    container.style.setProperty('height', container.clientWidth + 'px');
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for(c = 0; c < (rows*cols); c++){
        let cell = document.createElement('div');
        cell.style.opacity = '0';
        cell.style.backgroundColor = '#b3b3b3';
        container.appendChild(cell).className = 'grid-item';
    };
    const allGridElements = document.querySelectorAll('.grid-item');
    allGridElements.forEach(item => item.addEventListener('mouseover', changeColor));
};

makeGrid(16,16)

const redrawbutton = document.querySelector('#redraw');
redrawbutton.addEventListener('click', gridRedraw);
document.querySelector('#reset').addEventListener('click', clearGrid);

document.querySelector('#shading').addEventListener('click', () => {
    shadingbool = !shadingbool;
    if (shadingbool){
        document.querySelector('#shading').innerHTML = 'Shading: On';
    } else {
        document.querySelector('#shading').innerHTML = 'Shading: Off';
    }}
);

document.querySelector('#trail').addEventListener('click', () => {
    trailbool = !trailbool;
    if (trailbool){
        document.querySelector('#trail').innerHTML = 'Trail: On';
    } else {
        document.querySelector('#trail').innerHTML = 'Trail: Off';
    }
});

function clearGrid(){
    const allGridElements = document.querySelectorAll('.grid-item');
    allGridElements.forEach(item => item.style.opacity = '0');
}

function gridRedraw(){
    while (true){
    bigstring = prompt('How many rows and columns separated by space? (e.g. 20 20)');
    stringarr = bigstring.split(' ');
    rows = stringarr[0];
    cols = stringarr[1];
    if(rows > 100 || cols > 100){
        alert('Please enter two numbers between 1 and 100, separated by a space. Any larger lags the browser.');
    }
    else if(rows < 1 || cols < 1){
        alert('Please enter two numbers between 1 and 100, separated by a space.');
    }
    else if(isNaN(rows) || isNaN(cols) || stringarr.length != 2){
        alert('Please enter two numbers between 1 and 100, separated by a space.');
    }
    else{
        break;
    }
    }
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.remove());
    makeGrid(rows,cols);
}

function darkenColor(thisitem){
    let currentop = parseFloat(thisitem.style.opacity);
    newop = currentop - 0.01;
    if (newop < 0) newop = '0';
    thisitem.style.opacity = String(newop);
    //thisitem.innerText = newop;
}

function changeColor(){
    if (shadingbool){
        this.style.opacity = String(parseFloat(this.style.opacity) + 0.05);
        if(trailbool){
            const allGridElements = document.querySelectorAll('.grid-item');
            allGridElements.forEach(darkenColor);
        }
    } else {
        const allGridElements = document.querySelectorAll('.grid-item');
        if(trailbool){
            allGridElements.forEach(darkenColor);
        }
        this.style.opacity = '1';
    }
}

