export const settings = {
    // Game Logic Settings
    cols: 10,
    rows: 20,
    hiddenRows: 2,
    // number of frames between block falls one row
    fallSpeed: 30,
    fallSpeedMin: 3,
    fallSpeedupStep: 2,
    fallSpeedupDelay: 1800,
    // block will fall this time faster when drop key pressed
    dropModifier: 10,

    // Game Graphics Settings
    blockSize: 48,
    width: 480, // cols * blockSize
    height: 960, // rows * blockSize
    containerid: 'scene',

    // Keyboard settings
    // controls key repeat speed
    repeatDelay: 2,
    initialRepeatDelay: 10,

}

export default {settings};
