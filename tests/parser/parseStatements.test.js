import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { tokenize } from './../../src/lexer/tokenize'
import { parseStatements } from './../../src/parser/parseStatements'

export const parse_statements_test = () => {
    describe('parse statements', () => {
        it('parse statement print 1 + 2', () => {
            const current = 0

            const source = 'print 1 + 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 1, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 4,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement print 1 + 2 print 3', () => {
            const current = 0

            const source = `print 1 + 2 print 3`
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 1, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        { value: { value: 3, line: 1 }, line: 1 },
                    ],
                    line: 1,
                },
                current: 6,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement print 1 + 2 print 3 * 2^2 print("test")', () => {
            const current = 0

            const source = `print 1 + 2 print 3 * 2^2 print("test")`
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 1, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_STAR',
                                    lexeme: '*',
                                    line: 1,
                                },
                                left: { value: 3, line: 1 },
                                right: {
                                    operator: {
                                        tokenType: 'TOK_CARET',
                                        lexeme: '^',
                                        line: 1,
                                    },
                                    left: { value: 2, line: 1 },
                                    right: { value: 2, line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                        {
                            value: {
                                value: { value: 'test', line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 14,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_CARET', lexeme: '^', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"test"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement print "\n" print 1 + 2 print "\n" print 3 * 2^2 print "\n" print("test")', () => {
            const current = 0

            const source =
                'print "\n" print 1 + 2 print "\n" print 3 * 2^2 print "\n" print("test")'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        { value: { value: '\n', line: 1 }, line: 1 },
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 1, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        { value: { value: '\n', line: 1 }, line: 1 },
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_STAR',
                                    lexeme: '*',
                                    line: 1,
                                },
                                left: { value: 3, line: 1 },
                                right: {
                                    operator: {
                                        tokenType: 'TOK_CARET',
                                        lexeme: '^',
                                        line: 1,
                                    },
                                    left: { value: 2, line: 1 },
                                    right: { value: 2, line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                        { value: { value: '\n', line: 1 }, line: 1 },
                        {
                            value: {
                                value: { value: 'test', line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 20,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"\n"', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"\n"', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_CARET', lexeme: '^', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"\n"', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"test"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement print "\n" print 1 + 2 println 3 * 2^2 println("test") print("This is a test of break\nline.\n")', () => {
            const current = 0

            const source =
                'print "\n" print 1 + 2 println 3 * 2^2 println("test") print("This is a test of break\nline.\n")'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        { value: { value: '\n', line: 1 }, line: 1 },
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 1, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_STAR',
                                    lexeme: '*',
                                    line: 1,
                                },
                                left: { value: 3, line: 1 },
                                right: {
                                    operator: {
                                        tokenType: 'TOK_CARET',
                                        lexeme: '^',
                                        line: 1,
                                    },
                                    left: { value: 2, line: 1 },
                                    right: { value: 2, line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                        {
                            value: {
                                value: { value: 'test', line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        {
                            value: {
                                value: {
                                    value: 'This is a test of break\nline.\n',
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 20,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"\n"', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_CARET', lexeme: '^', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"test"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    {
                        tokenType: 'TOK_STRING',
                        lexeme: '"This is a test of break\nline.\n"',
                        line: 1,
                    },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
