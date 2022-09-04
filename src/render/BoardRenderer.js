import { Container, Sprite } from 'pixi.js'

export class BoardRenderer extends Container {
    
    #board = []
    #cols
    #rows
    #textures

    get board(){
        return this.#board;
    }

    constructor(cols, rows, textures, blockSize){
        super();

        this.#cols = cols
        this.#rows = rows
        this.#textures = textures

        for (let i=0; i < this.#cols; i++){
            this.board[i] = [];
            for (let j=0; j<this.#rows; j++){
                this.#board[i][j] = new Sprite(textures.back);
                this.#board[i][j].x = i * blockSize
                this.#board[i][j].y = j * blockSize
                this.addChild(this.#board[i][j]);
            }
        }
    }

    renderBoard(state){
        for (let i=0; i < this.#cols; i++){
            for (let j=0; j<this.#rows; j++){
                this.#board[i][j].texture = 
                    state.board[i][j] == null 
                    ? this.#textures.back
                    : this.#textures[state.board[i][j]]
            }
        }
    }

    renderTetrominoProjection(tetromino){
        tetromino.project().forEach(([x, y]) => {
            if (y >= 0 && x >= 0) this.#board[x][y].texture = this.#textures[tetromino.shapeId]
        })
    }

}