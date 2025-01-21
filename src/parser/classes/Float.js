import assert from 'assert'
import { Expression } from './Expression'
export class Float extends Expression {
    constructor(value) {
        super()
        assert(
            Number(value) === value && value % 1 !== 0,
            `${value} is not of expected float type`
        )
        this.value = value
    }

    toString() {
        return `Float ${this.value}`
    }
}
