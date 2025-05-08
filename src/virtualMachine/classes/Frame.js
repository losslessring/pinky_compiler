export class Frame {
    constructor(name, returnProgramCounter, framePointer) {
        this.name = name
        this.returnProgramCounter = returnProgramCounter
        this.framePointer = framePointer
    }
}
