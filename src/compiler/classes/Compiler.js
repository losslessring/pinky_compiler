export class Compiler {
    constructor() {
        this.code = []
        this.locals = []
        this.globals = []
        this.numberOfGlobals = 0
        this.numberOfLocals = 0
        this.scopeDepth = 0
        this.labelCounter = 0
    }
}
