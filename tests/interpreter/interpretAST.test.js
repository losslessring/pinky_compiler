import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { tokenize } from './../../src/lexer/tokenize'
import { interpretAST } from './../../src/interpreter/interpretAST'
import { parseStatements } from './../../src/parser/parseStatements'

export const interpret_AST_test = () => {
    describe('interpret AST', () => {
        it('x := 0 x := x + 1 println("The value of the global x is " + x)', () => {
            const source =
                'x := 0 x := x + 1 println("The value of the global x is " + x)'
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

            const expected = undefined

            expect(result).toBe(expected)
        })

        it('global and local variables', () => {
            const source =
                'x := 0\n' +
                'x := x + 1\n' +
                'println("Global x is " + x)\n' +
                'if 5 ~= 2 then\n' +
                'y := x + 20\n' +
                'println("Local y is " + y)\n' +
                'println("Global x is " + x)\n' +
                'else\n' +
                'println("Error, no local variable y")\n' +
                'x := y\n' +
                'end'
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
            // console.dir(ast, { depth: null })

            const result = interpretAST(ast)

            const expected = undefined

            expect(result).toBe(expected)
        })
    })
}
