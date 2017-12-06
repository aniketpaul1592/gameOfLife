# Game Of Life

The "game" is a zero-player game, meaning that its evolution is determined by its initial state,
requiring no further input. One interacts with the Game of Life by creating an initial configuration
and observing how it evolves.
The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells,
each of which is in one of two possible states, alive or dead. Every cell interacts with its eight
neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each
step in time, the following transitions occur:
1. Any live cell with fewer than two live neighbours dies, as if caused by under-population​.
2. Any live cell with two or three live neighbours lives on to the next​ ​generation​.
3. Any live cell with more than three live neighbours dies, as if by overcrowding​.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproductio

# Approach

  - Functional Programming: Functional programming (often abbreviated FP) is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects. Functional programming is declarative rather than imperative, and application state flows through pure functions.
  - Recursion and Memoizaion

Thinking:
  - We have an input array which we will pass through our pure function generation(), which accepts one parameter.
  ```js
function generation(inputArr) {
    display(checkNeighbours(inputArr))
    generation(checkNeighbours(inputArr))
}
```
  - generation() call the main function which checks the status of neighbours
```js
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
```
  - checkNeighbours() in turn calls rulesOfGameOfLife to detemine the new state of the cell under consideration
```js
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
```
  - rulesOfGameOfife returns the updated array to checkNeighbours
  - checkNeighbours stores all the visted keys and the recusively calls itself for these cells
  ```js
   if (a && a[k] && a[k][l] && (k != i && l != j)) {
                visitedIndices.push([k,l]); //storing visited keys
   }
   -----------------------------------------------------------------------------------------
   //Recursively calling checkNeighbours
    visitedIndices.map(function(val){
            checkNeighbours(changedArray, val[0], val[1])
    })
  ```
  - Breaking condition is if checkNeighbours is completed on the last element i.e i is equal to totalrows and j equals to total coloumns.
 ```js
 if(i==inputArrayRows && j==inputArrayColumns){
        return changedArray;
 }
 ```
 - the transformed aray is then again passed to genrations function and displayed using display function. 
