import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { TOKENS } from './../../src/lexer/tokens'
import { primary } from './../../src/parser/primary'

export const primary_test = () => {
    describe('primary', () => {
        it('primary', () => {
            const current = 0
            const tokens = [{ tokenType: 'TOK_INTEGER', lexeme: '34', line: 1 }]
            const result = primary(current, tokens)

            const expected = { value: 34 }

            expect(result).toBe(expected)
        })
    })
}
