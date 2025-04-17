export class VirtualMachine {
    constructor() {
        this.stack = []
        this.labels = {}
        this.globals = {}
        this.programCounter = 0
        this.stackPointer = 0
        this.isRunning = false
    }
}
