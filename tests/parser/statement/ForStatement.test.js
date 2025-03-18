import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { IfStatement } from './../../../src/parser/classes/statement/IfStatement'
import { Statements } from './../../../src/parser/classes/statement/Statements'
import { PrintLineStatement } from './../../../src/parser/classes/statement/PrintLineStatement'
import { Boolean } from './../../../src/parser/classes/expressions/Boolean'
import { ForStatement } from '../../../src/parser/classes/statement/ForStatement'
import { Identifier } from './../../../src/parser/classes/expressions/Identifier'
import { statement } from './../../../src/parser/statement'

export const ForStatement_test = () => {
    describe('for statement', () => {
        it('fail to create new ForStatement class with a Boolean identifier', () => {
            const line = 1

            const identifier = new Boolean(true, line)

            let result = undefined
            try {
                result = new ForStatement(identifier)
            } catch (error) {
                const expected =
                    'Constructor parameter \'identifier\' with a value of {"value":true,"line":1} of the Boolean type in for statement is not of expected Identifier type.'
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with an undefined identifier', () => {
            const line = 1

            const identifier = undefined

            let result = undefined
            try {
                result = new ForStatement(identifier)
            } catch (error) {
                const expected =
                    "Constructor parameter 'identifier' with a value of undefined of the undefined type in for statement is not of expected Identifier type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with a null identifier', () => {
            const line = 1

            const identifier = null

            let result = undefined
            try {
                result = new ForStatement(identifier)
            } catch (error) {
                const expected =
                    "Constructor parameter 'identifier' with a value of null of the undefined type in for statement is not of expected Identifier type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with identifier with value of 1', () => {
            const line = 1

            const identifier = 1

            let result = undefined
            try {
                result = new ForStatement(identifier)
            } catch (error) {
                const expected =
                    "Constructor parameter 'identifier' with a value of 1 of the Number type in for statement is not of expected Identifier type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with a start parameter not being an Expression object', () => {
            const line = 1

            const identifier = new Identifier('x', line)
            const start = 1

            let result = undefined
            try {
                result = new ForStatement(identifier, start)
            } catch (error) {
                const expected =
                    "Constructor parameter 'start' with a value of 1 of the Number type in for statement is not of expected Expression type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with an end parameter not being an Expression object', () => {
            const line = 1

            const identifier = new Identifier('x', line)
            const start = new Integer(0, line)
            const end = 10

            let result = undefined
            try {
                result = new ForStatement(identifier, start, end)
            } catch (error) {
                const expected =
                    "Constructor parameter 'end' with a value of 10 of the Number type in for statement is not of expected Expression type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with a step parameter not being an Expression object', () => {
            const line = 1

            const identifier = new Identifier('x', line)
            const start = new Integer(0, line)
            const end = new Integer(10, line)
            const step = 1

            let result = undefined
            try {
                result = new ForStatement(identifier, start, end, step)
            } catch (error) {
                const expected =
                    "Constructor parameter 'step' with a value of 1 of the Number type in for statement is not of expected undefined or Expression type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with a bodyStatements parameter not being a Statements object', () => {
            const line = 1

            const identifier = new Identifier('x', line)
            const start = new Integer(0, line)
            const end = new Integer(10, line)
            const step = new Integer(2, line)

            const bodyStatements = 1

            let result = undefined
            try {
                result = new ForStatement(
                    identifier,
                    start,
                    end,
                    step,
                    bodyStatements
                )
            } catch (error) {
                const expected =
                    "Constructor parameter 'bodyStatements' with a value of 1 of the Number type in for statement is not of expected Statements type"
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new ForStatement class with a line parameter being a string', () => {
            const line = 1

            const identifier = new Identifier('x', line)
            const start = new Integer(0, line)
            const end = new Integer(10, line)
            const step = new Integer(2, line)
            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )
            const forLine = '1'

            let result = undefined
            try {
                result = new ForStatement(
                    identifier,
                    start,
                    end,
                    step,
                    bodyStatements,
                    forLine
                )
            } catch (error) {
                const expected =
                    'Constructor parameter \'line\' with a value of "1" in for statement is not of expected Number type'
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('create new ForStatement class', () => {
            const line = 1

            const identifier = new Identifier('x', line)
            const start = new Integer(0, line)
            const end = new Integer(10, line)
            const step = new Integer(2, line)
            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )

            let result = new ForStatement(
                identifier,
                start,
                end,
                step,
                bodyStatements,
                line
            )

            const expected = {
                identifier: { name: 'x', line: 1 },
                start: { value: 0, line: 1 },
                end: { value: 10, line: 1 },
                step: { value: 2, line: 1 },
                bodyStatements: {
                    statements: [{ value: { name: 'x', line: 1 }, line: 1 }],
                    line: 1,
                },
                line: 1,
            }

            expect(result).toBe(expected)
        })
    })
}
