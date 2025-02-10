import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { String } from '../../../src/parser/classes/expressions/String.js'

export const String_test = () => {
    describe('String', () => {
        it('create new Stings class from value "abc"', () => {
            const line = 1
            const result = new String('abc', line)
            const expected = { value: 'abc', line: 1 }

            expect(result).toBe(expected)
        })

        it('fail create new String class from value 1', () => {
            try {
                const line = 1
                new String(1, line)
            } catch (error) {
                const expected = '1 is not of expected string type'
                expect(error.message).toBe(expected)
            }
        })
    })
}
