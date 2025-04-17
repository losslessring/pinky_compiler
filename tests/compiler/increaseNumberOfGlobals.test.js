import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { increaseNumberOfGlobals } from './../../src/compiler/increaseNumberOfGlobals'

export const increase_number_of_globals_test = () => {
    describe('increase number of globals', () => {
        it('increase number of globals', () => {
            const compiler = new Compiler()
            const result = increaseNumberOfGlobals(compiler)
            const expected = {
                code: [],
                globals: [],
                numberOfGlobals: 1,
                labelCounter: 0,
            }
            expect(result).toBe(expected)
        })
    })
}
