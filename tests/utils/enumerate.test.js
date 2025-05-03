import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { reverse } from './../../src/utils/reverse'
import { enumerate } from './../../src/utils/enumerate'

export const reverse_test = () => {
    describe('enumerate array', () => {
        it('enumerate array of numbers', () => {
            const array = [4, 5, 6]

            const result = enumerate(array)

            const expected = [
                { element: 4, index: 0 },
                { element: 5, index: 1 },
                { element: 6, index: 2 },
            ]

            expect(result).toBe(expected)
        })
    })
}
