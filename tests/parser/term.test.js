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
    })
}
