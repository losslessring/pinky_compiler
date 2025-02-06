import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { BinaryOperation } from '../../../src/parser/classes/expressions/BinaryOperation'
import { Token } from './../../../src/lexer/Token'
import { TOKENS } from './../../../src/lexer/tokens'
import { Integer } from './../../../src/parser/classes/expressions/Integer'

export const BinaryOperation_test = () => {
    describe('binary operation', () => {
        it('create new BinaryOperation class from +, 2, 3', () => {
            const line = 1
            const plus = new Token(TOKENS.TOK_PLUS, '+', line)

            const left = new Integer(2, line)
            const right = new Integer(3, line)
            const result = new BinaryOperation(plus, left, right, line)
            const expected = {
                operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                left: { value: 2, line: 1 },
                right: { value: 3, line: 1 },
                line: 1,
            }

            expect(result).toBe(expected)
        })
    })
}
