import assert from 'assert'
import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'
import { Identifier } from './../expressions/Identifier'

export class Assignment extends Statement {
    constructor(left, right, line) {
        super()
        assert(
            left instanceof Identifier,
            `${left} is not of expected Identifier type`
        )

        assert(
            right instanceof Expression,
            `${right} is not of expected Expression type`
        )

        this.left = left
        this.right = right
        this.line = line
    }

    toString() {
        return `Assignment ${this.left}, ${this.right} line ${this.line}`
    }
}
