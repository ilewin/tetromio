import { Container, TextStyle, Text, Graphics } from "pixi.js";

export class GameOverScene extends Container {
    constructor(game) {
        super();
        const style = new TextStyle({
            align: "center",
            fill: "#ffffff",
            fontSize: 52
        });
        const background = new Graphics();
        background.beginFill(0x6495ed);
        background.drawRect(0, 0, game.config.width, game.config.height);
        background.endFill();
        this.addChild(background);
        const texty = new Text('Game Over!', style); // Text supports unicode!
        this.addChild(texty);
        texty.y = (game.config.height - texty.height) / 2;
        texty.x = (game.config.width - texty.width) / 2;
    }

    update() {
        // TODO
    }
}          