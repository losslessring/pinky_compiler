import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { compile } from '../../src/compiler/compile'
import { tokenize } from './../../src/lexer/tokenize'
import { parseStatements } from './../../src/parser/parseStatements'

export const compile_test = () => {
    describe('compile', () => {
        // it('compile', () => {
        //     const source = 'print 2 + 3 - 1'
        //     const tokens = tokenize({
        //         source,
        //         current: 0,
        //         start: 0,
        //         line: 1,
        //         tokens: [],
        //     })
        //     const current = 0
        //     const parsed = parseStatements(current, tokens.tokens)
        //     const ast = parsed.node
        //     // console.dir(ast, { depth: null })
        //     const compiler = new Compiler()
        //     const result = compile(ast)
        //     const expected = { stack: [], programCounter: 0 }
        //     expect(result).toBe(expected)
        // })
    })
}
