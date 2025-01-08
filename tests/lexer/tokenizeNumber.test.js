import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { tokenizeNumber } from '../../src/lexer/tokenizeNumber'

export const tokenizeNumber_test = () => {
    describe('tokenize number', () => {
        it('tokenize number 1', () => {
            const source = '1'
            const cursor = 0
            const result = tokenizeNumber(cursor, source)

            const expected = { cursor: 1, tokenType: 'TOK_INTEGER' }
            expect(result).toBe(expected)
        })

        it('tokenize number 23361', () => {
            const source = '23361'
            const cursor = 0
            const result = tokenizeNumber(cursor, source)

            const expected = { cursor: 5, tokenType: 'TOK_INTEGER' }
            expect(result).toBe(expected)
        })

        it('tokenize number 729.281', () => {
            const source = '729.281'
            const cursor = 0
            const result = tokenizeNumber(cursor, source)

            const expected = { cursor: 7, tokenType: 'TOK_FLOAT' }
            expect(result).toBe(expected)
        })
    })
}
