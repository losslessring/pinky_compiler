import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Integer } from '../../../src/parser/classes/expressions/Integer.js'

export const Integer_test = () => {
    describe('Integer', () => {
        it('create new Integer class from value 10', () => {
            const result = new Integer(10)
            const expected = { value: 10 }

            expect(result).toBe(expected)
        })

        it('create new Integer class from value 10.0', () => {
            /*
                The creation of the new Integer class from value x.0 should fail,
                but because Javascript does not make distinction between, for example 10 and 10.0,
                and because primitive types are send to the functions by copying values,
                there is no possibility to check if the value was 10.0 or 10,
                so the creation is successful.
              
            */
            const result = new Integer(10.0)
            const expected = { value: 10 }

            expect(result).toBe(expected)
        })

        it('fail create new Integer class from value 10.6', () => {
            try {
                new Integer(10.6)
            } catch (error) {
                const expected = 'AssertionError'
                expect(error.name).toBe(expected)
            }
        })

        it('fail create new Integer class from value "a"', () => {
            try {
                new Integer('a')
            } catch (error) {
                const expected = 'AssertionError'
                expect(error.name).toBe(expected)
            }
        })
    })
}
