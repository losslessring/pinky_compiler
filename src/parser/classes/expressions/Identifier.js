import assert from 'assert'
import { Expression } from './Expression'
export class Identifier extends Expression {
    constructor(name, line) {
        super()

        assert(
            typeof name === 'string',
            `${name} is not of expected string type`
        )
        this.name = name
        this.line = line
    }

    toString() {
        return `Identifier ${this.value}`
    }
}
