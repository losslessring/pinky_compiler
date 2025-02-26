import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { ifStatement } from './../../src/parser/ifStatement'
import { tokenize } from './../../src/lexer/tokenize'

export const if_statement_test = () => {
    describe('if statement', () => {
        it('if true then print 1 end', () => {
            const source = 'if true then print 1 end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = ifStatement(current, tokens.tokens)

            const expected = {
                node: {
                    test: { value: true, line: 1 },
                    thenStatements: {
                        statements: [{ value: { value: 1, line: 1 }, line: 1 }],
                        line: 1,
                    },
                    elseStatements: undefined,
                    line: 1,
                },
                current: 6,
                tokens: [
                    { tokenType: 'TOK_IF', lexeme: 'if', line: 1 },
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                    { tokenType: 'TOK_THEN', lexeme: 'then', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('if true then print 1 else print 2 end', () => {
            const source = 'if true then print 1 else print 2 end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = ifStatement(current, tokens.tokens)

            const expected = {
                node: {
                    test: { value: true, line: 1 },
                    thenStatements: {
                        statements: [{ value: { value: 1, line: 1 }, line: 1 }],
                        line: 1,
                    },
                    elseStatements: {
                        statements: [{ value: { value: 2, line: 1 }, line: 1 }],
                        line: 1,
                    },
                    line: 1,
                },
                current: 9,
                tokens: [
                    { tokenType: 'TOK_IF', lexeme: 'if', line: 1 },
                    { tokenType: 'TOK_TRUE', lexeme: 'true', line: 1 },
                    { tokenType: 'TOK_THEN', lexeme: 'then', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_ELSE', lexeme: 'else', line: 1 },
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('if 5 > 2 then println("a") else println("b") end', () => {
            const source = 'if 5 > 2 then println("a") else println("b") end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = ifStatement(current, tokens.tokens)

            const expected = {
                node: {
                    test: {
                        operator: { tokenType: 'TOK_GT', lexeme: '>', line: 1 },
                        left: { value: 5, line: 1 },
                        right: { value: 2, line: 1 },
                        line: 1,
                    },
                    thenStatements: {
                        statements: [
                            {
                                value: {
                                    value: { value: 'a', line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                        ],
                        line: 1,
                    },
                    elseStatements: {
                        statements: [
                            {
                                value: {
                                    value: { value: 'b', line: 1 },
                                    line: 1,
                                },
                                line: 1,
                            },
                        ],
                        line: 1,
                    },
                    line: 1,
                },
                current: 15,
                tokens: [
                    { tokenType: 'TOK_IF', lexeme: 'if', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_GT', lexeme: '>', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_THEN', lexeme: 'then', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"a"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_ELSE', lexeme: 'else', line: 1 },
                    { tokenType: 'TOK_PRINTLN', lexeme: 'println', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"b"', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                    { tokenType: 'TOK_END', lexeme: 'end', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('if 5 > 2 println("a")', () => {
            const source = 'if 5 > 2 println("a")'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            try {
                ifStatement(current, tokens.tokens)
            } catch (error) {
                const expected = 'Line 1 expected TOK_THEN, found TOK_PRINTLN'
                expect(error.message).toBe(expected)
            }
        })

        it('if 5 > 2 then println("a") else println("b")', () => {
            const source = 'if 5 > 2 then println("a") else println("b")'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            try {
                ifStatement(current, tokens.tokens)
            } catch (error) {
                const expected =
                    'Tried to parse out of token bounds in else statements'
                expect(error.message).toBe(expected)
            }
        })
    })
}
