import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from '../../src/lexer/tokens'

import { Token } from '../../src/lexer/Token'
import { parameters } from './../../src/parser/parameters'

export const parameters_test = () => {
    describe('parameters', () => {
        it('parameter x', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_IDENTIFIER, 'x', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]

            const result = parameters(current, tokens)

            const expected = {
                node: [{ name: 'x', line: 1 }],
                current: 1,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parameters x, y', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_IDENTIFIER, 'x', 1),
                new Token(TOKENS.TOK_COMMA, ',', 1),
                new Token(TOKENS.TOK_IDENTIFIER, 'y', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]

            const result = parameters(current, tokens)

            const expected = {
                node: [
                    { name: 'x', line: 1 },
                    { name: 'y', line: 1 },
                ],
                current: 3,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'y', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
