class Key {
    #pressed = false;
    #repeat = 0;
    #repeatDelay = 0;
    #initialRepeatDelay = 0;
    #repeatTimer = 0;

    constructor(){
        this.#repeat = 0;
        this.#repeatDelay = 5;
        this.#initialRepeatDelay = 2;
        this.#repeatTimer = this.initialRepeatDelay
    }

    down(){
        this.#pressed = true;
    }

    up(){
        this.#repeat = 0;
        this.#pressed = false;
        this.#repeatTimer = 0;
    }

    get status(){
        if (this.#pressed) {
            --this.#repeatTimer
            if (this.#repeatTimer <= 0) {
                this.#repeatTimer = (this.#repeat > 0) ? this.#repeatDelay : this.#initialRepeatDelay;
                return true
            }
        }
        this.#repeat++;
        return false
    }
}

export class Keyboard {
    static controls;
    static keys
    static state
    static initialize() {
        Keyboard.controls = {"ArrowUp": "up", "ArrowDown": "down", "ArrowLeft": "left", "ArrowRight": "right", "KeyW": "up", "KeyS": "down", "KeyA": "left", "KeyD": "right", "KeyQ": "rotateLeft", "KeyE": "rotateRight"};
        Keyboard.keys = new Map()
        Object.keys(Keyboard.controls).forEach(key => {
            Keyboard.keys.set(key, new Key())
        })
        document.addEventListener("keydown", Keyboard.keyDown);
        document.addEventListener("keyup", Keyboard.keyUp);

    }
    static keyDown(e) {
        let k = Keyboard.keys.get(e.code)
        if (k) k.down();
    }
    static keyUp(e){
        let k = Keyboard.keys.get(e.code)
        if (k) k.up();
    }
}