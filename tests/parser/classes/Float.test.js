import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Float } from './../../../src/parser/classes/expressions/Float'

export const Float_test = () => {
    describe('Float', () => {
        it('create new Float class from value 10.1', () => {
            const result = new Float(10.1)
            const expected = { value: 10.1 }

            expect(result).toBe(expected)
        })

        it('fail create new Float class from value 10.0', () => {
            /*
                The creation of the new Float class from value x.0 should be successful,
                but because Javascript does not make distinction between, for example 10 and 10.0,
                and because primitive types are send to the functions by copying values,
                there is no possibility to check if the value was 10.0 or 10,
                so the creation fails.
              
            */
            try {
                new Float(10.0)
            } catch (error) {
                const expected = 'AssertionError'
                expect(error.name).toBe(expected)
            }
        })

        it('fail create new Float class from value "abc"', () => {
            try {
                new Float('abc')
            } catch (error) {
                const expected = 'AssertionError'
                expect(error.name).toBe(expected)
            }
        })
    })
}
