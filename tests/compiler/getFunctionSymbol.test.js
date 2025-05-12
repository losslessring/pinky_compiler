import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { Symbol } from '../../src/compiler/classes/Symbol.js'
import { addFunctionSymbol } from './../../src/compiler/addFunctionSymbol'
import { SYMBOL_TYPES } from './../../src/compiler/symbolTypes'
import { getFunctionSymbol } from './../../src/compiler/getFunctionSymbol'

export const get_function_symbol_test = () => {
    describe('get function symbol', () => {
        it('get function symbol add', () => {
            const name = 'add'
            const add = new Symbol(name, 0, SYMBOL_TYPES.FUNCTION)
            const compiler = new Compiler()

            addFunctionSymbol(compiler, add)

            const result = getFunctionSymbol(compiler, name)
            const expected = {
                name: 'add',
                depth: 0,
                symbolType: 'SYM_FUNC',
                arity: 0,
            }
            expect(result).toBe(expected)
        })

        it('get unexisting function symbol b', () => {
            const compiler = new Compiler()

            const result = getFunctionSymbol(compiler, 'b')
            const expected = undefined
            expect(result).toBe(expected)
        })
    })
}
