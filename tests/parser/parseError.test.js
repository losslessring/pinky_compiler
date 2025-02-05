import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { parseError } from './../../src/parser/parseError'

export const parse_error = () => {
    describe('parse error', () => {
        it('parse error', () => {
            try {
                parseError('Some error', 1)
            } catch (error) {
                const result = error.message
                const expected = 'Line 1 Some error'
                expect(result).toBe(expected)
            }
        })
    })
}
