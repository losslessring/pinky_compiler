import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { TOKENS } from '../../src/lexer/tokens'
import { Token } from '../../src/lexer/Token'
import { logicalOr } from './../../src/parser/logicalOr'

export const logical_or_test = () => {
    describe('logical or', () => {
        it('logical or true or true', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_TRUE, 'true', 1),
                new Token(TOKENS.TOK_OR, 'or', 1),
                new Token(TOKENS.TOK_TRUE, 'true', 1),
            ]
            const result = logicalOr(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    left: { value: true, line: 1 },
                    right: { value: true, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                    { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('logical or false or true', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_FALSE, 'false', 1),
                new Token(TOKENS.TOK_OR, 'or', 1),
                new Token(TOKENS.TOK_TRUE, 'true', 1),
            ]
            const result = logicalOr(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    left: { value: false, line: 1 },
                    right: { value: true, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                    { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('logical or true or false', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_TRUE, 'true', 1),
                new Token(TOKENS.TOK_OR, 'or', 1),
                new Token(TOKENS.TOK_FALSE, 'false', 1),
            ]
            const result = logicalOr(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    left: { value: true, line: 1 },
                    right: { value: false, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                    { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('logical or false or false', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_FALSE, 'false', 1),
                new Token(TOKENS.TOK_OR, 'or', 1),
                new Token(TOKENS.TOK_FALSE, 'false', 1),
            ]
            const result = logicalOr(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    left: { value: false, line: 1 },
                    right: { value: false, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                    { tokenType: 'TOK_OR', lexeme: 'or', line: 1 },
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
