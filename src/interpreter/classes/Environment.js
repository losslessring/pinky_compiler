export class Environment {
    constructor(parent = undefined) {
        this.variables = {}
        this.functions = {}
        this.parent = parent
    }
}
