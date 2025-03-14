import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { ifStatement } from './../../src/parser/ifStatement'
import { tokenize } from './../../src/lexer/tokenize'
import { functionDeclaration } from './../../src/parser/functionDeclaration'

export const function_declaration_test = () => {
    describe('function declaration', () => {
        it('factorial', () => {
            const source =
                'func factorial(n)\n' +
                'mul := 1\n' +
                'for i := 1, n, 1 do\n' +
                'mul := mul * i\n' +
                'end\n' +
                'println("The factorial of " + n + " is " + mul)\n' +
                'end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = functionDeclaration(current, tokens.tokens)

            const expected = {
                node: {
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
                                            left: { name: 'mul', line: 4 },
                                            right: {
                                                operator: {
                                                    tokenType: 'TOK_STAR',
                                                    lexeme: '*',
                                                    line: 4,
                                                },
                                                left: { name: 'mul', line: 4 },
                                                right: { name: 'i', line: 4 },
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
                                                    tokenType: 'TOK_PLUS',
                                                    lexeme: '+',
                                                    line: 6,
                                                },
                                                left: {
                                                    value: 'The factorial of ',
                                                    line: 6,
                                                },
                                                right: { name: 'n', line: 6 },
                                                line: 6,
                                            },
                                            right: { value: ' is ', line: 6 },
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
                current: 34,
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
                ],
            }
            expect(result).toBe(expected)
        })

        it('3 parameters a b c', () => {
            const source =
                'func print_abc(a, b, c)\n' + 'println(a + b + c)\n' + 'end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = functionDeclaration(current, tokens.tokens)

            const expected = {
                node: {
                    name: 'print_abc',
                    parameters: [
                        { name: 'a', line: 1 },
                        { name: 'b', line: 1 },
                        { name: 'c', line: 1 },
                    ],
                    bodyStatements: {
                        statements: [
                            {
                                value: {
                                    value: {
                                        operator: {
                                            tokenType: 'TOK_PLUS',
                                            lexeme: '+',
                                            line: 2,
                                        },
                                        left: {
                                            operator: {
                                                tokenType: 'TOK_PLUS',
                                                lexeme: '+',
                                                line: 2,
                                            },
                                            left: { name: 'a', line: 2 },
                                            right: { name: 'b', line: 2 },
                                            line: 2,
                                        },
                                        right: { name: 'c', line: 2 },
                                        line: 2,
                                    },
                                    line: 2,
                                },
                                line: 2,
                            },
                        ],
                        line: 2,
                    },
                    line: 1,
                },
                current: 18,
                tokens: [
                    { tokenType: 'TOK_FUNC', lexeme: 'func', line: 1 },
                    {
                        tokenType: 'TOK_IDENTIFIER',
                        lexeme: 'print_abc',
                        line: 1,
                    },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'a', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'b', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'c', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 2 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'a', line: 2 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'b', line: 2 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'c', line: 2 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 2 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 3 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
