import assert from 'assert'
import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'

export class PrintLineStatement extends Statement {
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
        return `PrintLineStatement ${this.value}, line ${this.line}`
    }
}
