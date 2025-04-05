export class VirtualMachine {
    constructor() {
        this.stack = []
        this.programCounter = 0
        this.stackPointer = 0
        this.isRunning = false
    }

    execute(instructions) {}
}
