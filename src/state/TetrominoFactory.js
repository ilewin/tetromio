import { Tetromino } from "./Tetromino";
import { SHAPES } from "./tetrominos";

export class TetrominoFactory {
    constructor() {
        return function*() {
            while (true) {
                let shapeId = Object.keys(SHAPES)[Math.floor(Math.random() * Object.keys(SHAPES).length)];
                let rotation = Math.floor(Math.random() * 4);
                yield new Tetromino(shapeId, rotation);
            }
        }
    }
}