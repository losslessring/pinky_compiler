import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from '../../src/lexer/tokens'

import { Token } from '../../src/lexer/Token'
import { parameters } from './../../src/parser/parameters'
import { args } from './../../src/parser/args'

export const args_test = () => {
    describe('args', () => {
        it('arg 10', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, 10, 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]

            const result = args(current, tokens)

            const expected = {
                node: [{ value: 10, line: 1 }],
                current: 1,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: 10, line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('args 10, 20', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, 10, 1),
                new Token(TOKENS.TOK_COMMA, ',', 1),
                new Token(TOKENS.TOK_INTEGER, 20, 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]

            const result = args(current, tokens)

            const expected = {
                node: [
                    { value: 10, line: 1 },
                    { value: 20, line: 1 },
                ],
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: 10, line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: 20, line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('args "a", "b"', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_STRING, '"a"', 1),
                new Token(TOKENS.TOK_COMMA, ',', 1),
                new Token(TOKENS.TOK_STRING, '"b"', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]

            const result = args(current, tokens)

            const expected = {
                node: [
                    { value: 'a', line: 1 },
                    { value: 'b', line: 1 },
                ],
                current: 3,
                tokens: [
                    { tokenType: 'TOK_STRING', lexeme: '"a"', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"b"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
