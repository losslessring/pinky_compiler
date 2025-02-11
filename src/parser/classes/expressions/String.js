import assert from 'assert'
import { Expression } from './Expression'
export class String_ extends Expression {
    constructor(value, line) {
        super()

        assert(
            typeof value === 'string',
            `${value} is not of expected string type`
        )
        this.value = value
        this.line = line
    }

    toString() {
        return `String_ ${this.value}`
    }
}
