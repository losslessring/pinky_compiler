import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { tokenize } from '../../src/lexer/tokenize'
import { parseStatements } from '../../src/parser/parseStatements'
import { generateCode } from '../../src/compiler/generateCode'
import { makeLabel } from './../../src/compiler/makeLabel'

export const make_label_test = () => {
    describe('make label', () => {
        it('make label', () => {
            const compiler = new Compiler()
            const result = makeLabel(compiler, 'LBL')
            const expected = 'LBL1'

            expect(result).toBe(expected)
        })
    })
}
