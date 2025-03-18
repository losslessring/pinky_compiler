import assert from 'assert'
import { Expression } from './Expression'

export class FunctionCall extends Expression {
    constructor(name, args, line) {
        super()

        assert(
            typeof name === 'string',
            `Constructor parameter 'name' of a FunctionDeclaration class instance with a value of ${name} of the ${name?.constructor?.name} type is not of the expected string type.`
        )

        this.name = name
        this.args = args
        this.line = line
    }

    toString() {
        return `FunctionCall ${this.name}, ${this.args}, line ${this.line}.`
    }
}
