import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { ifStatement } from './../../src/parser/ifStatement'
import { tokenize } from './../../src/lexer/tokenize'

export const if_statement_test = () => {
    describe('if statement', () => {
        it('if true then print 1 end', () => {
            const source = 'if true then print 1 end'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const result = ifStatement(current, tokens.tokens)

            const expected = undefined
            expect(result).toBe(expected)
        })
    })
}
