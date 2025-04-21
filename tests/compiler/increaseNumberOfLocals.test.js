import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { increaseNumberOfLocals } from './../../src/compiler/increaseNumberOfLocals'

export const increase_number_of_locals_test = () => {
    describe('increase number of locals', () => {
        it('increase number of locals', () => {
            const compiler = new Compiler()
            const result = increaseNumberOfLocals(compiler).numberOfLocals
            const expected = 1
            expect(result).toBe(expected)
        })
    })
}
