import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { matchTokenType } from './../../../src/parser/utils/matchTokenType'
import { TOKENS } from './../../../src/lexer/tokens'

export const matchTokenType_test = () => {
    describe('match token type', () => {
        it('match token type', () => {
            const tokenType = TOKENS.TOK_PLUS
            const expectedType = TOKENS.TOK_PLUS
            const result = matchTokenType(tokenType, expectedType)

            const expected = true

            expect(result).toBe(expected)
        })

        it('don`t match token type', () => {
            const tokenType = TOKENS.TOK_PLUS
            const expectedType = TOKENS.TOK_MINUS
            const result = matchTokenType(tokenType, expectedType)

            const expected = false

            expect(result).toBe(expected)
        })
    })
}
