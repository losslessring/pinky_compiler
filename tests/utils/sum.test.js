import { sum } from '../../src/utils/sum.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

export const sum_test = () => {
    describe('sum', () => {
        it('sum 1+2', () => {
            const result = sum(1, 2)

            const expected = 3

            expect(result).toBe(expected)
        })
    })
}
