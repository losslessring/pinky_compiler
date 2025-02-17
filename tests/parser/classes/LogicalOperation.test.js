import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { BinaryOperation } from '../../../src/parser/classes/expressions/BinaryOperation'
import { Token } from './../../../src/lexer/Token'
import { TOKENS } from './../../../src/lexer/tokens'
import { Integer } from './../../../src/parser/classes/expressions/Integer'
import { LogicalOperation } from './../../../src/parser/classes/expressions/LogicalOperation'
import { Boolean } from './../../../src/parser/classes/expressions/Boolean'

export const LogicalOperation_test = () => {
    describe('LogicalOperation', () => {
        it('create new LogicalOperation class from and, true, true', () => {
            const line = 1
            const and = new Token(TOKENS.TOK_AND, 'and', line)

            const left = new Boolean(true, line)
            const right = new Boolean(true, line)

            const result = new LogicalOperation(and, left, right, line)
            const expected = {
                operator: { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                left: { value: true, line: 1 },
                right: { value: true, line: 1 },
                line: 1,
            }

            expect(result).toBe(expected)
        })

        it('create new LogicalOperation class from or, false, true', () => {
            const line = 1
            const and = new Token(TOKENS.TOK_OR, 'or', line)

            const left = new Boolean(false, line)
            const right = new Boolean(true, line)

            const result = new LogicalOperation(and, left, right, line)
            const expected = {
                operator: { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                left: { value: false, line: 1 },
                right: { value: true, line: 1 },
                line: 1,
            }

            expect(result).toBe(expected)
        })
    })
}
