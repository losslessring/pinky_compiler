import assert from 'assert'
import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'
import { Statements } from './Statements'

export class IfStatement extends Statement {
    constructor(test, thenStatements, elseStatements, line) {
        super()
        assert(
            test instanceof Expression,
            `Test condition object ${JSON.stringify(
                test
            )} in if statement is not of expected Expression type`
        )

        assert(
            thenStatements instanceof Statements,
            `'then' statements object ${JSON.stringify(
                thenStatements
            )} in if statement is not of expected Statements type`
        )

        assert(
            elseStatements === undefined ||
                elseStatements instanceof Statements,
            `'else' statements object ${JSON.stringify(
                elseStatements
            )}in if statement is not of expected Statements type`
        )

        this.test = test
        this.thenStatements = thenStatements
        this.elseStatements = elseStatements
        this.line = line
    }

    toString() {
        return `IfStatement ${this.test}, then ${this.thenStatements}, else ${this.elseStatements}, line ${this.line}`
    }
}
