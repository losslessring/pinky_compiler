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

            const result = addLocalSymbol(compiler, a)
            const expected = {
                code: [],
                locals: [{ name: 'a', depth: 0 }],
                globals: [],
                scopeDepth: 0,
                labelCounter: 0,
            }
            expect(result).toBe(expected)
        })
    })
}
