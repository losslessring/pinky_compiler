import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { Symbol } from './../../src/compiler/classes/Symbol'
import { addLocalSymbol } from './../../src/compiler/addLocalSymbol'

export const add_local_symbol_test = () => {
    describe('add local symbol', () => {
        it('add local symbol', () => {
            const a = new Symbol('a')
            const compiler = new Compiler()

            const result = addLocalSymbol(compiler, a).locals
            const expected = [{ name: 'a', depth: 0, symbolType: 'SYM_VAR' }]
            expect(result).toBe(expected)
        })
    })
}
