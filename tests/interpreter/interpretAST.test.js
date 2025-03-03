import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { tokenize } from './../../src/lexer/tokenize'
import { interpretAST } from './../../src/interpreter/interpretAST'
import { parseStatements } from './../../src/parser/parseStatements'

export const interpret_AST_test = () => {
    describe('interpret AST', () => {
        it('x := 0 x := x + 1 println(x)', () => {
            const source = 'x := 0 x := x + 1 println(x)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parseStatements(current, tokens.tokens)

            const ast = parsed.node

            const result = interpretAST(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })
    })
}
