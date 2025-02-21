import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { tokenize } from './../../src/lexer/tokenize'
import { parseStatements } from './../../src/parser/parseStatements'

export const parse_statements_test = () => {
    describe('parse statements', () => {
        it('parse statement print 1 + 2', () => {
            const current = 0

            const source = 'print 1 + 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const result = parseStatements(current, tokens.tokens)

            const expected = {
                node: {
                    statements: [
                        {
                            value: {
                                operator: {
                                    tokenType: 'TOK_PLUS',
                                    lexeme: '+',
                                    line: 1,
                                },
                                left: { value: 1, line: 1 },
                                right: { value: 2, line: 1 },
                                line: 1,
                            },
                            line: 1,
                        },
                    ],
                    line: 1,
                },
                current: 4,
                tokens: [
                    { tokenType: 'TOK_PRINT', lexeme: 'print', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '1', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '2', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
