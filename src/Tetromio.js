import {Application} from 'pixi.js';
import {GameScene} from './scenes/GameScene'
import {GameOverScene} from './scenes/GameOverScene'
import {Keyboard} from './utils/Keyboard'

export class Tetromio {
    
    #config
    #app
    #currentScene
    #scenes
    #assets

    get config(){
        return this.#config;
    }

    get app() {
        return this.#app;
    }

    get currentScene(){
        return this.#currentScene;
    }

    get assets(){
        return this.#assets;
    }

    constructor(config){
        
        this.#config = config;
        this.#app = new Application({
            width: this.#config.width,
            height: this.#config.height,
            backgroundColor: this.#config.background,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            view: document.getElementById(this.#config.containerid)
        });

        this.#scenes = new Map()

         // listen for the browser telling us that the screen size changed
         window.addEventListener("resize", this.resize);

         // call it manually once so we are sure we are the correct size after starting
         this.resize();

         Keyboard.initialize();
        
        //this.#scenes.set('menu', new MenuScene(this));
        //this.#scenes.set('gameover', new GameOverScene(this));


    }

    init(assets){
        this.#assets = assets;
        this.#app.ticker.add(this.update, this);

        this.#scenes.set('game', new GameScene(this));
        this.#scenes.set('gameover', new GameOverScene(this));
        
        this.changeScene(this.#scenes.get('game'));

    }

    update(fp){
        if (this.#currentScene){
            this.#currentScene.update(fp);
        }
    }

    changeScene(newScene){
        if (this.#currentScene) {
            this.#app.stage.removeChild(this.#currentScene);
            this.#currentScene.destroy();
        }
        this.#currentScene = newScene;
        this.#app.stage.addChild(this.currentScene);
    }

    gameOver(){
        this.changeScene(this.#scenes.get('gameover'));
    }

    resize() {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / this.#config.width, screenHeight / this.#config.height);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * this.#config.width);
        const enlargedHeight = Math.floor(scale * this.#config.height);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        this.#app.view.style.width = `${enlargedWidth}px`;
        this.#app.view.style.height = `${enlargedHeight}px`;
        this.#app.view.style.marginLeft = this.#app.view.style.marginRight = `${horizontalMargin}px`;
        this.#app.view.style.marginTop = this.#app.view.style.marginBottom = `${verticalMargin}px`;
    }
}