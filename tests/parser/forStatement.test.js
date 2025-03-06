import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { tokenize } from './../../src/lexer/tokenize'
import { whileStatement } from '../../src/parser/whileStatement.js'
import { forStatement } from './../../src/parser/forStatement'

export const for_statement_test = () => {
    describe('for statement', () => {
        it('for statement with step 2', () => {
            const source =
                'for num := 1, 30, 2 do\n' + 'println("num = " + num)\n' + 'end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0

            const result = forStatement(current, tokens.tokens)

            const expected = {
                node: {
                    identifier: { name: 'num', line: 1 },
                    start: { value: 1, line: 1 },
                    end: { value: 30, line: 1 },
                    step: { value: 2, line: 1 },
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
                                        left: { value: 'num = ', line: 2 },
                                        right: { name: 'num', line: 2 },
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
                current: 16,
                tokens: [
                    { tokenType: 'TOK_FOR', lexeme: 'for', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'num', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '30', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_DO', lexeme: 'do', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 2 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 2 },
                    { tokenType: 'TOK_STRING', lexeme: '"num = "', line: 2 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'num', line: 2 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 2 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 3 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('for statement without step', () => {
            const source =
                'for num := 1, 30 do\n' + 'println("num = " + num)\n' + 'end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0

            const result = forStatement(current, tokens.tokens)

            const expected = {
                node: {
                    identifier: { name: 'num', line: 1 },
                    start: { value: 1, line: 1 },
                    end: { value: 30, line: 1 },
                    step: undefined,
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
                                        left: { value: 'num = ', line: 2 },
                                        right: { name: 'num', line: 2 },
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
                current: 14,
                tokens: [
                    { tokenType: 'TOK_FOR', lexeme: 'for', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'num', line: 1 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '30', line: 1 },
                    { tokenType: 'TOK_DO', lexeme: 'do', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 2 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 2 },
                    { tokenType: 'TOK_STRING', lexeme: '"num = "', line: 2 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'num', line: 2 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 2 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 3 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
