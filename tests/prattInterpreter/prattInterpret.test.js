import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { interpret } from './../../src/interpreter/interpret'
import { Integer } from './../../src/parser/classes/expressions/Integer'
import { Float } from './../../src/parser/classes/expressions/Float'
import { Grouping } from './../../src/parser/classes/expressions/Grouping'
import { BinaryOperation } from './../../src/parser/classes/expressions/BinaryOperation'
import { Token } from './../../src/lexer/Token'
import { TOKENS } from './../../src/lexer/tokens'
import { UnaryOperation } from './../../src/parser/classes/expressions/UnaryOperation'
import { tokenize } from './../../src/lexer/tokenize'
import { parse } from './../../src/parser/parse'
import { String_ } from './../../src/parser/classes/expressions/String'
import { Boolean } from './../../src/parser/classes/expressions/Boolean'
import { prattParse } from './../../src/prattParser/prattParse'
import { prattInterpret } from './../../src/prattInterpreter/prattInterpret'

export const pratt_interpret_test = () => {
    describe('interpret pratt parsed expression', () => {
        it('interpret pratt parsed expression 2 * (9 + 13) / 2', () => {
            const source = '2 * (9 + 13) / 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = prattParse(current, tokens.tokens)
            const ast = parsed.node
            // const result = interpret(ast)
            const result = prattInterpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 22 }

            expect(result).toBe(expected)
        })

        it('interpret pratt parsed expression 2 + (8 + 2) / (4 / 3) - 4 * 5 - 2', () => {
            const source = '2 + (8 + 2) / (4 / 3) - 4 * 5 - 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = prattParse(current, tokens.tokens)
            const ast = parsed.node
            // const result = interpret(ast)
            const result = prattInterpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: -12.5 }

            expect(result).toBe(expected)
        })

        it('interpret pratt parsed expression 2 ^ 3 ^ 2', () => {
            const source = '2 ^ 3 ^ 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = prattParse(current, tokens.tokens)
            const ast = parsed.node

            // const result = interpret(ast)
            const result = prattInterpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 512 }

            expect(result).toBe(expected)
        })
    })
}
