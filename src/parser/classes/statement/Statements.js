import assert from 'assert'
import { Node } from './../expressions/Node'
import { Statement } from './Statement'

export class Statements extends Node {
    constructor(statements, line) {
        super()

        statements.forEach((statement) => {
            assert(
                statement instanceof Statement,
                `${statement} is not of expected Statement type`
            )
        })
        this.statements = statements
        this.line = line
    }

    toString() {
        return `Statements ${this.statements.map(statement)}`
    }
}
