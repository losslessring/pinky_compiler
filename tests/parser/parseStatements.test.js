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

        it('parse statement x := 10', () => {
            const current = 0

            const source = 'x := 10'
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
                            left: { name: 'x', line: 1 },
                            right: { value: 10, line: 1 },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement _xyz10 := "abc"', () => {
            const current = 0

            const source = '_xyz10 := "abc"'
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
                            left: { name: '_xyz10', line: 1 },
                            right: { value: 'abc', line: 1 },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: '_xyz10', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"abc"', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement x := 0 x := x + 1', () => {
            const current = 0

            const source = 'x := 0 x := x + 1'
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
                            left: { name: 'x', line: 1 },
                            right: { value: 0, line: 1 },
                            line: 1,
                        },
                        {
                            left: { name: 'x', line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { name: 'x', line: 1 },
                                right: { value: 1, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 8,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '0', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement print 1 + 2 x := 0 x := x + 1 if 5~=2 then println "True!" end', () => {
            const current = 0

            const source =
                'print 1 + 2 x := 0 x := x + 1 if 5~=2 then println "True!" end'
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
                            left: { name: 'x', line: 1 },
                            right: { value: 0, line: 1 },
                            line: 1,
                        },
                        {
                            left: { name: 'x', line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { name: 'x', line: 1 },
                                right: { value: 1, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                        {
                            test: {
                                operator: {
                                    tokenType: 'TOK_NE',
                                    lexeme: '~=',
                                    line: 1,
                                },
                                left: { value: 5, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            thenStatements: {
                                statements: [
                                    {
                                        value: { value: 'True!', line: 1 },
                                        line: 1,
                                    },
                                ],
                                line: 1,
                            },
                            elseStatements: undefined,
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 20,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '0', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_IF', lexeme: 'if', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_NE', lexeme: '~=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_THEN', lexeme: 'then', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"True!"', line: 1 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse while statement', () => {
            const source =
                'i := 0\n' +
                'while i <= 10 do\n' +
                'println("i = " + i)\n' +
                'i := i + 1\n' +
                'end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        {
                            left: { name: 'i', line: 1 },
                            right: { value: 0, line: 1 },
                            line: 1,
                        },
                        {
                            test: {
                                operator: {
                                    tokenType: 'TOK_LE',
                                    lexeme: '<=',
                                    line: 2,
                                },
                                left: { name: 'i', line: 2 },
                                right: { value: 10, line: 2 },
                                line: 2,
                            },
                            bodyStatements: {
                                statements: [
                                    {
                                        value: {
                                            value: {
                                                operator: {
                                                    tokenType: 'TOK_PLUS',
                                                    lexeme: '+',
                                                    line: 3,
                                                },
                                                left: {
                                                    value: 'i = ',
                                                    line: 3,
                                                },
                                                right: { name: 'i', line: 3 },
                                                line: 3,
                                            },
                                            line: 3,
                                        },
                                        line: 3,
                                    },
                                    {
                                        left: { name: 'i', line: 4 },
                                        right: {
                                            operator: {
                                                tokenType: 'TOK_PLUS',
                                                lexeme: '+',
                                                line: 4,
                                            },
                                            left: { name: 'i', line: 4 },
                                            right: { value: 1, line: 4 },
                                            line: 4,
                                        },
                                        line: 4,
                                    },
                                ],
                                line: 3,
                            },
                            line: 2,
                        },
                    ],
                    line: 1,
                },
                current: 20,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '0', line: 1 },
                    { tokenType: 'TOK_WHILE', lexeme: 'while', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 2 },
                    { tokenType: 'TOK_LE', lexeme: '<=', line: 2 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 2 },
                    { tokenType: 'TOK_DO', lexeme: 'do', line: 2 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 3 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 3 },
                    { tokenType: 'TOK_STRING', lexeme: '"i = "', line: 3 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 3 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 4 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 4 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 4 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 4 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 4 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 5 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement x := x + y + factorial(5)', () => {
            const current = 0

            const source = 'x := y + z + factorial(5)'
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
                            left: { name: 'x', line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: {
                                    operator: {
                                        tokenType: 'TOK_PLUS',
                                        lexeme: '+',
                                        line: 1,
                                    },
                                    left: { name: 'y', line: 1 },
                                    right: { name: 'z', line: 1 },
                                    line: 1,
                                },
                                right: {
                                    name: 'factorial',
                                    args: [{ value: 5, line: 1 }],
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 10,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'y', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'z', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 1,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement x := x + y + concat("a", "b", "c")', () => {
            const current = 0

            const source = 'x := x + y + concat("a", "b", "c")'
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
                            left: { name: 'x', line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: {
                                    operator: {
                                        tokenType: 'TOK_PLUS',
                                        lexeme: '+',
                                        line: 1,
                                    },
                                    left: { name: 'x', line: 1 },
                                    right: { name: 'y', line: 1 },
                                    line: 1,
                                },
                                right: {
                                    name: 'concat',
                                    args: [
                                        { value: 'a', line: 1 },
                                        { value: 'b', line: 1 },
                                        { value: 'c', line: 1 },
                                    ],
                                    line: 1,
                                },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 14,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'y', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'concat', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"a"', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"b"', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"c"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement x := y + factorial(5, 7, 6) + z', () => {
            const current = 0

            const source = 'x := y + factorial(5, 7, 6) + z'
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
                            left: { name: 'x', line: 1 },
                            right: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: {
                                    operator: {
                                        tokenType: 'TOK_PLUS',
                                        lexeme: '+',
                                        line: 1,
                                    },
                                    left: { name: 'y', line: 1 },
                                    right: {
                                        name: 'factorial',
                                        args: [
                                            { value: 5, line: 1 },
                                            { value: 7, line: 1 },
                                            { value: 6, line: 1 },
                                        ],
                                        line: 1,
                                    },
                                    line: 1,
                                },
                                right: { name: 'z', line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 14,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'y', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 1,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '7', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '6', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'z', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement factorial declaration and call', () => {
            const current = 0

            const source =
                'func factorial(n)\n' +
                'mul := 1\n' +
                'for i := 1, n, 1 do\n' +
                'mul := mul * i\n' +
                'end\n' +
                'println("The factorial of " + n + " is " + mul)\n' +
                'end\n' +
                'factorial(5)'
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
                            name: 'factorial',
                            parameters: [{ name: 'n', line: 1 }],
                            bodyStatements: {
                                statements: [
                                    {
                                        left: { name: 'mul', line: 2 },
                                        right: { value: 1, line: 2 },
                                        line: 2,
                                    },
                                    {
                                        identifier: { name: 'i', line: 3 },
                                        start: { value: 1, line: 3 },
                                        end: { name: 'n', line: 3 },
                                        step: { value: 1, line: 3 },
                                        bodyStatements: {
                                            statements: [
                                                {
                                                    left: {
                                                        name: 'mul',
                                                        line: 4,
                                                    },
                                                    right: {
                                                        operator: {
                                                            tokenType:
                                                                'TOK_STAR',
                                                            lexeme: '*',
                                                            line: 4,
                                                        },
                                                        left: {
                                                            name: 'mul',
                                                            line: 4,
                                                        },
                                                        right: {
                                                            name: 'i',
                                                            line: 4,
                                                        },
                                                        line: 4,
                                                    },
                                                    line: 4,
                                                },
                                            ],
                                            line: 4,
                                        },
                                        line: 3,
                                    },
                                    {
                                        value: {
                                            value: {
                                                operator: {
                                                    tokenType: 'TOK_PLUS',
                                                    lexeme: '+',
                                                    line: 6,
                                                },
                                                left: {
                                                    operator: {
                                                        tokenType: 'TOK_PLUS',
                                                        lexeme: '+',
                                                        line: 6,
                                                    },
                                                    left: {
                                                        operator: {
                                                            tokenType:
                                                                'TOK_PLUS',
                                                            lexeme: '+',
                                                            line: 6,
                                                        },
                                                        left: {
                                                            value: 'The factorial of ',
                                                            line: 6,
                                                        },
                                                        right: {
                                                            name: 'n',
                                                            line: 6,
                                                        },
                                                        line: 6,
                                                    },
                                                    right: {
                                                        value: ' is ',
                                                        line: 6,
                                                    },
                                                    line: 6,
                                                },
                                                right: { name: 'mul', line: 6 },
                                                line: 6,
                                            },
                                            line: 6,
                                        },
                                        line: 6,
                                    },
                                ],
                                line: 2,
                            },
                            line: 1,
                        },
                        {
                            expression: {
                                name: 'factorial',
                                args: [{ value: 5, line: 8 }],
                                line: 8,
                            },
                            line: 8,
                        },
                    ],
                    line: 1,
                },
                current: 38,
                tokens: [
                    { tokenType: 'TOK_FUNC', lexeme: 'func', line: 1 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 1,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'n', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 2 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 2 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 2 },
                    { tokenType: 'TOK_FOR', lexeme: 'for', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 3 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 3 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 3 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'n', line: 3 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 3 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 3 },
                    { tokenType: 'TOK_DO', lexeme: 'do', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 4 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 4 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 4 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 4 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 4 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 5 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 6 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 6 },
                    {
                        tokenType: 'TOK_STRING',
                        lexeme: '"The factorial of "',
                        line: 6,
                    },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 6 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'n', line: 6 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 6 },
                    { tokenType: 'TOK_STRING', lexeme: '" is "', line: 6 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 6 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 6 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 6 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 7 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 8,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 8 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 8 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 8 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse statement factorial(5, 7, 6)', () => {
            const current = 0

            const source = 'factorial(5, 7, 6)'
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
                            expression: {
                                name: 'factorial',
                                args: [
                                    { value: 5, line: 1 },
                                    { value: 7, line: 1 },
                                    { value: 6, line: 1 },
                                ],
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 8,
                tokens: [
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 1,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '7', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '6', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('parse function with return statement', () => {
            const current = 0

            const source =
                'func factorial(n)\n' +
                'mul := 1\n' +
                'for i := 1, n, 1 do\n' +
                'mul := mul * i\n' +
                'end\n' +
                'ret mul\n' +
                'end\n' +
                'println factorial(5)'
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
                            name: 'factorial',
                            parameters: [{ name: 'n', line: 1 }],
                            bodyStatements: {
                                statements: [
                                    {
                                        left: { name: 'mul', line: 2 },
                                        right: { value: 1, line: 2 },
                                        line: 2,
                                    },
                                    {
                                        identifier: { name: 'i', line: 3 },
                                        start: { value: 1, line: 3 },
                                        end: { name: 'n', line: 3 },
                                        step: { value: 1, line: 3 },
                                        bodyStatements: {
                                            statements: [
                                                {
                                                    left: {
                                                        name: 'mul',
                                                        line: 4,
                                                    },
                                                    right: {
                                                        operator: {
                                                            tokenType:
                                                                'TOK_STAR',
                                                            lexeme: '*',
                                                            line: 4,
                                                        },
                                                        left: {
                                                            name: 'mul',
                                                            line: 4,
                                                        },
                                                        right: {
                                                            name: 'i',
                                                            line: 4,
                                                        },
                                                        line: 4,
                                                    },
                                                    line: 4,
                                                },
                                            ],
                                            line: 4,
                                        },
                                        line: 3,
                                    },
                                    {
                                        value: { name: 'mul', line: 6 },
                                        line: 6,
                                    },
                                ],
                                line: 2,
                            },
                            line: 1,
                        },
                        {
                            value: {
                                name: 'factorial',
                                args: [{ value: 5, line: 8 }],
                                line: 8,
                            },
                            line: 8,
                        },
                    ],
                    line: 1,
                },
                current: 31,
                tokens: [
                    { tokenType: 'TOK_FUNC', lexeme: 'func', line: 1 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 1,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'n', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 2 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 2 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 2 },
                    { tokenType: 'TOK_FOR', lexeme: 'for', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 3 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 3 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 3 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'n', line: 3 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 3 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 3 },
                    { tokenType: 'TOK_DO', lexeme: 'do', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 4 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 4 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 4 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 4 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 4 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 5 },
                    { tokenType: 'TOK_RET', lexeme: 'ret', line: 6 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'mul', line: 6 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 7 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 8 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'factorial',
                        line: 8,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 8 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 8 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 8 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
