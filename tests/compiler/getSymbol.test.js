import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { Symbol } from '../../src/compiler/classes/Symbol.js'
import { addSymbol } from './../../src/compiler/addSymbol'
import { getSymbol } from './../../src/compiler/getSymbol'

export const get_symbol_test = () => {
    describe('get symbol', () => {
        it('get symbol a', () => {
            const name = 'a'
            const a = new Symbol(name)
            const compiler = new Compiler()

            addSymbol(compiler, a)

            const result = getSymbol(compiler, name)
            const expected = { name: 'a' }
            expect(result).toBe(expected)
        })

        it('get unexisting symbol b', () => {
            const name = 'a'
            const a = new Symbol(name)
            const compiler = new Compiler()

            addSymbol(compiler, a)

            const result = getSymbol(compiler, 'b')
            const expected = undefined
            expect(result).toBe(expected)
        })
    })
}
