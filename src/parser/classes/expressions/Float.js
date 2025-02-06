import assert from 'assert'
import { Expression } from './Expression'
export class Float extends Expression {
    constructor(value, line) {
        super()
        assert(
            Number(value) === value && value % 1 !== 0,
            `${value} is not of expected float type`
        )
        this.value = value
        this.line = line
    }

    toString() {
        return `Float ${this.value}`
    }
}
