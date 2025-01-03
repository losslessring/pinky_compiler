import { match } from '../../src/lexer/match.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

export const match_test = () => {
    describe('match', () => {
        it('value match', () => {
            const array = [5, 6, 2, 9, 4, 1]
            const currentIndex = 1
            const expectedValue = 6
            const result = match(currentIndex, expectedValue, array)

            const expected = {
                match: true,
                current: 2,
            }

            expect(result).toBe(expected)
        })

        it('value does not match', () => {
            const array = ['a', 'k', 'g', 'r', 'q']
            const currentIndex = 2
            const expectedValue = 'q'
            const result = match(currentIndex, expectedValue, array)

            const expected = false

            expect(result).toBe(expected)
        })
    })
}
