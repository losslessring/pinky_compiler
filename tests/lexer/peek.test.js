import { peek } from '../../src/lexer/peek.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

export const peek_test = () => {
    describe('peek', () => {
        it('peek', () => {
            const array = [5]
            const peekIndex = 0
            const result = peek(peekIndex, array)

            const expected = 5

            expect(result).toBe(expected)
        })
    })
}
