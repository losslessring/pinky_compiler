import assert from 'assert'
import { Expression } from './Expression'

export class Grouping extends Expression {
    constructor(value) {
        super()

        assert(
            value instanceof Expression,
            `${value} is not of expected Expression type`
        )

        this.value = value
    }

    toString() {
        return `Grouping ${this.value}`
    }
}
