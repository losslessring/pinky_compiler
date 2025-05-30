import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { parse } from './../../src/parser/parse'
import { Token } from './../../src/lexer/Token'
import { TOKENS } from './../../src/lexer/tokens'
import { tokenize } from './../../src/lexer/tokenize'
import { prattParse } from './../../src/prattParser/prattParse'

export const pratt_parse_test = () => {
    describe('pratt parse', () => {
        it('pratt parse tokenized 2', () => {
            const current = 0
            const source = '2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = prattParse(current, tokens.tokens)
            const expected = {
                node: { value: 2, line: 1 },
                current: 1,
                tokens: [{ tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 }],
            }
            expect(result).toBe(expected)
        })

        it('pratt parse tokenized 2 + 3 + 4', () => {
            const current = 0
            const source = '2 + 3 + 4'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = prattParse(current, tokens.tokens)

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
                        right: { value: 3, line: 1 },
                        line: 1,
                    },
                    right: { value: 4, line: 1 },
                    line: 1,
                },
                current: 5,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '4', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('pratt parse tokenized 2 + 3 * 4 - 5.5 * 2.2 + 6', () => {
            const current = 0
            const source = '2 + 3 * 4 - 5.5 * 2.2 + 6'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = prattParse(current, tokens.tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: {
                        operator: {
                            tokenType: 'TOK_MINUS',
                            lexeme: '-',
                            line: 1,
                        },
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
                                left: { value: 3, line: 1 },
                                right: { value: 4, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        right: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 5.5, line: 1 },
                            right: { value: 2.2, line: 1 },
                            line: 1,
                        },
                        line: 1,
                    },
                    right: { value: 6, line: 1 },
                    line: 1,
                },
                current: 11,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '4', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '5.5', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '2.2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '6', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('pratt parse tokenized 2 + 3 * (4 - 5.5) * (2.2 + 6)', () => {
            const current = 0
            const source = '2 + 3 * (4 - 5.5) * (2.2 + 6)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = prattParse(current, tokens.tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    left: { value: 2, line: 1 },
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
                            left: { value: 3, line: 1 },
                            right: {
                                value: {
                                    operator: {
                                        tokenType: 'TOK_MINUS',
                                        lexeme: '-',
                                        line: 1,
                                    },
                                    left: { value: 4, line: 1 },
                                    right: { value: 5.5, line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                        right: {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 2.2, line: 1 },
                                right: { value: 6, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        line: 1,
                    },
                    line: 1,
                },
                current: 15,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '4', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '5.5', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '2.2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '6', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('pratt parse tokenized 2 + (3 * 4 - 5.5 * 2.2) + 6', () => {
            const current = 0
            const source = '2 + (3 * 4 - 5.5 * 2.2) + 6'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const result = prattParse(current, tokens.tokens)
            console.dir(result.node, { depth: null })

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
                            value: {
                                operator: {
                                    tokenType: 'TOK_MINUS',
                                    lexeme: '-',
                                    line: 1,
                                },
                                left: {
                                    operator: {
                                        tokenType: 'TOK_STAR',
                                        lexeme: '*',
                                        line: 1,
                                    },
                                    left: { value: 3, line: 1 },
                                    right: { value: 4, line: 1 },
                                    line: 1,
                                },
                                right: {
                                    operator: {
                                        tokenType: 'TOK_STAR',
                                        lexeme: '*',
                                        line: 1,
                                    },
                                    left: { value: 5.5, line: 1 },
                                    right: { value: 2.2, line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                        line: 1,
                    },
                    right: { value: 6, line: 1 },
                    line: 1,
                },
                current: 13,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '4', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '5.5', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_FLOAT', lexeme: '2.2', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '6', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
