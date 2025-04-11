import { sum } from '../../src/utils/sum.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { prefixInRange } from './../../src/utils/prefixInRange'

export const prefix_in_range_test = () => {
    describe('prefix in range', () => {
        it('prefix in range 00000001', () => {
            const result = prefixInRange('0', 1, 8)

            const expected = '00000001'

            expect(result).toBe(expected)
        })
        it('prefix in range 0000000', () => {
            const result = prefixInRange('0', 4321, 8)

            const expected = '00004321'

            expect(result).toBe(expected)
        })
    })
}
