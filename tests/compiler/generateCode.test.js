import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { tokenize } from '../../src/lexer/tokenize'
import { parseStatements } from '../../src/parser/parseStatements'
import { generateCode } from '../../src/compiler/generateCode'
import { prettifyVMCode } from './../../src/utils/prettifyVMCode'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
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

        it('generate code for print 55 * 89.047', () => {
            const source = 'print 55 * 89.047'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 55 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 89.047 },
                },
                { command: 'MUL' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 101 / 76.99', () => {
            const source = 'print 101 / 76.99'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 101 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 76.99 },
                },
                { command: 'DIV' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 ^ 2', () => {
            const source = 'print 3 ^ 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'EXP' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 % 2', () => {
            const source = 'print 3 % 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'MOD' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 < 2', () => {
            const source = 'print 3 < 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'LT' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 > 2', () => {
            const source = 'print 3 > 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'GT' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 <= 2', () => {
            const source = 'print 3 <= 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'LE' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 >= 2', () => {
            const source = 'print 3 >= 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'GE' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 == 2', () => {
            const source = 'print 3 == 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'EQ' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print 3 ~= 2', () => {
            const source = 'print 3 ~= 2'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'NE' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print "abc"', () => {
            const source = 'print "abc"'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'abc' },
                },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print "abc" + "defgh"', () => {
            const source = 'print "abc" + "defgh"'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'abc' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'defgh' },
                },
                { command: 'ADD' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for println 2 + 3 * 4.45 - 2.8 - 1 println true', () => {
            const source = 'println 2 + 3 * 4.45 - 2.8 - 1 \n println true'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 4.45 },
                },
                { command: 'MUL' },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2.8 },
                },
                { command: 'SUB' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'SUB' },
                { command: 'PRINTLN' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print -1', () => {
            const source = 'print -1'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'NEG' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print ~true', () => {
            const source = 'print ~true'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'XOR' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print true and true', () => {
            const source = 'print true and true'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'AND' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for print false or true', () => {
            const source = 'print false or true'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: false },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'OR' },
                { command: 'PRINT' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for println 3 + 5 - 6 * 2 println ~true', () => {
            const source = 'println 3 + 5 - 6 * 2 \n println ~true'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 5 },
                },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 6 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'MUL' },
                { command: 'SUB' },
                { command: 'PRINTLN' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'XOR' },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for println 3 + 5 - 6 * 2 - -3', () => {
            const source = 'println 3 + 5 - 6 * 2 - -3'

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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 5 },
                },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 6 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'MUL' },
                { command: 'SUB' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                { command: 'NEG' },
                { command: 'SUB' },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            expect(result).toBe(expected)
        })

        it('generate code for if else statements if 3 >=0', () => {
            const source =
                'if 3 >=0 then\n' +
                'println "Entered the consequence block."\n' +
                'else\n' +
                'println "Entered the alternative block."\n' +
                'end\n' +
                'println "Goodbye!"'
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                { command: 'GE' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'PUSH',
                    argument: {
                        type: 'TYPE_STRING',
                        value: 'Entered the consequence block.',
                    },
                },
                { command: 'PRINTLN' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'PUSH',
                    argument: {
                        type: 'TYPE_STRING',
                        value: 'Entered the alternative block.',
                    },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Goodbye!' },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            expect(result).toBe(expected)
        })

        it('generate code for global variables', () => {
            const source =
                'x := 100\n' +
                'y := 200\n' +
                'z := 300\n' +
                'println (x)\n' +
                'println (y)\n' +
                'println (z)\n' +
                'a := x + 1\n' +
                'println (a)\n'
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
                    argument: { type: 'TYPE_LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 100 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'x' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 200 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'y' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 300 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'z' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'x' },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'y' },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'z' },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'x' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'ADD' },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'a' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 'a' },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })
    })
}
