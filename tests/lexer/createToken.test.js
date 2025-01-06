import { createToken } from '../../src/lexer/createToken.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { TOKENS } from '../../src/lexer/tokens'

export const createToken_test = () => {
    describe('create token', () => {
        it('create token +', () => {
            const result = createToken({
                tokenType: TOKENS.TOK_PLUS,
                source: '+',
                lexemeStart: 0,
                cursor: 1,
                line: 1,
            })

            const expected = { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 }

            expect(result).toBe(expected)
        })
    })
}
