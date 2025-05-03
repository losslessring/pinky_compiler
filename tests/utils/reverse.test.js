import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { reverse } from './../../src/utils/reverse'

export const reverse_test = () => {
    describe('reverse array', () => {
        it('reverse array of numbers', () => {
            const array = [4, 5, 6]

            const result = reverse(array)

            const expected = [6, 5, 4]

            expect(result).toBe(expected)
        })

        it('reverse array of numbers and strings', () => {
            const array = ['a', 4, 5, 6, 'b']

            const result = reverse(array)

            const expected = ['b', 6, 5, 4, 'a']

            expect(result).toBe(expected)
        })
    })
}
