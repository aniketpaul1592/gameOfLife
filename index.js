/** Guidelines
 * A cell is dead if value 0
 * A cell is alive if value 1

 * Rules of Game of Life
1. Any live cell with fewer than two live neighbours dies, as if caused by under-population​.
2. Any live cell with two or three live neighbours lives on to the next​ ​generation​.
3. Any live cell with more than three live neighbours dies, as if by overcrowding​.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
 */

// function to check if alive of dead
function cellStatus(cell) {
    if (cell === 1) {
        return true;
    } else {
        return false;
    }
}

// An array to keep track of visited indices
var checkNeighbourComplete = [];

// Memoization function
function memoize(fn) {
    const cache = {};
    return function (...args) {
        if (cache[args]) {
            return cache[args];
        }

        const result = fn.apply(this, args);
        cache[args] = result;

        return result;
    };
}

// Mother Function -- checks neighbours and then calls rulesOfGameOfLife to decide the fate of a cell
function checkNeighbours(a, startPointIndexi, startPointIndexj) {
    var countAlive = 0;
    var countDead = 0;
    var i = startPointIndexi || 0;
    var j = startPointIndexj || 0;
    var visitedIndices = [];
    //Checkpoint 1 --> counts the Alive cells
    for (var k = i - 1; k <= i + 1; k++) {
        for (var l = j - 1; l <= j + 1; l++) {
            if (a && a[k] && a[k][l] && cellStatus(a[k][l]) && (k != i && l != j)) {
                countAlive++;
            }
            // To Store visited indices
            if (a && a[k] && a[k][l] && (k != i && l != j)) {
                visitedIndices.push([k,l]);
            }
        }
    }

    var changedArray = rulesOfGameOfLife(a, i, j, countAlive);

    //Breakout condition if last element
    if(i==inputArrayRows && j==inputArrayColumns){
        return changedArray;
    }else{
        visitedIndices.map(function(val){

            checkNeighbours(changedArray, val[0], val[1])
        })
    }
}

// Memoizing the recusive function
checkNeighbours = memoize(checkNeighbours);

// The function which decides the status of a cell using the predefined rules defined in the function
function rulesOfGameOfLife(arr, i, j, countAlive) {

    if (cellStatus(arr[i][j])) {
        if (countAlive < 2) {
            arr[i][j] = 0;
        }
        if (countAlive === 3 || countAlive === 2) {
            arr[i][j] = 1;
        }
        if (countAlive > 3) {
            arr[i][j] = 0;
        }
    } else {
        //if dead
        if (countAlive === 3) {
            arr[i][j] = 1;
        }
    }
    return arr;
}

// To display the generation
function display(arr){
var str = "";
    for (var row = 0; row < inputArrayRows.length; row++) {
        for (var col = 0; col < inputArrayColumns.length; col++) {
            str += arr[row][col];
        }
        console.log(str);
    }
}

/**Initial Configuration */
var inputArr = [
    [1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1]
];

// Getting number of rows and columns

var inputArrayRows = inputArr.length;
var inputArrayColumns = inputArr[0].length;

/* User defined start Indices OPTIONAL*/
// var startPointIndexi = 0;
// var startPointIndexj = 1;

// Self invoking function to get input array and then process the same
function generation(inputArr) {
    display(checkNeighbours(inputArr))
    generation(checkNeighbours(inputArr))
}

generation(inputArr);