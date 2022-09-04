export class TetrisBoard {

    #cols
    #rows
    #board = []

    get board(){
        return this.#board;
    }

    get cols(){
        return this.#cols;
    }

    get rows(){
        return this.#rows;
    }

    constructor(cols, rows){
        this.#cols = cols
        this.#rows = rows
        for (let i=0; i < this.#cols; i++){
            this.#board[i] = [];
            for (let j=0; j<this.#rows; j++){
                this.#board[i][j] = null;
            }
        }
    }

    set(row, col, val) {
        this._grid[row][col] = val;
    }

    get(row, col) {
        if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
            return this._grid[row][col];
        } else {
            return null;
        }
    }

    tetrominoColides(tetromino, xOffset = 0, yOffset = 0, rotate = false){
        return tetromino.project(xOffset, yOffset, rotate).some(([x, y]) => {
            if (
                x < 0 ||
                x >= this.#cols ||
                y >= this.#rows ||
                this.#board[x][y] != null
            ) return true
            return false
        });
    }

    addTetromino(tetromino){
        tetromino.project().forEach(([x, y]) => {
            this.#board[x][y] = tetromino.shapeId;
        })
    }

    clearLines(){
        let linesCleared = 0;
        for (let i=0; i < this.#rows; i++){
            if (this.#board.every(col => col[i] != null)){
                linesCleared++;
                this.#board.forEach(col => col.splice(i, 1));
                this.#board.forEach(col => col.unshift(null));
            }
        }
        return linesCleared;
    }

    get gameOver() {
        return this.#board.some(col => col[0] != null);
    }






}