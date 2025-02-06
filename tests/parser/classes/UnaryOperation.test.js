import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Token } from './../../../src/lexer/Token'
import { TOKENS } from './../../../src/lexer/tokens'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { UnaryOperation } from './../../../src/parser/classes/expressions/UnaryOperation'

export const UnaryOperation_test = () => {
    describe('unary operation', () => {
        it('create new UnaryOperation class from -, 2', () => {
            const minus = new Token(TOKENS.TOK_MINUS, '-', 1)

            const operand = new Integer(2, 1)
            const result = new UnaryOperation(minus, operand)
            const expected = {
                operator: { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                operand: { value: 2, line: 1 },
            }

            expect(result).toBe(expected)
        })
    })
}
