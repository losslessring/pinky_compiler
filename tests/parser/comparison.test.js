import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { TOKENS } from '../../src/lexer/tokens'
import { Token } from '../../src/lexer/Token'
import { comparison } from '../../src/parser/comparison'

export const comparison_test = () => {
    describe('comparison', () => {
        it('comparison 2>1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_GT, '>', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = comparison(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_GT', lexeme: '>', line: 1 },
                    left: { value: 2, line: 1 },
                    right: { value: 1, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_GT', lexeme: '>', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('comparison 2>=2', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_GE, '>=', 1),
                new Token(TOKENS.TOK_INTEGER, '2', 1),
            ]
            const result = comparison(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_GE', lexeme: '>=', line: 1 },
                    left: { value: 2, line: 1 },
                    right: { value: 2, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_GE', lexeme: '>=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('comparison 2<1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_LT, '<', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = comparison(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_LT', lexeme: '<', line: 1 },
                    left: { value: 2, line: 1 },
                    right: { value: 1, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_LT', lexeme: '<', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('comparison 2<=1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_LE, '<=', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = comparison(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_LE', lexeme: '<=', line: 1 },
                    left: { value: 2, line: 1 },
                    right: { value: 1, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_LE', lexeme: '<=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
