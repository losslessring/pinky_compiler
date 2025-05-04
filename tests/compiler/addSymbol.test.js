import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { Symbol } from './../../src/compiler/classes/Symbol'
import { addSymbol } from './../../src/compiler/addSymbol'

export const add_symbol_test = () => {
    describe('add symbol', () => {
        it('add symbol', () => {
            const a = new Symbol('a')
            const compiler = new Compiler()

            const result = addSymbol(compiler, a).globals
            const expected = [{ name: 'a', depth: 0, symbolType: 'SYM_VAR' }]
            expect(result).toBe(expected)
        })
    })
}
