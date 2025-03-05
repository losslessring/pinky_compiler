import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { tokenize } from './../../src/lexer/tokenize'
import { whileStatement } from '../../src/parser/whileStatement.js'

export const while_statement_test = () => {
    describe('while statement', () => {
        it('while statement', () => {
            const source =
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

            const result = whileStatement(current, tokens.tokens)

            const expected = {
                node: {
                    test: {
                        operator: {
                            tokenType: 'TOK_LE',
                            lexeme: '<=',
                            line: 1,
                        },
                        left: { name: 'i', line: 1 },
                        right: { value: 10, line: 1 },
                        line: 1,
                    },
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
                                        left: { value: 'i = ', line: 2 },
                                        right: { name: 'i', line: 2 },
                                        line: 2,
                                    },
                                    line: 2,
                                },
                                line: 2,
                            },
                            {
                                left: { name: 'i', line: 3 },
                                right: {
                                    operator: {
                                        tokenType: 'TOK_PLUS',
                                        lexeme: '+',
                                        line: 3,
                                    },
                                    left: { name: 'i', line: 3 },
                                    right: { value: 1, line: 3 },
                                    line: 3,
                                },
                                line: 3,
                            },
                        ],
                        line: 2,
                    },
                    line: 1,
                },
                current: 17,
                tokens: [
                    { tokenType: 'TOK_WHILE', lexeme: 'while', line: 1 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 1 },
                    { tokenType: 'TOK_LE', lexeme: '<=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                    { tokenType: 'TOK_DO', lexeme: 'do', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 2 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 2 },
                    { tokenType: 'TOK_STRING', lexeme: '"i = "', line: 2 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 2 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 2 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 3 },
                    { tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 3 },
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'i', line: 3 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 3 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 3 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 4 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
