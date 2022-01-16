
let grid;
let gridSize = 256;
let tileSize;
let frequency = 50;

function setup() {
	createCanvas(windowWidth, windowHeight);
	grid = make2DArray(gridSize);
	tileSize = 512/gridSize;

	for (let i = 0; i < Math.floor(frequency*(gridSize**2)/100); i++) {
		var posX = Math.floor(Math.random() * gridSize);
		var posY = Math.floor(Math.random() * gridSize);

		while (grid[posX][posY] === 1) {
			posX = Math.floor(Math.random() * gridSize);
			posY = Math.floor(Math.random() * gridSize);
		}
		grid[posX][posY] = 1;
	}
}

function draw() {
	background(40, 40, 50);
	frameRate(30);
	noStroke();

	var next = make2DArray(gridSize);

	push();
	translate(width/2 - (gridSize*tileSize)/2, height/2 - (gridSize*tileSize)/2);
	for (let x = 0; x < gridSize; x++) {
		for (let y = 0; y < gridSize; y++) {
			const neighbors = countNeighbors(x, y);

			if (grid[x][y] === 0) {
				if (neighbors === 3) {
					next[x][y] = 1;
				} else {
					next[x][y] = 0;
				}
			} else {
				if (neighbors == 2 || neighbors == 3) {
					next[x][y] = 1;
				} else {
					next[x][y] = 0;
				}

				fill(0, 100);
				rect(x*tileSize, y*tileSize, tileSize);
			}
		}
	}
	pop();

	grid = next;

	fill(200, 50, 50);
	text(Math.floor(frameRate()) + " fps", 10, 20);
	text(frequency + "%", 10, 40);
}

function make2DArray(len) {
	var array = [];
	for (let x = 0; x < len; x++) {
		array[x] = [];
		for (let y = 0; y < len; y++) {
			array[x][y] = 0;
		}
	}
	return array;
}

function countNeighbors(x, y) {
	var neighbors = 0;
	for (let i = -1; i < 2; i++) {
		for (let j= -1; j < 2; j++) {
			if (x+i >= 0 && x+i < gridSize && y+j >= 0 && y+j < gridSize) {
				neighbors += grid[x+i][y+j];
			}
		}
	}
	return neighbors - grid[x][y];
}