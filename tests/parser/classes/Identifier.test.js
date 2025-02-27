import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Identifier } from '../../../src/parser/classes/expressions/Identifier'

export const Identifier_test = () => {
    describe('Identifier', () => {
        it('create new Identifier class from name x', () => {
            const line = 1
            const result = new Identifier('x', line)
            const expected = { name: 'x', line: 1 }

            expect(result).toBe(expected)
        })

        it('create new Identifier class from name xyz', () => {
            const line = 1
            const result = new Identifier('xyz', line)
            const expected = { name: 'xyz', line: 1 }

            expect(result).toBe(expected)
        })

        it('fail create new Identifier class from name 0', () => {
            try {
                const line = 1
                new Identifier(0, line)
            } catch (error) {
                const expected = '0 is not of expected string type'
                expect(error.message).toBe(expected)
            }
        })
    })
}
