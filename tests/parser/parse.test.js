import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { parse } from './../../src/parser/parse'

export const tokenize_test = () => {
    describe('parse', () => {
        it('parse 2 + 42 * 2 + (47 * -21)', () => {
            const current = 0

            const tokens = [
                { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                { tokenType: 'TOK_INTEGER', lexeme: '42', line: 1 },
                { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                { tokenType: 'TOK_LPAREN', lexeme: '(', line: 1 },
                { tokenType: 'TOK_INTEGER', lexeme: '47', line: 1 },
                { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                { tokenType: 'TOK_INTEGER', lexeme: '21', line: 1 },
                { tokenType: 'TOK_RPAREN', lexeme: ')', line: 1 },
            ]
            parse(current, tokens)

            const expected = []

            expect(result).toBe(expected)
        })
    })
}
