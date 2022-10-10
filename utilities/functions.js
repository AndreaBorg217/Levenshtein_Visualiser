/* eslint-disable prettier/prettier */
const resize = (array, requiredLength) => {
    while(array.length != requiredLength){
        array.push('');
    }
    return array;
}

const populateFirstRow = (start, matrix) =>{
    let string = ' ' + 'ε' + start;
    matrix[0] = Array.from(string)
}

const populateFirstCol = (target, matrix, start) =>{
    let string = 'ε' + target
    let char = 0
    for(let i = 1; i<matrix.length; i++){
        let row = resize([string[char]], (start.length) + 2)
        char++
        matrix[i] = row
    }
    
}

const populateSecondRow = (matrix) => {
    let max = matrix[1].length
    for(let i = 1; i<max; i++){
        matrix[1][i] = i - 1;
    }
}

const populateSecondCol = (matrix) => {
    for(let i = 2; i<matrix.length; i++){
        matrix[i][1] = i - 1
    }
}

const min = (a, b, c) => Math.min(Math.min(a, b),c)

const calcOperations = (matrix) =>{
    for(let row = 2; row<matrix.length; row++){
        let startLetter = matrix[row][0];
        for(let col = 2; col<matrix[1].length; col++){
            let targetLetter = matrix[0][col]
            let diag = matrix[row-1][col-1]
            let left = matrix[row][col-1]
            let above = matrix[row-1][col]
            let minimumOperation = min(diag, left, above)
            if(startLetter == targetLetter){
                matrix[row][col] = diag;
            }
            else{
                matrix[row][col] = minimumOperation + 1;
            }
        }
    }
}

export function operations(start, target){
    let longest = Math.max(start.length, target.length)
    let arrayStart = Array.from(start)
    let arrayTarget = Array(longest)
    
   resize(arrayStart, longest);

    arrayStart.forEach((char, index) => 
        {
            if (char && char == target[index]){
                arrayStart[index] = {letter: char, bc: '#FFFFFF'}
                arrayTarget[index] = {letter: char, bc: '#FFFFFF'}
            } //copy
            else if (char && char != target[index]){
                arrayStart[index] = {letter: char, bc: '#F4D785'}
                arrayTarget[index] = {letter: char, bc: '#F4D785'}
            } //swap
            else if (!char && start.length < target.length){
                arrayStart[index] = {letter: char, bc: '#9CD2B4'}
                arrayTarget[index] = {letter: target[index], bc: '#9CD2B4'}
            } //insert
            else if (!char && start.length > target.length){
                arrayStart[index] = {letter: char, bc: '#F47B74'}
                arrayTarget[index] = {letter: '', bc: '#F47B74'}
            } //delete
        }
    )
    
   return [arrayStart, arrayTarget];
}

export function createMatrix(start, target){
    let matrix = Array(target.length + 2)
    populateFirstRow(start, matrix)
    populateFirstCol(target,matrix, start)
    populateSecondRow(matrix)
    populateSecondCol(matrix)
    calcOperations(matrix)
    console.table(matrix)
}
