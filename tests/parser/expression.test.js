import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from './../../src/lexer/tokens'

import { Token } from './../../src/lexer/Token'
import { expression } from './../../src/parser/expression'

export const expression_test = () => {
    describe('expression', () => {
        it('expression 2*3', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '3', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    left: { value: 2 },
                    right: { value: 3 },
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2+3', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '3', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: { value: 2 },
                    right: { value: 3 },
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2+42', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '42', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: { value: 2 },
                    right: { value: 42 },
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '42', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2+42*5', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '42', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '5', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: { value: 2 },
                    right: {
                        operator: {
                            tokenType: 'TOK_STAR',
                            lexeme: '*',
                            line: 1,
                        },
                        left: { value: 42 },
                        right: { value: 5 },
                    },
                },
                current: 5,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '42', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2+42+5', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '42', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '5', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: {
                        operator: {
                            tokenType: 'TOK_PLUS',
                            lexeme: '+',
                            line: 1,
                        },
                        left: { value: 2 },
                        right: { value: 42 },
                    },
                    right: { value: 5 },
                },
                current: 5,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '42', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2+42*5*7', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '42', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '5', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '7', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: { value: 2 },
                    right: {
                        operator: {
                            tokenType: 'TOK_STAR',
                            lexeme: '*',
                            line: 1,
                        },
                        left: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 42 },
                            right: { value: 5 },
                        },
                        right: { value: 7 },
                    },
                },
                current: 7,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '42', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '7', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2+42*2+(47*-21)', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_INTEGER, '42', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_LPAREN, '(', 1),
                new Token(TOKENS.TOK_INTEGER, '47', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_MINUS, '-', 1),
                new Token(TOKENS.TOK_INTEGER, '21', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: {
                        operator: {
                            tokenType: 'TOK_PLUS',
                            lexeme: '+',
                            line: 1,
                        },
                        left: { value: 2 },
                        right: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 42 },
                            right: { value: 2 },
                        },
                    },
                    right: {
                        value: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 47 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_MINUS',
                                    lexeme: '-',
                                    line: 1,
                                },
                                operand: { value: 21 },
                            },
                        },
                    },
                },
                current: 12,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '42', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '47', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '21', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('expression 2/42.22*2+(47*-21)', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_SLASH, '/', 1),
                new Token(TOKENS.TOK_FLOAT, '42.22', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_PLUS, '+', 1),
                new Token(TOKENS.TOK_LPAREN, '(', 1),
                new Token(TOKENS.TOK_INTEGER, '47', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_MINUS, '-', 1),
                new Token(TOKENS.TOK_INTEGER, '21', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]
            const result = expression(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: {
                        operator: {
                            tokenType: 'TOK_STAR',
                            lexeme: '*',
                            line: 1,
                        },
                        left: {
                            operator: {
                                tokenType: 'TOK_SLASH',
                                lexeme: '/',
                                line: 1,
                            },
                            left: { value: 2 },
                            right: { value: 42.22 },
                        },
                        right: { value: 2 },
                    },
                    right: {
                        value: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 47 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_MINUS',
                                    lexeme: '-',
                                    line: 1,
                                },
                                operand: { value: 21 },
                            },
                        },
                    },
                },
                current: 12,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_SLASH', lexeme: '/', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '42.22', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '47', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '21', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
