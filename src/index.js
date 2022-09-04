import {Assets} from '@pixi/assets'
import config from './config'
import {Tetromio} from './Tetromio'

let game = new Tetromio(config.settings)

Assets.load('tetrominos.json').then((assets) => {
    game.init(assets)
});
