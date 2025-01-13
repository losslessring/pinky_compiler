import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { isLetter } from '../../src/lexer/isLetter.js'

export const isLetter_test = () => {
    describe('is letter', () => {
        it('is letter true', () => {
            const char = 'a'
            const result = isLetter(char)
            const expected = true

            expect(result).toBe(expected)
        })

        it('is letter false', () => {
            const char = '%'
            const result = isLetter(char)

            const expected = false

            expect(result).toBe(expected)
        })
    })
}
