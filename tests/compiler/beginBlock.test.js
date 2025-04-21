import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { beginBlock } from '../../src/compiler/beginBlock.js'

export const begin_block_test = () => {
    describe('begin block', () => {
        it('begin block increment scope 1 time', () => {
            let compiler = new Compiler()
            const result = beginBlock(compiler).scopeDepth
            const expected = 1

            expect(result).toBe(expected)
        })

        it('begin block increment scope 3 times', () => {
            let compiler = new Compiler()
            beginBlock(compiler)
            beginBlock(compiler)
            const result = beginBlock(compiler).scopeDepth
            const expected = 3

            expect(result).toBe(expected)
        })
    })
}
