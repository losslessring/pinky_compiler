import assert from 'assert'
import { Expression } from './Expression'

export class Integer extends Expression {
    constructor(value, line) {
        super()
        assert(
            Number.isInteger(value),
            `${value} is not of expected integer type`
        )
        this.value = value
        this.line = line
    }

    toString() {
        return `Integer ${this.value}`
    }
}
