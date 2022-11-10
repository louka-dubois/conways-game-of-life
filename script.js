const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

// global variables
const density = 40;
const gridSize = 64;
const cellSize = canvas.width / gridSize;
const cellGap = 3;
var grid = createGrid()

var isPlaying = false;
const speed = 60;

// main function
const gameLoop = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const newGrid = grid.map(arr => [...arr]);
    for (var x = 0; x < gridSize; x++) {
        for (var y = 0; y < gridSize; y++) {
            if (!isPlaying) {
                // editing mode
                // draw all cells
                if (grid[x][y] === 0) {
                    ctx.fillStyle = '#202020';
                } else {
                    ctx.fillStyle = '#14594d';
                }
                ctx.fillRect(x * cellSize + cellGap / 2, y * cellSize + cellGap / 2, cellSize - cellGap, cellSize - cellGap);
            } else {
                // draw only living cells
                if (grid[x][y] === 1) {
                    ctx.fillStyle = '#14594d';
                    ctx.fillRect(x * cellSize + cellGap / 2, y * cellSize + cellGap / 2, cellSize - cellGap, cellSize - cellGap);
                }
                // check neighbors
                var neighbors = checkNeighbors(x, y);
                // apply rules
                if (neighbors < 2 || neighbors > 3) {
                    newGrid[x][y] = 0;
                }
                else if (grid[x][y] === 0 && neighbors === 3) {
                    newGrid[x][y] = 1;
                }
            }
        }
    }
    if (isPlaying) grid = newGrid;
}, 1000 / speed);

// function that check if the current cells has neighbors
function checkNeighbors(x, y) {
    var neighbors = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            if (x + i >= 0 && x + i < gridSize && y + j >= 0 && y + j < gridSize) {
                neighbors += grid[x + i][y + j];
            }
        }
    }
    return neighbors;
}

// function that create a grid with random cells alive
function createGrid() {
    var grid = [];
    for (var x = 0; x < gridSize; x++) {
        grid[x] = [];
        for (var y = 0; y < gridSize; y++) {
            grid[x][y] = 0;
        }
    }
    // set random cells to 1
    for (var x = 0; x < gridSize; x++) {
        for (var y = 0; y < gridSize; y++) {
            if (Math.random() * 100 < density) {
                grid[x][y] = 1;
            }
        }
    }
    return grid;
}

function stopAndPlayBtn_onclick() {
    if (isPlaying) {
        isPlaying = false;
        stopAndPlayBtn.innerHTML = '> play_';
    }
    else {
        isPlaying = true;
        stopAndPlayBtn.innerHTML = '> stop_';
    }
}

function resetBtn_onclick() {
    grid = createGrid(density);
}