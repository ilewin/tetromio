import {SHAPES} from './tetrominos.js'

export class Tetromino {

    #shapeId
    #shapeVar
    #shape
    #rotation
    #x
    #y

    get shapeId(){
        return this.#shapeId;
    }

    get shape(){
        return this.#shape;
    }

    get rotation(){
        return this.#rotation;
    }

    set x(x){
        this.#x = x;
    }

    get x(){
        return this.#x;
    }

    set y(y){
        this.#y = y;
    }

    get y(){
        return this.#y;
    }

    constructor(shapeId, rotation){
        this.#shapeId = shapeId;
        this.#shapeVar = SHAPES[this.shapeId];
        this.#rotation = rotation;
        this.#shape = this.#shapeVar[this.#rotation];
        this.#x = 0;
        this.#y = 0;
    }

    rotate(){
        this.#rotation = (this.#rotation + 1) % 4;
        this.#shape = this.#shapeVar[this.#rotation];
    }

    project(colOffset = 0, rowOffset = 0, rotate = false){
        let projectedShape = rotate ? this.#shapeVar[(this.#rotation + 1) % 4] : this.#shape;
        return projectedShape.map(([col, row]) => [this.#x + col + colOffset, this.#y + row + rowOffset]);
    }

    moveLeft(){
        this.#x--;
    }

    moveRight(){
        this.#x++;
    }

    moveDown(){
        this.#y++;
    }




}