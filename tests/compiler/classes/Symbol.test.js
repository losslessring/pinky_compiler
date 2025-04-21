import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Symbol } from './../../../src/compiler/classes/Symbol'

export const Symbol_test = () => {
    describe('symbol', () => {
        it('create new Symbol class', () => {
            const name = 'x'
            const result = new Symbol(name)
            const expected = { name: 'x', depth: 0 }
            expect(result).toBe(expected)
        })

        it('fail to create new Symbol class from numer type', () => {
            const name = 1
            try {
                const result = new Symbol(name)
            } catch (error) {
                const result = error.message
                const expected = '1 is not of expected String type'
                expect(result).toBe(expected)
            }
        })
    })
}
