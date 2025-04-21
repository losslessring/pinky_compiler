import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { endBlock } from '../../src/compiler/endBlock.js'
import { beginBlock } from './../../src/compiler/beginBlock'

export const end_block_test = () => {
    describe('end block', () => {
        it('end block decrement scope 1 time from 0 depth scope', () => {
            let compiler = new Compiler()
            try {
                endBlock(compiler)
            } catch (error) {
                const result = error.message
                const expected =
                    'Scope depth cannot be decreased to less than 0.'
                expect(result).toBe(expected)
            }
        })

        it('begin block decrement scope 1 time', () => {
            let compiler = new Compiler()
            beginBlock(compiler)
            const result = endBlock(compiler).scopeDepth
            const expected = 0

            expect(result).toBe(expected)
        })

        it('begin block decrement scope 3 times', () => {
            let compiler = new Compiler()
            beginBlock(compiler)
            beginBlock(compiler)
            beginBlock(compiler)
            endBlock(compiler)
            endBlock(compiler)
            const result = endBlock(compiler).scopeDepth
            const expected = 0

            expect(result).toBe(expected)
        })
    })
}
