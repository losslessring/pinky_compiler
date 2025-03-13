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
import { Parameter } from './../../../src/parser/classes/statement/Parameter'
import { FunctionDeclaration } from './../../../src/parser/classes/statement/FunctionDeclaration'

export const FunctionDecalration_test = () => {
    describe('function declaration', () => {
        it('create new FunctionDecalration class with a single parameter and a body statement', () => {
            const line = 1

            const name = 'custom_print'
            const parameters = [new Parameter('x', 1)]

            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )

            const result = new FunctionDeclaration(
                name,
                parameters,
                bodyStatements,
                line
            )

            const expected = {
                name: 'custom_print',
                parameters: [{ name: 'x', line: 1 }],
                bodyStatements: {
                    statements: [{ value: { name: 'x', line: 1 }, line: 1 }],
                    line: 1,
                },
                line: 1,
            }
            expect(result).toBe(expected)
        })

        it('create new FunctionDecalration class with two parameters and a body statement', () => {
            const line = 1

            const name = 'custom_print'
            const parameters = [new Parameter('x', 1), new Parameter('y', 1)]

            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )

            const result = new FunctionDeclaration(
                name,
                parameters,
                bodyStatements,
                line
            )

            const expected = {
                name: 'custom_print',
                parameters: [
                    { name: 'x', line: 1 },
                    { name: 'y', line: 1 },
                ],
                bodyStatements: {
                    statements: [{ value: { name: 'x', line: 1 }, line: 1 }],
                    line: 1,
                },
                line: 1,
            }
            expect(result).toBe(expected)
        })

        it('fail to create new FunctionDecalration class with an undefined name', () => {
            const line = 1

            let result = undefined

            const name = undefined
            const parameters = [new Parameter('x', 1)]

            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )

            try {
                result = new FunctionDeclaration(
                    name,
                    parameters,
                    bodyStatements,
                    line
                )
            } catch (error) {
                const expected =
                    "Constructor parameter 'name' of a FunctionDeclaration class instance with a value of undefined of the undefined type is not of the expected string type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new FunctionDecalration class with a parameters not being an Array type', () => {
            const line = 1

            let result = undefined

            const name = 'custom_print'
            const parameters = undefined

            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )

            try {
                result = new FunctionDeclaration(
                    name,
                    parameters,
                    bodyStatements,
                    line
                )
            } catch (error) {
                const expected =
                    "Constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of undefined of the undefined type is not of the expected Array type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('fail to create new FunctionDecalration class with a parameter not being a Parameter type', () => {
            const line = 1

            let result = undefined

            const name = 'custom_print'
            const parameters = [undefined]

            const bodyStatements = new Statements(
                [new PrintLineStatement(new Identifier('x', line), line)],
                line
            )

            try {
                result = new FunctionDeclaration(
                    name,
                    parameters,
                    bodyStatements,
                    line
                )
            } catch (error) {
                const expected =
                    "The value of the constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of undefined of the undefined type is not of the expected Parameter type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })

        it('create new FunctionDecalration class with undefined body statements', () => {
            const line = 1

            const name = 'custom_print'
            const parameters = [new Parameter('x', 1)]

            const bodyStatements = undefined

            const result = new FunctionDeclaration(
                name,
                parameters,
                bodyStatements,
                line
            )

            const expected = {
                name: 'custom_print',
                parameters: [{ name: 'x', line: 1 }],
                bodyStatements: undefined,
                line: 1,
            }

            expect(result).toBe(expected)
        })
    })
}
