import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from './../../src/lexer/tokens'
import { primary } from './../../src/parser/primary'

export const primary_test = () => {
    describe('primary', () => {
        it('primary integer', () => {
            const current = 0
            const tokens = [
                { tokenType: TOKENS.TOK_INTEGER, lexeme: '34', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { value: 34, line: 1 },
                current: 1,
                tokens: [{ tokenType: 'TOK_INTEGER', lexeme: '34', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('primary float', () => {
            const current = 0
            const tokens = [
                { tokenType: TOKENS.TOK_FLOAT, lexeme: '123.456', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { value: 123.456, line: 1 },
                current: 1,
                tokens: [
                    { tokenType: 'TOK_FLOAT', lexeme: '123.456', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('primary (34)', () => {
            const current = 0
            const tokens = [
                { tokenType: TOKENS.TOK_LPAREN, lexeme: '(', line: 1 },
                { tokenType: TOKENS.TOK_INTEGER, lexeme: '34', line: 1 },
                { tokenType: TOKENS.TOK_RPAREN, lexeme: ')', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { value: { value: 34, line: 1 }, line: 1 },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '34', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('primary (34', () => {
            const current = 0
            const tokens = [
                { tokenType: TOKENS.TOK_LPAREN, lexeme: '(', line: 1 },
                { tokenType: TOKENS.TOK_INTEGER, lexeme: '34', line: 1 },
            ]
            try {
                primary(current, tokens)
            } catch (error) {
                const expected = "Line 1 Error: ')' expected."

                expect(error.message).toBe(expected)
            }
        })

        it('primary identifier x', () => {
            const current = 0
            const tokens = [
                { tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { name: 'x', line: 1 },
                current: 1,
                tokens: [{ tokenType: 'TOK_IDENTIFIER', lexeme: 'x', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('primary identifier xyz', () => {
            const current = 0
            const tokens = [
                { tokenType: 'TOK_IDENTIFIER', lexeme: 'xyz', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { name: 'xyz', line: 1 },
                current: 1,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: 'xyz', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('primary identifier _', () => {
            const current = 0
            const tokens = [
                { tokenType: 'TOK_IDENTIFIER', lexeme: '_', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { name: '_', line: 1 },
                current: 1,
                tokens: [{ tokenType: 'TOK_IDENTIFIER', lexeme: '_', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('primary identifier _0', () => {
            const current = 0
            const tokens = [
                { tokenType: 'TOK_IDENTIFIER', lexeme: '_0', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { name: '_0', line: 1 },
                current: 1,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: '_0', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('primary identifier _0_xyz', () => {
            const current = 0
            const tokens = [
                { tokenType: 'TOK_IDENTIFIER', lexeme: '_0_xyz', line: 1 },
            ]
            const result = primary(current, tokens)

            const expected = {
                node: { name: '_0_xyz', line: 1 },
                current: 1,
                tokens: [
                    { tokenType: 'TOK_IDENTIFIER', lexeme: '_0_xyz', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })
    })
}
