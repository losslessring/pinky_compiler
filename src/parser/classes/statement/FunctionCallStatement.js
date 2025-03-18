import assert from 'assert'
import { Statement } from './Statement'
import { FunctionCall } from './../expressions/FunctionCall'

export class FunctionCallStatement extends Statement {
    constructor(expression, line) {
        super()

        assert(
            expression instanceof FunctionCall,
            `Constructor parameter 'expression' with a value of ${JSON.stringify(
                expression
            )} of the ${
                expression?.constructor?.name
            } type in FunctionCallStatement is not of expected FunctionCall type.`
        )

        this.expression = expression
        this.line = line
    }

    toString() {
        return `FunctionCallStatement ${this.expression}.`
    }
}
