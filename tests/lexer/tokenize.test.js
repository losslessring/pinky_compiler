import { tokenize } from '../../src/lexer/tokenize.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

export const tokenize_test = () => {
    describe('tokenize', () => {
        it('tokenize +', () => {
            const source = '+'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '+',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_PLUS', lexeme: '+' }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize ++', () => {
            const source = '++'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '++',
                current: 2,
                start: 2,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_PLUS', lexeme: '+' },
                    { tokenType: 'TOK_PLUS', lexeme: '+' },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize --', () => {
            const source = '--'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '--',
                current: 2,
                start: 2,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_MINUS', lexeme: '-' },
                    { tokenType: 'TOK_MINUS', lexeme: '-' },
                ],
            }

            expect(result).toBe(expected)
        })
        it('tokenize +-+-', () => {
            const source = '+-+-'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '+-+-',
                current: 4,
                start: 4,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_PLUS', lexeme: '+' },
                    { tokenType: 'TOK_MINUS', lexeme: '-' },
                    { tokenType: 'TOK_PLUS', lexeme: '+' },
                    { tokenType: 'TOK_MINUS', lexeme: '-' },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize *+-*', () => {
            const source = '*+-*'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '*+-*',
                current: 4,
                start: 4,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_STAR', lexeme: '*' },
                    { tokenType: 'TOK_PLUS', lexeme: '+' },
                    { tokenType: 'TOK_MINUS', lexeme: '-' },
                    { tokenType: 'TOK_STAR', lexeme: '*' },
                ],
            }

            expect(result).toBe(expected)
        })
    })
}
