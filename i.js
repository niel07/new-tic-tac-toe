const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let move,score

let newValue = 1;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue !==0 && gridValue % 2 === 0) {
            content = '<span class="cross">0</span>';

        }
        else if (gridValue % 2 !== 0) {
            content = '<span class="cross">X</span>';

        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function startNewGame(){
    score = {
			"X": 0,
			"O": 0
		};
		moves = 0;
		turn = "X";
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    newValue = newValue + 1;
    isWin.call(this,rowIdx,colIdx)
}

function isWin(rowId,colId){
    let userValue = grid[rowId][colId]
     let result1 = traverseRow(rowId);
    let result2 = traverseCol(colId)
    if(result1 === 'yes' || result2 === 'yes'){
        console.log(this)
        alert('win')
    }
}

function traverseCol(colId){
    let currentValue = 0
    console.log(grid)
    for(let i=0;i<3;i++){
       if(i == 0 ){
            console.log(grid[colId][i])
            currentValue = grid[colId][i] % 2
        }else{
            if(grid[colId][i] === 0)
                return 'no';
            console.log(grid[colId][i])
            if((grid[colId][i] % 2) !== currentValue){
                return 'no'
            }
        }
        console.log(grid[colId][i])
    }
    return 'yes'
}

function traverseRow(rowId){
    let currentValue = 0
    console.log(grid)
    for(let i=0;i<3;i++){
       if(i == 0 ){
            console.log(grid[i][rowId])
            currentValue = grid[i][rowId] % 2
        }else{
            if(grid[i][rowId] === 0)
                return 'no';
            console.log(grid[i][rowId])
            if((grid[i][rowId] % 2) !== currentValue){
                return 'no'
            }
        }
        console.log(grid[i][rowId])
    }
    return 'yes'
}
/*
function traversediag() {
   if currentValue = 0
     console.log(grid)
       for (var d = 0; d < sideLength; d++) {
            if (topLeftPiece === board.getEmptyPlaceholder()) {
                break;
            }

            var currentPiece = board.getSquare(d, d);

            if (currentPiece !== topLeftPiece) {
                break;

            } else if (d === sideLength - 1) {
                return currentPiece;
            }

        }

        var topRightPiece = board.getSquare(sideLength - 1, 0);

        for (var d = 0; d < sideLength; d++) {
            if (topRightPiece === board.getEmptyPlaceholder()) {
                break;
            }

            var currentPiece = board.getSquare(sideLength - d - 1, d);

            if (currentPiece !== topRightPiece) {
                break;

            } else if (d === sideLength - 1) {
                return currentPiece;
            }

        }

        return false;
    }
} */

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
startNewGame();
renderMainGrid();
addClickHandlers();
