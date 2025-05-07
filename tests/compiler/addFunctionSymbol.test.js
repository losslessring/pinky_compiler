import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { Symbol } from './../../src/compiler/classes/Symbol'

import { addFunctionSymbol } from './../../src/compiler/addFunctionSymbol'
import { SYMBOL_TYPES } from './../../src/compiler/symbolTypes'

export const add_function_symbol_test = () => {
    describe('add function symbol', () => {
        it('add function symbol', () => {
            const add = new Symbol('add', 0, SYMBOL_TYPES.FUNCTION)
            const compiler = new Compiler()

            const result = addFunctionSymbol(compiler, add).functions
            const expected = [{ name: 'add', depth: 0, symbolType: 'SYM_FUNC' }]
            expect(result).toBe(expected)
        })
    })
}
