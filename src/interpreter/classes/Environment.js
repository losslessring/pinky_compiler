export class Environment {
    constructor(parent = undefined) {
        this.variables = {}
        this.parent = parent
    }
}
