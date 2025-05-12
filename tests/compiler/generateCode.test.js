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
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 200 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 1 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 300 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 2 },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 1 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 2 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'ADD' },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 3 },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 3 },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('generate code for local variables 0', () => {
            const source =
                'x := 100\n' +
                'y := 200\n' +
                'if x > 0 then\n' +
                'a := 10\n' +
                'b := 20\n' +
                'if x > 1 then\n' +
                'c := 3\n' +
                'if x > 2 then\n' +
                'd := 2 + 3 + 4\n' +
                'println(d)\n' +
                'else\n' +
                'e := 1 + 2 - 4 + (3 - 2)\n' +
                'end\n' +
                'end\n' +
                'end\n'
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
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 200 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 1 },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                { command: 'GT' },
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
                    argument: { type: 'TYPE_NUMBER', value: 10 },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '0 (a)' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 20 },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '1 (b)' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'GT' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL5' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL4' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '2 (c)' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'GT' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL8' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL7' },
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
                    argument: { type: 'TYPE_NUMBER', value: 4 },
                },
                { command: 'ADD' },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '3 (d)' },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 3 },
                },
                { command: 'PRINTLN' },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL9' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL8' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 4 },
                },
                { command: 'SUB' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'SUB' },
                { command: 'ADD' },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '3 (e)' },
                },
                { command: 'POP' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL9' },
                },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL6' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL5' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL6' },
                },
                { command: 'POP' },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('generate code for local variables 1', () => {
            const source =
                'x := 100\n' +
                'y := 200\n' +
                'if x > 0 then\n' +
                'a := 10\n' +
                'b := 20\n' +
                'if x > 1 then\n' +
                'c := 3\n' +
                'a := c + 2\n' +
                'println(a)\n' +
                'println(c)\n' +
                'if x > 2 then\n' +
                'd := 2 + b + a\n' +
                'println(d)\n' +
                'else\n' +
                'c := 0\n' +
                'e := 1 + c - 4 + (a - 2)\n' +
                'end\n' +
                'end\n' +
                'end\n'
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
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 200 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 1 },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                { command: 'GT' },
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
                    argument: { type: 'TYPE_NUMBER', value: 10 },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '0 (a)' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 20 },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '1 (b)' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'GT' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL5' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL4' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '2 (c)' },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 2 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'ADD' },
                {
                    command: 'STORE_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 0 },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 0 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 2 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'GT' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL8' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL7' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 1 },
                },
                { command: 'ADD' },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 0 },
                },
                { command: 'ADD' },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '3 (d)' },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 3 },
                },
                { command: 'PRINTLN' },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL9' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL8' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                {
                    command: 'STORE_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 2 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 2 },
                },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 4 },
                },
                { command: 'SUB' },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'SUB' },
                { command: 'ADD' },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '3 (e)' },
                },
                { command: 'POP' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL9' },
                },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL6' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL5' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL6' },
                },
                { command: 'POP' },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('generate code for a while loop', () => {
            const source =
                'i := 1\n' +
                'while i <= 10 do\n' +
                'res := 2 * i\n' +
                'println("2*" + i + " = " + res)\n' +
                'i := i + 1\n' +
                'end\n'
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
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 10 },
                },
                { command: 'LE' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                { command: 'MUL' },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '0 (res)' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: '2*' },
                },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                { command: 'ADD' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: ' = ' },
                },
                { command: 'ADD' },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 0 },
                },
                { command: 'ADD' },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                { command: 'ADD' },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                { command: 'POP' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('generate code for a procedure 0', () => {
            const source =
                'x := 0\n' +
                'func say()\n' +
                'println "Hello!"\n' +
                'end\n' +
                'say()'
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
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'say' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Hello!' },
                },
                { command: 'PRINTLN' },
                { command: 'RTS' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'JSR',
                    argument: { type: 'TYPE_LABEL', value: 'say' },
                },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('generate code for a procedure 1', () => {
            const source =
                'x := 0\n' +
                'func say()\n' +
                'println "Hello1!"\n' +
                'println "Hello2!"\n' +
                'println "Hello3!"\n' +
                'end\n' +
                'say()\n' +
                'println "After the call"'
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
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'say' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Hello1!' },
                },
                { command: 'PRINTLN' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Hello2!' },
                },
                { command: 'PRINTLN' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Hello3!' },
                },
                { command: 'PRINTLN' },
                { command: 'RTS' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'JSR',
                    argument: { type: 'TYPE_LABEL', value: 'say' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'After the call' },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('generate code for a procedure with arguments 0', () => {
            const source =
                'x := 5\n' +
                'func say(a, b, c)\n' +
                'println a\n' +
                'println b\n' +
                'println c\n' +
                'end\n' +
                'say("a", "b", 1 + 2 + x)\n' +
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
                    argument: { type: 'TYPE_NUMBER', value: 5 },
                },
                {
                    command: 'STORE_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'say' },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '0 (a)' },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '1 (b)' },
                },
                {
                    command: 'SET_SLOT',
                    argument: { type: 'TYPE_STACK_SLOT', value: '2 (c)' },
                },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 0 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 1 },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LOAD_LOCAL',
                    argument: { type: 'TYPE_STACK_SLOT', value: 2 },
                },
                { command: 'PRINTLN' },
                { command: 'POP' },
                { command: 'POP' },
                { command: 'POP' },
                { command: 'RTS' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'a' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'b' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 1 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'ADD' },
                {
                    command: 'LOAD_GLOBAL',
                    argument: { type: 'TYPE_SYMBOL', value: 0 },
                },
                { command: 'ADD' },
                {
                    command: 'JSR',
                    argument: { type: 'TYPE_LABEL', value: 'say' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Goodbye!' },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]

            // prettifyVMCode(console.log, result)
            expect(result).toBe(expected)
        })

        it('fail to call a procedure with 2 arguments instead of 3', () => {
            const source =
                'x := 5\n' +
                'func say(a, b, c)\n' +
                'println a\n' +
                'println b\n' +
                'println c\n' +
                'end\n' +
                'say("a", "b")\n' +
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
            try {
                const result = generateCode(compiler, ast)
            } catch (error) {
                const result = error.message
                const expected =
                    'Function say was expecting 3 arguments but 2 arguments were passed in line 7.'
                expect(result).toBe(expected)
            }
        })

        it('fail to call a undeclared procedure', () => {
            const source =
                'x := 5\n' +
                'func say(a, b, c)\n' +
                'println a\n' +
                'println b\n' +
                'println c\n' +
                'end\n' +
                'say1("a", "b")\n' +
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
            try {
                const result = generateCode(compiler, ast)
            } catch (error) {
                const result = error.message
                const expected =
                    'Function declaration with the name say1 was not found in line 7.'
                expect(result).toBe(expected)
            }
        })
    })
}
