import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Boolean } from '../../../src/parser/classes/expressions/Boolean'

export const Boolean_test = () => {
    describe('Boolean', () => {
        it('create new Boolean class from value true', () => {
            const line = 1
            const result = new Boolean(true, line)
            const expected = { value: true, line: 1 }

            expect(result).toBe(expected)
        })

        it('create new Boolean class from value false', () => {
            const line = 1
            const result = new Boolean(false, line)
            const expected = { value: false, line: 1 }

            expect(result).toBe(expected)
        })
        it('fail create new Boolean class from value 0', () => {
            try {
                const line = 1
                new Boolean(0, line)
            } catch (error) {
                const expected = '0 is not of expected boolean type'
                expect(error.message).toBe(expected)
            }
        })
    })
}
