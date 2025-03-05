import assert from 'assert'
import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'
import { Statements } from './Statements'

export class WhileStatement extends Statement {
    constructor(test, bodyStatements, line) {
        super()
        assert(
            test instanceof Expression,
            `Test condition object ${JSON.stringify(
                test
            )} in while statement is not of expected Expression type`
        )

        assert(
            bodyStatements instanceof Statements,
            `Object ${JSON.stringify(
                bodyStatements
            )} in while statement is not of expected Statements type`
        )

        this.test = test
        this.bodyStatements = bodyStatements
        this.line = line
    }

    toString() {
        return `WhileStatement ${this.test}, ${this.bodyStatements}, line ${this.line}`
    }
}
