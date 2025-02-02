import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from './../../src/lexer/tokens'
import { unary } from './../../src/parser/unary'
import { Token } from './../../src/lexer/Token'

export const unary_test = () => {
    describe('unary', () => {
        it('unary -1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_MINUS, '-', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = unary(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    operand: { value: 1 },
                },
                current: 2,
                tokens: [
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('unary ~1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_NOT, '~', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = unary(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    operand: { value: 1 },
                },
                current: 2,
                tokens: [
                    { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('unary +1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = unary(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    operand: { value: 1 },
                },
                current: 2,
                tokens: [
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('unary ~~1', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_NOT, '~', 1),
                new Token(TOKENS.TOK_NOT, '~', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = unary(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    operand: {
                        operator: {
                            tokenType: 'TOK_NOT',
                            lexeme: '~',
                            line: 1,
                        },
                        operand: { value: 1 },
                    },
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('unary ~(-1)', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_NOT, '~', 1),
                new Token(TOKENS.TOK_LPAREN, '(', 1),
                new Token(TOKENS.TOK_MINUS, '-', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]
            const result = unary(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    operand: {
                        value: {
                            operator: {
                                tokenType: 'TOK_MINUS',
                                lexeme: '-',
                                line: 1,
                            },
                            operand: { value: 1 },
                        },
                    },
                },
                current: 5,
                tokens: [
                    { tokenType: 'TOK_NOT', lexeme: '~', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })
    })
}
