import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { IfStatement } from './../../../src/parser/classes/statement/IfStatement'
import { Statements } from './../../../src/parser/classes/statement/Statements'
import { PrintLineStatement } from './../../../src/parser/classes/statement/PrintLineStatement'
import { Boolean } from './../../../src/parser/classes/expressions/Boolean'

export const IfStatement_test = () => {
    describe('if statement', () => {
        it('create new IfStatement class true 10 5', () => {
            const line = 1

            const test = new Boolean(true, line)

            const thenStatements = new Statements(
                [new PrintLineStatement(new Integer(10, 1), line)],
                line
            )

            const elseStatements = new Statements(
                [new PrintLineStatement(new Integer(5, 1), line)],
                line
            )

            const result = new IfStatement(
                test,
                thenStatements,
                elseStatements,
                line
            )

            const expected = {
                test: { value: true, line: 1 },
                thenStatements: {
                    statements: [{ value: { value: 10, line: 1 }, line: 1 }],
                    line: 1,
                },
                elseStatements: {
                    statements: [{ value: { value: 5, line: 1 }, line: 1 }],
                    line: 1,
                },
                line: 1,
            }
            expect(result).toBe(expected)
        })
    })
}
