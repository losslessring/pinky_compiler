import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { BinaryOperation } from './../../../src/parser/classes/BinaryOperation'
import { Token } from './../../../src/lexer/Token'
import { TOKENS } from './../../../src/lexer/tokens'
import { Integer } from './../../../src/parser/classes/Integer'

export const BinaryOperation_test = () => {
    describe('Float', () => {
        it('create new BinaryOperation class from +, 2, 3', () => {
            const plus = new Token(TOKENS.TOK_PLUS, '+', 1)

            const left = new Integer(2)
            const right = new Integer(3)
            const result = new BinaryOperation(plus, left, right)
            const expected = {
                operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                left: { value: 2 },
                right: { value: 3 },
            }

            expect(result).toBe(expected)
        })
    })
}
