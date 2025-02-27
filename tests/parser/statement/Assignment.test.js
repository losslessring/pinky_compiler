import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { IfStatement } from './../../../src/parser/classes/statement/IfStatement'
import { Statements } from './../../../src/parser/classes/statement/Statements'
import { PrintLineStatement } from './../../../src/parser/classes/statement/PrintLineStatement'
import { Boolean } from './../../../src/parser/classes/expressions/Boolean'
import { Assignment } from './../../../src/parser/classes/statement/Assignment'
import { Identifier } from './../../../src/parser/classes/expressions/Identifier'
import { PrintStatement } from './../../../src/parser/classes/statement/PrintStatement'
import { String_ } from './../../../src/parser/classes/expressions/String'

export const Assignment_test = () => {
    describe('assignment statement', () => {
        it('create new Assignment class from print "a" := 10', () => {
            const line = 1

            const left = new Identifier('a', 1)

            const right = new Integer(10, 1)

            const result = new Assignment(left, right, line)

            const expected = {
                left: { name: 'a', line: 1 },
                right: { value: 10, line: 1 },
                line: 1,
            }
            expect(result).toBe(expected)
        })

        it('create new Assignment class from print "xyz" := 10', () => {
            const line = 1

            const left = new Identifier('xyz', 1)

            const right = new Integer(10, 1)

            const result = new Assignment(left, right, line)

            const expected = {
                left: { name: 'xyz', line: 1 },
                right: { value: 10, line: 1 },
                line: 1,
            }
            expect(result).toBe(expected)
        })

        it('fail create new Assignment class from print := 10', () => {
            const line = 1

            const left = new PrintStatement(new String_('a', 1), 1)

            const right = new Integer(10, 1)

            let result = undefined

            try {
                result = new Assignment(left, right, line)
            } catch (error) {
                const expected =
                    'PrintStatement String_ a, line 1 is not of expected Identifier type'
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })
    })
}
