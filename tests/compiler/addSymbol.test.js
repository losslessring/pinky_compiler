import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { increaseNumberOfGlobals } from './../../src/compiler/increaseNumberOfGlobals'
import { Symbol } from './../../src/compiler/classes/Symbol'
import { addSymbol } from './../../src/compiler/addSymbol'

export const add_symbol_test = () => {
    describe('add symbol', () => {
        it('add symbol', () => {
            const a = new Symbol('a')
            const compiler = new Compiler()

            const result = addSymbol(compiler, a)
            const expected = {
                code: [],
                globals: [{ name: 'a' }],
                numberOfGlobals: 1,
                labelCounter: 0,
            }
            expect(result).toBe(expected)
        })
    })
}
