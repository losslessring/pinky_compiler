import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { tokenize } from './../../../src/lexer/tokenize'
import { interpretAST } from './../../../src/interpreter/interpretAST'
import { parseStatements } from './../../../src/parser/parseStatements'

import fs from 'fs'

export const mandelbrot_test = () => {
    describe('mandelbrot', () => {
        // it('mandelbrot', () => {
        //     const source = fs.readFileSync(
        //         './tests/pinkyPrograms/mandelbrot/mandelbrot.pin',
        //         'utf8'
        //     )
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
        //     const result = interpretAST(ast)
        //     const expected = undefined
        //     expect(result).toBe(expected)
        // })
    })
}
