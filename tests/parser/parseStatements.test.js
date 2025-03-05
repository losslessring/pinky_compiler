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
    })
}
