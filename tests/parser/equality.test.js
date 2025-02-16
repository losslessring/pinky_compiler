import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { TOKENS } from '../../src/lexer/tokens'
import { Token } from '../../src/lexer/Token'
import { equality } from './../../src/parser/equality'

export const equality_test = () => {
    describe('equality', () => {
        it('equality 2==2', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_EQEQ, '==', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = equality(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_EQEQ', lexeme: '==', line: 1 },
                    left: { value: 2, line: 1 },
                    right: { value: 1, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_EQEQ', lexeme: '==', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('equality 2~=2', () => {
            const current = 0
            const tokens = [
                new Token(TOKENS.TOK_INTEGER, '2', 1),
                new Token(TOKENS.TOK_NE, '~=', 1),
                new Token(TOKENS.TOK_INTEGER, '1', 1),
            ]
            const result = equality(current, tokens)

            const expected = {
                node: {
                    operator: { tokenType: 'TOK_NE', lexeme: '~=', line: 1 },
                    left: { value: 2, line: 1 },
                    right: { value: 1, line: 1 },
                    line: 1,
                },
                current: 3,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                    { tokenType: 'TOK_NE', lexeme: '~=', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
