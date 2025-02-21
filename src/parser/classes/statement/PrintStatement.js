import assert from 'assert'
import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'

export class PrintStatement extends Statement {
    constructor(value, line) {
        super()
        assert(
            value instanceof Expression,
            `${value} is not of expected Expression type`
        )

        this.value = value
        this.line = line
    }

    toString() {
        return `PrintStatement ${this.value}`
    }
}
