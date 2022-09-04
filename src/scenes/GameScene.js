import {Container, Sprite} from 'pixi.js'
import { BoardRenderer } from '../render/BoardRenderer';
import { TetrisBoard } from '../state/TetrisBoard';
import { TetrominoFactory } from '../state/TetrominoFactory';
import { Keyboard } from '../utils/Keyboard';
 
export class GameScene extends Container {

    #fallspeed
    #falltimer
    #factory
    #tetromino
    #board
    #initialFallSpeed

    get board() {
        return this.#board;
    }

    get tetromino() {
        return this.#tetromino;
    }

    constructor(game){
        super();
        this.game = game;
        this.#fallspeed = this.game.config.fallSpeed;
        this.#initialFallSpeed = this.#fallspeed;
        this.#falltimer = this.#fallspeed
        this.renderer = new BoardRenderer(
            this.game.config.cols,
            this.game.config.rows,
            this.game.assets.textures,
            this.game.config.blockSize,
            )

        this.addChild(this.renderer)

        this.#board = new TetrisBoard(this.game.config.cols, this.game.config.rows)
        
        this.#factory = new TetrominoFactory()()

        this.#tetromino = this.launchTetromino(this.#factory)
            
    }

    launchTetromino(factory){
        let tetromino = factory.next().value
        tetromino.y = -2
        tetromino.x = Math.floor(this.game.config.cols / 2) - 1
        return tetromino
    }

    update(fp){

        this.#falltimer -= fp;

        if (Keyboard.keys.get("ArrowLeft")?.status && !this.#board.tetrominoColides(this.#tetromino, -1)){
            this.#tetromino.moveLeft()
        }

        if (Keyboard.keys.get("ArrowRight")?.status && !this.#board.tetrominoColides(this.#tetromino, 1)){
            this.#tetromino.moveRight()
        }

        if (Keyboard.keys.get("ArrowUp")?.status && !this.#board.tetrominoColides(this.#tetromino, 0, 0, true)){
            this.#tetromino.rotate()
        }

        if (Keyboard.keys.get("ArrowDown")?.status) {
            this.#falltimer = 0
            this.#fallspeed = 0
        } else {
            this.#fallspeed = this.#initialFallSpeed
        }
            

        if (this.#falltimer <= 0) { 
            this.#falltimer = this.#fallspeed;
            
            if (this.#board.tetrominoColides(this.#tetromino, 0, 1)) {
                this.#board.addTetromino(this.#tetromino)
                this.#board.clearLines()
                if (this.#board.gameOver){
                    this.game.gameOver()
                }
                this.#tetromino = this.launchTetromino(this.#factory)
            }
            
            this.#tetromino.moveDown();   
        }
     
        this.renderer.renderBoard(this.board)
        this.renderer.renderTetrominoProjection(this.tetromino)
    }
}