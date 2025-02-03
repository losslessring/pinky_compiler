import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from './../../src/lexer/tokens'
import { term } from './../../src/parser/term'
import { Token } from './../../src/lexer/Token'

export const term_test = () => {
    describe('term', () => {
        it('term 2*3', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '3', 1),
            ]
            const result = term(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    left: { value: 2 },
                    right: { value: 3 },
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('term 2*3*5', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '3', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '5', 1),
            ]
            const result = term(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    left: { value: 2 },
                    right: {
                        operator: {
                            tokenType: 'TOK_STAR',
                            lexeme: '*',
                            line: 1,
                        },
                        left: { value: 3 },
                        right: { value: 5 },
                    },
                },
                current: 5,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                ],
            }

            // const ast = {
            //     node: {
            //         operator: { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
            //         left: {
            //             operator: {
            //                 tokenType: 'TOK_STAR',
            //                 lexeme: '*',
            //                 line: 1,
            //             },
            //             left: { value: 2 },
            //             right: { value: 3 },
            //         },
            //         right: { value: 5 },
            //     },
            //     current: 5,
            //     tokens: [
            //         { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
            //         { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
            //         { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
            //         { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
            //         { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
            //     ],
            // }
            expect(result).toBe(expected)
        })

        it('term 2/10', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_SLASH, '/', 1),
                new Token(TOKENS.TOK_INTEGER, '10', 1),
            ]
            const result = term(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_SLASH', lexeme: '/', line: 1 },
                    left: { value: 2 },
                    right: { value: 10 },
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_SLASH', lexeme: '/', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('term 3*(10*5)', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '3', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_LPAREN, '(', 1),
                new Token(TOKENS.TOK_INTEGER, '10', 1),
                new Token(TOKENS.TOK_STAR, '*', 1),
                new Token(TOKENS.TOK_INTEGER, '5', 1),
                new Token(TOKENS.TOK_RPAREN, ')', 1),
            ]
            const result = term(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    left: { value: 3 },
                    right: {
                        value: {
                            operator: {
                                tokenType: 'TOK_STAR',
                                lexeme: '*',
                                line: 1,
                            },
                            left: { value: 10 },
                            right: { value: 5 },
                        },
                    },
                },
                current: 7,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '5', line: 1 },
                    { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
