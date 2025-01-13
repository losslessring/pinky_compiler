import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { consumeIdentifier } from '../../src/lexer/consumeIdentifier.js'

export const consumeIdentifier_test = () => {
    describe('consume identifier', () => {
        it('consume identifier _', () => {
            const source = '_'
            const cursor = 0
            const result = consumeIdentifier(cursor, source)

            const expected = 1
            expect(result).toBe(expected)
        })

        it('consume identifier ___', () => {
            const source = '___'
            const cursor = 0
            const result = consumeIdentifier(cursor, source)

            const expected = 3
            expect(result).toBe(expected)
        })

        it('consume identifier _0', () => {
            const source = '_0'
            const cursor = 0
            const result = consumeIdentifier(cursor, source)

            const expected = 2
            expect(result).toBe(expected)
        })

        it('consume identifier _a', () => {
            const source = '_a'
            const cursor = 0
            const result = consumeIdentifier(cursor, source)

            const expected = 2
            expect(result).toBe(expected)
        })

        it('consume identifier _a1b2_c99', () => {
            const source = '_a1b2_c99'
            const cursor = 0
            const result = consumeIdentifier(cursor, source)

            const expected = 9
            expect(result).toBe(expected)
        })

        it('consume identifier g67_3fv', () => {
            const source = 'g67_3fv'
            const cursor = 0
            const result = consumeIdentifier(cursor, source)

            const expected = 7
            expect(result).toBe(expected)
        })
    })
}
