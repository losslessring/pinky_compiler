import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from '../../src/lexer/tokens'

import { Token } from '../../src/lexer/Token'
import { expression } from '../../src/parser/expression'
import { modulo } from './../../src/parser/modulo'

export const modulo_test = () => {
    describe('modulo', () => {
        it('modulo 4%3', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '4', 1),
                new Token(TOKENS.TOK_MOD, '%', 1),
                new Token(TOKENS.TOK_INTEGER, '3', 1),
            ]
            const result = modulo(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_MOD', lexeme: '%', line: 1 },
                    left: { value: 4, line: 1 },
                    right: { value: 3, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '4', line: 1 },
                    { tokenType: 'TOK_MOD', lexeme: '%', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '3', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
