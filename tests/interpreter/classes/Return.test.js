import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { BinaryOperation } from '../../../src/parser/classes/expressions/BinaryOperation'
import { Token } from './../../../src/lexer/Token'
import { TOKENS } from './../../../src/lexer/tokens'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { Return } from './../../../src/interpreter/classes/Return'

export const Return_test = () => {
    describe('return', () => {
        it('throw new Return class', () => {
            try {
                throw new Return(10)
            } catch (error) {
                if (error instanceof Return) {
                }

                expect(error instanceof Return).toBe(true)
            }
        })
    })
}
