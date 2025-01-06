import { lookahead } from './../../src/lexer/lookahead'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { isCharInteger } from '../../src/lexer/isCharInteger'

export const isCharInteger_test = () => {
    describe('is char integer', () => {
        it('is char integer true', () => {
            const index = 1
            const array = ['5', '7', '1', '2', '4']
            const result = isCharInteger(index, array)

            const expected = true

            expect(result).toBe(expected)
        })

        it('is char integer false', () => {
            const index = 1
            const array = ['5', 'a', '1', '2', '4']
            const result = isCharInteger(index, array)

            const expected = false

            expect(result).toBe(expected)
        })
    })
}
