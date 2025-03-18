import assert from 'assert'
import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'
import { Statements } from './Statements'
import { Identifier } from '../expressions/Identifier'

export class ForStatement extends Statement {
    constructor(identifier, start, end, step, bodyStatements, line) {
        super()

        assert(
            identifier instanceof Identifier,
            `Constructor parameter 'identifier' with a value of ${JSON.stringify(
                identifier
            )} of the ${
                identifier?.constructor?.name
            } type in for statement is not of expected Identifier type.`
        )

        assert(
            start instanceof Expression,
            `Constructor parameter 'start' with a value of ${JSON.stringify(
                start
            )} of the ${
                start?.constructor?.name
            } type in for statement is not of expected Expression type.`
        )

        assert(
            end instanceof Expression,
            `Constructor parameter 'end' with a value of ${JSON.stringify(
                end
            )} of the ${
                end?.constructor?.name
            } type in for statement is not of expected Expression type.`
        )

        assert(
            step instanceof Expression || step === undefined,
            `Constructor parameter 'step' with a value of ${JSON.stringify(
                step
            )} of the ${
                step?.constructor?.name
            } type in for statement is not of expected undefined or Expression type.`
        )

        assert(
            bodyStatements instanceof Statements,
            `Constructor parameter 'bodyStatements' with a value of ${JSON.stringify(
                bodyStatements
            )} of the ${
                bodyStatements?.constructor?.name
            } type in for statement is not of expected Statements type`
        )

        assert(
            typeof line === 'number',
            `Constructor parameter 'line' with a value of ${JSON.stringify(
                line
            )} in for statement is not of expected Number type`
        )

        this.identifier = identifier
        this.start = start
        this.end = end
        this.step = step
        this.bodyStatements = bodyStatements
        this.line = line
    }

    toString() {
        return `ForStatement ${this.identifier}, ${this.start}, ${this.end}, ${this.step}, ${this.bodyStatements}, line ${this.line}.`
    }
}
