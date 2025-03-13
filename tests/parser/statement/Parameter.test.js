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

export const Parameter_test = () => {
    describe('parameter statement', () => {
        it('create new Parameter class from "a"', () => {
            const line = 1

            const result = new Parameter('a', line)

            const expected = { name: 'a', line: 1 }
            expect(result).toBe(expected)
        })

        it('fail to create new Parameter class from 1', () => {
            const line = 1

            let result = undefined
            try {
                result = new Parameter(1, line)
            } catch (error) {
                const expected =
                    "Constructor parameter 'name' of a Parameter class instance with a value of 1 of the Number type is not of the expected string type."
                expect(error.message).toBe(expected)
            }

            expect(result).toBe(undefined)
        })
    })
}
