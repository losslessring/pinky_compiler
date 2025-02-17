import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { TOKENS } from '../../src/lexer/tokens'
import { Token } from '../../src/lexer/Token'
import { logicalAnd } from './../../src/parser/logicalAnd'

export const logical_and_test = () => {
    describe('logical and', () => {
        it('logical and true and true', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_TRUE, 'true', 1),
                new Token(TOKENS.TOK_AND, 'and', 1),
                new Token(TOKENS.TOK_TRUE, 'true', 1),
            ]
            const result = logicalAnd(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    left: { value: true, line: 1 },
                    right: { value: true, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                    { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('logical and false and true', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_FALSE, 'false', 1),
                new Token(TOKENS.TOK_AND, 'and', 1),
                new Token(TOKENS.TOK_TRUE, 'true', 1),
            ]
            const result = logicalAnd(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    left: { value: false, line: 1 },
                    right: { value: true, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                    { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('logical and true and false', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_TRUE, 'true', 1),
                new Token(TOKENS.TOK_AND, 'and', 1),
                new Token(TOKENS.TOK_FALSE, 'false', 1),
            ]
            const result = logicalAnd(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    left: { value: true, line: 1 },
                    right: { value: false, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                    { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('logical and false and false', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_FALSE, 'false', 1),
                new Token(TOKENS.TOK_AND, 'and', 1),
                new Token(TOKENS.TOK_FALSE, 'false', 1),
            ]
            const result = logicalAnd(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    left: { value: false, line: 1 },
                    right: { value: false, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                    { tokenType: 'TOK_AND', lexeme: 'and', line: 1 },
                    { tokenType: 'TOK_FALSE', lexeme: 'false', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
