import assert from 'assert'
import { Expression } from './Expression'
import { Token } from '../../../lexer/Token'
export class BinaryOperation extends Expression {
    constructor(operator, left, right, line) {
        super()
        assert(
            operator instanceof Token,
            `${operator} is not of expected Token type`
        )
        assert(
            left instanceof Expression,
            `${left} is not of expected Expression type`
        )
        assert(
            right instanceof Expression,
            `${right} is not of expected Expression type`
        )
        this.operator = operator
        this.left = left
        this.right = right
        this.line = line
    }

    toString() {
        return `Binary operation ${this.operator.lexeme}, ${this.left}, ${this.right}`
    }
}
