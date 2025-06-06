import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { parse } from './../../src/parser/parse'
import { Token } from './../../src/lexer/Token'
import { TOKENS } from './../../src/lexer/tokens'
import { tokenize } from './../../src/lexer/tokenize'

export const parse_test = () => {
    describe('parse', () => {
        it('parse 2+42*2+(47*-21)', () => {
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
            const result = parse(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: {
                        operator: {
                            tokenType: 'TOK_PLUS',
                            lexeme: '+',
                            line: 1,
                        },
                        left: { value: 2, line: 1 },
                        right: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 42, line: 1 },
                            right: { value: 2, line: 1 },
                            line: 1,
                        },
                        line: 1,
                    },
                    right: {
                        value: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 47, line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_MINUS',
                                    lexeme: '-',
                                    line: 1,
                                },
                                operand: { value: 21, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        line: 1,
                    },
                    line: 1,
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

        it('parse tokenized 2+42*2+(47*-21)', () => {
            const current = 0

            const source = '2+42*2+(47*-21)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = parse(current, tokens.tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: {
                        operator: {
                            tokenType: 'TOK_PLUS',
                            lexeme: '+',
                            line: 1,
                        },
                        left: { value: 2, line: 1 },
                        right: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 42, line: 1 },
                            right: { value: 2, line: 1 },
                            line: 1,
                        },
                        line: 1,
                    },
                    right: {
                        value: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 47, line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_MINUS',
                                    lexeme: '-',
                                    line: 1,
                                },
                                operand: { value: 21, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        line: 1,
                    },
                    line: 1,
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

        it('parse 2+42*2+(47*-21', () => {
            const current = 0

            const source = '2+42*2+(47*-21'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            try {
                parse(current, tokens.tokens)
            } catch (error) {
                const expected = "Line 1 Error: ')' expected."
                expect(error.message).toBe(expected)
            }
        })

        it('parse 2+42*2$(47*-21)', () => {
            const current = 0

            const source = '2+42*2$(47*-21)'

            try {
                const tokens = tokenize({
                    source,
                    current: 0,
                    start: 0,
                    line: 1,
                    tokens: [],
                })
                parse(current, tokens.tokens)
            } catch (error) {
                const expected = "Line 1. Error at 6: Unexpected character '$'."
                expect(error.message).toBe(expected)
            }
        })

        it('parse tokenized true and true', () => {
            const current = 0

            const source = 'true and true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = parse(current, tokens.tokens)

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

        it('parse tokenized false and true', () => {
            const current = 0

            const source = 'false and true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = parse(current, tokens.tokens)

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

        it('parse tokenized true and false', () => {
            const current = 0

            const source = 'true and false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = parse(current, tokens.tokens)

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

        it('parse tokenized false and false', () => {
            const current = 0

            const source = 'false and false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = parse(current, tokens.tokens)

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
