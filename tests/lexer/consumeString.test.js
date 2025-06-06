import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { consumeString } from '../../src/lexer/consumeString'

export const consumeString_test = () => {
    describe('consume string', () => {
        const line = 1
        it('consume string ""', () => {
            const source = '""'
            const startQuote = '"'
            const cursor = 1

            const result = consumeString(startQuote, cursor, line, source)

            const expected = 2
            expect(result).toBe(expected)
        })

        it('consume string "a"', () => {
            const source = '"a"'
            const startQuote = '"'
            const cursor = 1
            const result = consumeString(startQuote, cursor, line, source)

            const expected = 3
            expect(result).toBe(expected)
        })

        it('consume string "abc"', () => {
            const source = '"abc"'
            const startQuote = '"'
            const cursor = 1
            const result = consumeString(startQuote, cursor, line, source)

            const expected = 5
            expect(result).toBe(expected)
        })

        it('consume string "a1b2c48"', () => {
            const source = '"a1b2c48"'
            const startQuote = '"'
            const cursor = 1
            const result = consumeString(startQuote, cursor, line, source)

            const expected = 9
            expect(result).toBe(expected)
        })

        it("consume string 'n99x7hg5'", () => {
            const source = "'n99x7hg5'"
            const startQuote = "'"
            const cursor = 1
            const result = consumeString(startQuote, cursor, line, source)

            const expected = 10
            expect(result).toBe(expected)
        })

        it("consume string 'Unterminated string", () => {
            const source = "'Unterminated string"
            const startQuote = "'"
            const cursor = 1
            try {
                consumeString(startQuote, cursor, line, source)
            } catch (error) {
                expect(error.message).toBe('Line 1 Unterminated string.')
            }
        })
    })
}
