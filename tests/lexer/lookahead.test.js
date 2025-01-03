import { lookahead } from './../../src/lexer/lookahead'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

export const lookahead_test = () => {
    describe('lookahead', () => {
        it('lookahead', () => {
            const array = [5, 7, 1, 2, 4]
            const currentIndex = 1
            const plusCharsAhead = 2
            const result = lookahead(currentIndex, plusCharsAhead, array)

            const expected = 2

            expect(result).toBe(expected)
        })
    })
}
