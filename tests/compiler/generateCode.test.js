import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { tokenize } from '../../src/lexer/tokenize'
import { parseStatements } from '../../src/parser/parseStatements'
import { generateCode } from '../../src/compiler/generateCode'

export const generate_code_test = () => {
    describe('generate code', () => {
        it('generate code for print 2', () => {
            const source = 'print 2'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]

            expect(result).toBe(expected)
        })

        it('generate code for println 100', () => {
            const source = 'println 100'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 100 },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            expect(result).toBe(expected)
        })

        it('generate code for println 28.16', () => {
            const source = 'println 28.16'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 28.16 },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            expect(result).toBe(expected)
        })

        it('generate code for println 28.16 + 99', () => {
            const source = 'println 28.16 + 99'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 28.16 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 99 },
                },
                { command: 'ADD' },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for println 132 - 0.96', () => {
            const source = 'println 132 - 0.96'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 132 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0.96 },
                },
                { command: 'SUB' },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 2 + 3 - 1', () => {
            const source = 'print 2 + 3 - 1'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'SUB' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print true', () => {
            const source = 'print true'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print false', () => {
            const source = 'print false'

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

            const compiler = new Compiler()
            const result = generateCode(compiler, ast)
            const expected = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: false },
                },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })
    })
}
