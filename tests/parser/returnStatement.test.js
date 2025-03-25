import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { ifStatement } from './../../src/parser/ifStatement'
import { tokenize } from './../../src/lexer/tokenize'
import { returnStatement } from './../../src/parser/returnStatement'

export const return_statement_test = () => {
    describe('return statement', () => {
        it('ret 10', () => {
            const source = 'ret 10'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = returnStatement(current, tokens.tokens)

            const expected = {
                node: { value: { value: 10, line: 1 }, line: 1 },
                current: 2,
                tokens: [
                    { tokenType: 'TOK_RET', lexeme: 'ret', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
