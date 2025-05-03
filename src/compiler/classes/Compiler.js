export class Compiler {
    constructor() {
        this.code = []
        this.locals = []
        this.globals = []
        this.scopeDepth = 0
        this.labelCounter = 0
    }
}
