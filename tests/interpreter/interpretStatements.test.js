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
import { parseStatements } from './../../src/parser/parseStatements'

export const interpret_statements_test = () => {
    describe('interpret statements', () => {
        // it('interpret print 1 + 2 print 3 * 2^2 print("test")', () => {
        //     const source = 'print 1 + 2 print 3 * 2^2 print("test")'
        //     const tokens = tokenize({
        //         source,
        //         current: 0,
        //         start: 0,
        //         line: 1,
        //         tokens: [],
        //     })
        //     const current = 0
        //     const parsed = parseStatements(current, tokens.tokens)
        //     const ast = parsed.node
        //     const result = interpret(ast)
        //     const expected = undefined
        //     expect(result).toBe(expected)
        // })
        // it('interpret print "\n" print 1 + 2 print "\n" print 3 * 2^2 print "\n" print("test")', () => {
        //     const source =
        //         'print "\n" print 1 + 2 print "\n" print 3 * 2^2 print "\n" print("test")'
        //     const tokens = tokenize({
        //         source,
        //         current: 0,
        //         start: 0,
        //         line: 1,
        //         tokens: [],
        //     })
        //     const current = 0
        //     const parsed = parseStatements(current, tokens.tokens)
        //     const ast = parsed.node
        //     const result = interpret(ast)
        //     const expected = undefined
        //     expect(result).toBe(expected)
        // })
        // it('interpret print "\n" print 1 + 2 println 3 * 2^2 println("test") print("This is a test of break\nline.\n")', () => {
        //     const source =
        //         'print "\n" print 1 + 2 println 3 * 2^2 println("test") print("This is a test of break\nline.\n")'
        //     const tokens = tokenize({
        //         source,
        //         current: 0,
        //         start: 0,
        //         line: 1,
        //         tokens: [],
        //     })
        //     const current = 0
        //     const parsed = parseStatements(current, tokens.tokens)
        //     const ast = parsed.node
        //     const result = interpret(ast)
        //     const expected = undefined
        //     expect(result).toBe(expected)
        // })
        // it('interpret println ~(3 ~= 2)', () => {
        //     const source = 'println ~(3 ~= 2)'
        //     const tokens = tokenize({
        //         source,
        //         current: 0,
        //         start: 0,
        //         line: 1,
        //         tokens: [],
        //     })
        //     const current = 0
        //     const parsed = parseStatements(current, tokens.tokens)
        //     const ast = parsed.node
        //     const result = interpret(ast)
        //     const expected = undefined
        //     expect(result).toBe(expected)
        // })

        it('interpret if true then println 1 end', () => {
            const source = 'if true then println 1 end'
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

            const result = interpret(ast)

            const expected = undefined

            expect(result).toBe(expected)
        })
    })
}
