import { tokenize } from '../../src/lexer/tokenize.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

export const tokenize_test = () => {
    describe('tokenize', () => {
        it('tokenize +', () => {
            const source = '+'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '+',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_PLUS', lexeme: '+', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize ++', () => {
            const source = '++'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '++',
                current: 2,
                start: 2,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize --', () => {
            const source = '--'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '--',
                current: 2,
                start: 2,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })
        it('tokenize +-+-', () => {
            const source = '+-+-'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '+-+-',
                current: 4,
                start: 4,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize *+-*', () => {
            const source = '*+-*'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '*+-*',
                current: 4,
                start: 4,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_MINUS', lexeme: '-', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize new line', () => {
            const source = '\n'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '\n',
                current: 1,
                start: 1,
                line: 2,
                tokens: [],
            }

            expect(result).toBe(expected)
        })

        it('tokenize empty space', () => {
            const source = ' '
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: ' ',
                current: 1,
                start: 1,
                line: 1,
                tokens: [],
            }

            expect(result).toBe(expected)
        })
        it('tokenize multiple spaces', () => {
            const source = '   '
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '   ',
                current: 3,
                start: 3,
                line: 1,
                tokens: [],
            }

            expect(result).toBe(expected)
        })
        it('tokenize tab character', () => {
            const source = '\t'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '\t',
                current: 1,
                start: 1,
                line: 1,
                tokens: [],
            }

            expect(result).toBe(expected)
        })

        it('tokenize carriage return character', () => {
            const source = '\r'
            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '\r',
                current: 1,
                start: 1,
                line: 1,
                tokens: [],
            }

            expect(result).toBe(expected)
        })
        it('tokenize ignore comment line', () => {
            const source = '# This is a comment\n+'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '# This is a comment\n+',
                current: 21,
                start: 21,
                line: 2,
                tokens: [{ tokenType: 'TOK_PLUS', lexeme: '+', line: 2 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize ==', () => {
            const source = '=='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '==',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_EQ', lexeme: '==', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize == ==', () => {
            const source = '== =='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '== ==',
                current: 5,
                start: 5,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_EQ', lexeme: '==', line: 1 },
                    { tokenType: 'TOK_EQ', lexeme: '==', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize ~', () => {
            const source = '~'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '~',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_NOT', lexeme: '~', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize ~=', () => {
            const source = '~='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '~=',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_NE', lexeme: '~=', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize <', () => {
            const source = '<'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '<',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_LT', lexeme: '<', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize <=', () => {
            const source = '<='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '<=',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_LE', lexeme: '<=', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize >', () => {
            const source = '>'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '>',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_GT', lexeme: '>', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize :', () => {
            const source = ':'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: ':',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_COLON', lexeme: ':', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize :=', () => {
            const source = ':='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: ':=',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_ASSIGN', lexeme: ':=', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize >=', () => {
            const source = '>='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '>=',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_GE', lexeme: '>=', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize *, ; ++<=', () => {
            const source = ' *, ; ++<='

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: ' *, ; ++<=',
                current: 10,
                start: 10,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_COMMA', lexeme: ',', line: 1 },
                    { tokenType: 'TOK_SEMICOLON', lexeme: ';', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_LE', lexeme: '<=', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 0', () => {
            const source = '0'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '0',
                current: 1,
                start: 1,
                line: 1,
                tokens: [{ tokenType: 'TOK_INTEGER', lexeme: '0', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 10', () => {
            const source = '10'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '10',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 102', () => {
            const source = '102'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '102',
                current: 3,
                start: 3,
                line: 1,
                tokens: [{ tokenType: 'TOK_INTEGER', lexeme: '102', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 9985  456    11245', () => {
            const source = '9985  456    11245'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '9985  456    11245',
                current: 18,
                start: 18,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '9985', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '456', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '11245', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 34 + 102 * 76', () => {
            const source = '34 + 102 * 76'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '34 + 102 * 76',
                current: 13,
                start: 13,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '34', line: 1 },
                    { tokenType: 'TOK_PLUS', lexeme: '+', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '102', line: 1 },
                    { tokenType: 'TOK_STAR', lexeme: '*', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '76', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 86.92', () => {
            const source = '86.92'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '86.92',
                current: 5,
                start: 5,
                line: 1,
                tokens: [{ tokenType: 'TOK_FLOAT', lexeme: '86.92', line: 1 }],
            }

            expect(result).toBe(expected)
        })

        it('tokenize 71^38', () => {
            const source = '71^38'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '71^38',
                current: 5,
                start: 5,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_INTEGER', lexeme: '71', line: 1 },
                    { tokenType: 'TOK_CARET', lexeme: '^', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '38', line: 1 },
                ],
            }

            expect(result).toBe(expected)
        })

        it('tokenize ""', () => {
            const source = '""'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '""',
                current: 2,
                start: 2,
                line: 1,
                tokens: [{ tokenType: 'TOK_STRING', lexeme: '""', line: 1 }],
            }
            expect(result).toBe(expected)
        })

        it('tokenize "76hgs28!aj"', () => {
            const source = '"76hgs28!aj"'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '"76hgs28!aj"',
                current: 12,
                start: 12,
                line: 1,
                tokens: [
                    {
                        tokenType: 'TOK_STRING',
                        lexeme: '"76hgs28!aj"',
                        line: 1,
                    },
                ],
            }
            expect(result).toBe(expected)
        })

        it('tokenize "aaa""bbb"', () => {
            const source = '"aaa""bbb"'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '"aaa""bbb"',
                current: 10,
                start: 10,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_STRING', lexeme: '"aaa"', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"bbb"', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it('tokenize "aaa"10"bbb"', () => {
            const source = '"aaa"10"bbb"'

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: '"aaa"10"bbb"',
                current: 12,
                start: 12,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_STRING', lexeme: '"aaa"', line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: '"bbb"', line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })

        it("tokenize 'aaa'10'bbb'", () => {
            const source = "'aaa'10'bbb'"

            const result = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const expected = {
                source: "'aaa'10'bbb'",
                current: 12,
                start: 12,
                line: 1,
                tokens: [
                    { tokenType: 'TOK_STRING', lexeme: "'aaa'", line: 1 },
                    { tokenType: 'TOK_INTEGER', lexeme: '10', line: 1 },
                    { tokenType: 'TOK_STRING', lexeme: "'bbb'", line: 1 },
                ],
            }
            expect(result).toBe(expected)
        })
    })
}
