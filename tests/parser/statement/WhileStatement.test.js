import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { Statements } from './../../../src/parser/classes/statement/Statements'
import { PrintLineStatement } from './../../../src/parser/classes/statement/PrintLineStatement'
import { Boolean } from './../../../src/parser/classes/expressions/Boolean'
import { WhileStatement } from './../../../src/parser/classes/statement/WhileStatement'

export const WhileStatement_test = () => {
    describe('while statement', () => {
        it('create new WhileStatement class true println 10', () => {
            const line = 1

            const test = new Boolean(true, line)

            const bodyStatements = new Statements(
                [new PrintLineStatement(new Integer(10, 1), line)],
                line
            )

            const result = new WhileStatement(test, bodyStatements, line)

            const expected = {
                test: { value: true, line: 1 },
                bodyStatements: {
                    statements: [{ value: { value: 10, line: 1 }, line: 1 }],
                    line: 1,
                },
                line: 1,
            }
            expect(result).toBe(expected)
        })
    })
}
