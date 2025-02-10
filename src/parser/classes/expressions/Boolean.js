import assert from 'assert'
import { Expression } from './Expression'
export class Boolean extends Expression {
    constructor(value, line) {
        super()

        assert(
            typeof value === 'boolean',
            `${value} is not of expected boolean type`
        )
        this.value = value
        this.line = line
    }

    toString() {
        return `Boolean ${this.value}`
    }
}
