import { Compiler } from '../../../src/compiler/classes/Compiler.js'
import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'

export const Compiler_test = () => {
    describe('compiler', () => {
        it('create new Compiler class', () => {
            const result = new Compiler()
            const expected = { code: [] }
            expect(result).toBe(expected)
        })
    })
}
