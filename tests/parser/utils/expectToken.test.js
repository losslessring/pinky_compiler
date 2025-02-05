import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'

import { TOKENS } from './../../../src/lexer/tokens'
import { expectToken } from './../../../src/parser/utils/expectToken'

export const expect_token_test = () => {
    describe('expect token', () => {
        it('expected token match', () => {
            const tokenType = TOKENS.TOK_PLUS
            const expectedType = TOKENS.TOK_PLUS
            const lineNumber = 1
            const result = expectToken(tokenType, expectedType, lineNumber)

            const expected = true

            expect(result).toBe(expected)
        })

        it('expected token don`t match', () => {
            const tokenType = TOKENS.TOK_PLUS
            const expectedType = TOKENS.TOK_MINUS
            const lineNumber = 1
            try {
                expectToken(tokenType, expectedType, lineNumber)
            } catch (error) {
                const expected = 'Line 1 expected TOK_MINUS, found TOK_PLUS'
                expect(error.message).toBe(expected)
            }
        })
    })
}
