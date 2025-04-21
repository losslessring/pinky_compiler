import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from './../../src/compiler/classes/Compiler'
import { VirtualMachine } from './../../src/virtualMachine/classes/VirtualMachine'
import { runVM } from './../../src/virtualMachine/runVM'
import { tokenize } from './../../src/lexer/tokenize'
import { parseStatements } from './../../src/parser/parseStatements'
import { generateCode } from './../../src/compiler/generateCode'
import { interpretAST } from '../../src/interpreter/interpretAST.js'
import { prettifyVMCode } from './../../src/utils/prettifyVMCode'
import { createTestVMOptions } from './../../src/virtualMachine/setup/createTestVMOptions'

export const run_VM_test = () => {
    describe('run virtual machine', () => {
        const CONSOLE_OUTPUT = true

        const RUN_INTERPRETER = true
        it('run virtual machine with println 2 + 3', () => {
            const source = 'println 2 + 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 6,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['5'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 2 + 3 * 5 - 1', () => {
            const source = 'println 2 + 3 * 5 - 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 10,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'MUL' },
                    { command: 'ADD' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'SUB' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['16'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println (2 + 3) * 5 - 1', () => {
            const source = 'println (2 + 3) * 5 - 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 10,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'MUL' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'SUB' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['24'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with println (2 + 3) * 5 - 1 + (4 / 2) ^ 2', () => {
            const source = 'println (2 + 3) * 5 - 1 + (4 / 2) ^ 2'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 16,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'MUL' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'SUB' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    { command: 'DIV' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    { command: 'EXP' },
                    { command: 'ADD' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['28'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 12 % 5', () => {
            const source = 'println 12 % 5'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 6,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 12 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'MOD' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['2'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println true and true println false and false println true and false println false and true', () => {
            const source =
                'println true and true println false and false println true and false println false and true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 18,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'false', 'false', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 and 1 println 0 and 0 println 1 and 0 println 0 and 1', () => {
            const source =
                'println 1 and 1 println 0 and 0 println 1 and 0 println 0 and 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 18,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'AND' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['1', '0', '0', '0'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println true or true println false or false println true or false println false or true', () => {
            const source =
                'println true or true println false or false println true or false println false or true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 18,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'false', 'true', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 or 1 println 0 or 0 println 1 or 0 println 0 or 1', () => {
            const source =
                'println 1 or 1 println 0 or 0 println 1 or 0 println 0 or 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 18,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 0 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['1', '0', '1', '1'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println ~true', () => {
            const source = 'println ~true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 6,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println ~1', () => {
            const source = 'println ~1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on XOR between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println ~"false"', () => {
            const source = 'println ~"false"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on XOR between TYPE_STRING and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println -10', () => {
            const source = 'println -10'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 5,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 10 },
                    },
                    { command: 'NEG' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['-10'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println -true', () => {
            const source = 'println -true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe('Error on NEG with TYPE_BOOL at 2.')
            }
        })
        it('run virtual machine with println -"false"', () => {
            const source = 'println -"false"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on NEG with TYPE_STRING at 2.'
                )
            }
        })
        it('run virtual machine with println 5 < 4 println 2 < 5 println 3 < 3', () => {
            const source = 'println 5 < 4 println 2 < 5 println 3 < 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 14,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'true', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println "a" < "b" println "aa" < "aaa" println "bb" < "bb" println "bbb" < "BBB" println "B" < "bb"', () => {
            const source =
                'println "a" < "b" println "aa" < "aaa" println "bb" < "bb" println "bbb" < "BBB" println "B" < "bb"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 22,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aa' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aaa' },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bbb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'BBB' },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'B' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'LT' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'true', 'false', 'false', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 < true', () => {
            const source = 'println 1 < true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LT between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println 1 < "abc"', () => {
            const source = 'println 1 < "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LT between TYPE_NUMBER and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true < "abc"', () => {
            const source = 'println true < "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LT between TYPE_BOOL and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true < 1', () => {
            const source = 'println true < 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LT between TYPE_BOOL and TYPE_NUMBER at 3.'
                )
            }
        })
        it('run virtual machine with println 5 > 4 println 2 > 5 println 3 > 3', () => {
            const source = 'println 5 > 4 println 2 > 5 println 3 > 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 14,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'false', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println "a" > "b" println "aa" > "aaa" println "bb" > "bb" println "bbb" > "BBB" println "B" > "bb"', () => {
            const source =
                'println "a" > "b" println "aa" > "aaa" println "bb" > "bb" println "bbb" > "BBB" println "B" > "bb"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 22,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aa' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aaa' },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bbb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'BBB' },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'B' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'GT' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'false', 'false', 'true', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 > true', () => {
            const source = 'println 1 > true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GT between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println 1 > "abc"', () => {
            const source = 'println 1 > "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GT between TYPE_NUMBER and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true > "abc"', () => {
            const source = 'println true > "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GT between TYPE_BOOL and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true > 1', () => {
            const source = 'println true > 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GT between TYPE_BOOL and TYPE_NUMBER at 3.'
                )
            }
        })
        it('run virtual machine with println 5 <= 4 println 2 <= 5 println 3 <= 3', () => {
            const source = 'println 5 <= 4 println 2 <= 5 println 3 <= 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 14,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'true', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println "a" <= "b" println "aa" <= "aaa" println "bb" <= "bb" println "bbb" <= "BBB" println "B" <= "bb"', () => {
            const source =
                'println "a" <= "b" println "aa" <= "aaa" println "bb" <= "bb" println "bbb" <= "BBB" println "B" <= "bb"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 22,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aa' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aaa' },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bbb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'BBB' },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'B' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'LE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'true', 'true', 'false', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 <= true', () => {
            const source = 'println 1 <= true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LE between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println 1 <= "abc"', () => {
            const source = 'println 1 <= "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LE between TYPE_NUMBER and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true <= "abc"', () => {
            const source = 'println true <= "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LE between TYPE_BOOL and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true <= 1', () => {
            const source = 'println true <= 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on LE between TYPE_BOOL and TYPE_NUMBER at 3.'
                )
            }
        })
        it('run virtual machine with println 5 >= 4 println 2 >= 5 println 3 >= 3', () => {
            const source = 'println 5 >= 4 println 2 >= 5 println 3 >= 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 14,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'false', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println "a" >= "b" println "aa" >= "aaa" println "bb" >= "bb" println "bbb" >= "BBB" println "B" >= "bb"', () => {
            const source =
                'println "a" >= "b" println "aa" >= "aaa" println "bb" >= "bb" println "bbb" >= "BBB" println "B" >= "bb"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 22,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aa' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aaa' },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bbb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'BBB' },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'B' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'GE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'false', 'true', 'true', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 >= true', () => {
            const source = 'println 1 >= true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GE between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println 1 >= "abc"', () => {
            const source = 'println 1 >= "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GE between TYPE_NUMBER and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true >= "abc"', () => {
            const source = 'println true >= "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GE between TYPE_BOOL and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true >= 1', () => {
            const source = 'println true >= 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on GE between TYPE_BOOL and TYPE_NUMBER at 3.'
                )
            }
        })
        it('run virtual machine with println 5 == 4 println 2 == 5 println 3 == 3', () => {
            const source = 'println 5 == 4 println 2 == 5 println 3 == 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 14,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'false', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println true == true println true == false println false == true println false == false', () => {
            const source =
                'println true == true println true == false println false == true println false == false'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 18,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'false', 'false', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println "a" == "b" println "aa" == "aaa" println "bb" == "bb" println "bbb" == "BBB" println "B" == "bb"', () => {
            const source =
                'println "a" == "b" println "aa" == "aaa" println "bb" == "bb" println "bbb" == "BBB" println "B" == "bb"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 22,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aa' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aaa' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bbb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'BBB' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'B' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'false', 'true', 'false', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 == true', () => {
            const source = 'println 1 == true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on EQ between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println 1 == "abc"', () => {
            const source = 'println 1 == "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on EQ between TYPE_NUMBER and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true == "abc"', () => {
            const source = 'println true == "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on EQ between TYPE_BOOL and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true == 1', () => {
            const source = 'println true == 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on EQ between TYPE_BOOL and TYPE_NUMBER at 3.'
                )
            }
        })
        it('run virtual machine with println 5 ~= 4 println 2 ~= 5 println 3 ~= 3', () => {
            const source = 'println 5 ~= 4 println 2 ~= 5 println 3 ~= 3'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 14,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 4 },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 3 },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'true', 'false'],
            }

            expect(result).toBe(expected)
        })
        it('run virtual machine with println true ~= true println true ~= false println false ~= true println false ~= false', () => {
            const source =
                'println true ~= true println true ~= false println false ~= true println false ~= false'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 18,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false', 'true', 'true', 'false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println "a" ~= "b" println "aa" ~= "aaa" println "bb" ~= "bb" println "bbb" ~= "BBB" println "B" ~= "bb"', () => {
            const source =
                'println "a" ~= "b" println "aa" ~= "aaa" println "bb" ~= "bb" println "bbb" ~= "BBB" println "B" ~= "bb"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 22,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aa' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'aaa' },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bbb' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'BBB' },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'B' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'bb' },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true', 'true', 'false', 'true', 'true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1 ~= true', () => {
            const source = 'println 1 ~= true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on NE between TYPE_NUMBER and TYPE_BOOL at 3.'
                )
            }
        })
        it('run virtual machine with println 1 ~= "abc"', () => {
            const source = 'println 1 ~= "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on NE between TYPE_NUMBER and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true ~= "abc"', () => {
            const source = 'println true ~= "abc"'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on NE between TYPE_BOOL and TYPE_STRING at 3.'
                )
            }
        })
        it('run virtual machine with println true ~= 1', () => {
            const source = 'println true ~= 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            try {
                const runVMOptions = createTestVMOptions({
                    consoleOutput: CONSOLE_OUTPUT,
                    enableLog: true,
                })

                const result = runVM(vm, instructions, runVMOptions)
            } catch (error) {
                expect(error.message).toBe(
                    'Error on NE between TYPE_BOOL and TYPE_NUMBER at 3.'
                )
            }
        })
        it('run virtual machine with println (2+3) * 5 - 1', () => {
            const source = 'println (2+3) * 5 - 1'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 10,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                        argument: { type: 'TYPE_NUMBER', value: 5 },
                    },
                    { command: 'MUL' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'SUB' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['24'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println true', () => {
            const source = 'println true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 4,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println 1==2', () => {
            const source = 'println 1==2'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 6,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println ~(3 > 2) or true', () => {
            const source = 'println ~(3 > 2) or true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 10,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'XOR' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true'],
            }
            expect(result).toBe(expected)
        })
        it('run virtual machine with println ~(3 > 2) or ~true', () => {
            const source = 'println ~(3 > 2) or ~true'
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()
            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 12,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'XOR' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'XOR' },
                    { command: 'OR' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with if else statements enter the consequence block', () => {
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })

            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined
            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0, LBL1: 5, LBL2: 9, LBL3: 12 },
                    programCounter: 16,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                ],
                log: ['Entered the consequence block.', 'Goodbye!'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with if else statements enter the alternative block', () => {
            const source =
                'if 3 <=0 then\n' +
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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined

            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0, LBL1: 5, LBL2: 9, LBL3: 12 },
                    programCounter: 16,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    { command: 'LE' },
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
                ],
                log: ['Entered the alternative block.', 'Goodbye!'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with println 3 > 2 ~= false', () => {
            const source = 'println 3 > 2 ~= false'

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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined

            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 8,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
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
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: false },
                    },
                    { command: 'NE' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with println "this" == "that"', () => {
            const source = 'println "this" == "that"'

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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined

            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 6,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'this' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'that' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['false'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with println ~(-1>2)', () => {
            const source = 'println ~(-1>2)'

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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined

            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 9,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 1 },
                    },
                    { command: 'NEG' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 2 },
                    },
                    { command: 'GT' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_BOOL', value: true },
                    },
                    { command: 'XOR' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with println "a" + "b" == "ab"', () => {
            const source = 'println "a" + "b" == "ab"'

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
            const instructions = generateCode(compiler, ast)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined

            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    programCounter: 8,
                    stackPointer: 0,
                    isRunning: false,
                    globals: {},
                },
                instructions: [
                    {
                        command: 'LABEL',
                        argument: { type: 'TYPE_LABEL', value: 'START' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'a' },
                    },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'b' },
                    },
                    { command: 'ADD' },
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_STRING', value: 'ab' },
                    },
                    { command: 'EQ' },
                    { command: 'PRINTLN' },
                    { command: 'HALT' },
                ],
                log: ['true'],
            }
            expect(result).toBe(expected)
        })

        it('run virtual machine with global variables', () => {
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
            const instructions = generateCode(compiler, ast)
            // console.log(instructions)
            // prettifyVMCode(console.log, instructions)
            const vm = new VirtualMachine()

            const runVMOptions = createTestVMOptions({
                consoleOutput: CONSOLE_OUTPUT,
                enableLog: true,
            })
            const result = runVM(vm, instructions, runVMOptions)
            const interpretationResult = RUN_INTERPRETER
                ? interpretAST(ast)
                : undefined

            const expected = {
                vm: {
                    stack: [],
                    labels: { START: 0 },
                    globals: {
                        x: { type: 'TYPE_NUMBER', value: 100 },
                        y: { type: 'TYPE_NUMBER', value: 200 },
                        z: { type: 'TYPE_NUMBER', value: 300 },
                        a: { type: 'TYPE_NUMBER', value: 101 },
                    },
                    programCounter: 20,
                    stackPointer: 0,
                    isRunning: false,
                },
                instructions: [
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
                ],
                log: ['100', '200', '300', '101'],
            }

            expect(result).toBe(expected)
        })
    })
}
