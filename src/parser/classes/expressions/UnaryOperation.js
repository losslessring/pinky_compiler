import assert from 'assert'
import { Expression } from './Expression'
import { Token } from './../../../lexer/Token'
export class UnaryOperation extends Expression {
    constructor(operator, operand, line) {
        super()
        assert(
            operator instanceof Token,
            `${operator} is not of expected Token type`
        )
        assert(
            operand instanceof Expression,
            `${operand} is not of expected Expression type`
        )

        this.operator = operator
        this.operand = operand
        this.line = line
    }

    toString() {
        return `Unary operation ${this.operator.lexeme}, ${this.operand}`
    }
}
