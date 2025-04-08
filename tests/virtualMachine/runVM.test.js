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

export const run_VM_test = () => {
    describe('run virtual machine', () => {
        // it('run virtual machine with println 2 + 3', () => {
        //     const source = 'println 2 + 3'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 6,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 2 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 3 },
        //             },
        //             { command: 'ADD' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println 2 + 3 * 5 - 1', () => {
        //     const source = 'println 2 + 3 * 5 - 1'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 10,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 2 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 3 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 5 },
        //             },
        //             { command: 'MUL' },
        //             { command: 'ADD' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'SUB' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println (2 + 3) * 5 - 1', () => {
        //     const source = 'println (2 + 3) * 5 - 1'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 10,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 2 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 3 },
        //             },
        //             { command: 'ADD' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 5 },
        //             },
        //             { command: 'MUL' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'SUB' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println (2 + 3) * 5 - 1 + (4 / 2) ^ 2', () => {
        //     const source = 'println (2 + 3) * 5 - 1 + (4 / 2) ^ 2'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 16,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 2 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 3 },
        //             },
        //             { command: 'ADD' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 5 },
        //             },
        //             { command: 'MUL' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'SUB' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 4 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 2 },
        //             },
        //             { command: 'DIV' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 2 },
        //             },
        //             { command: 'EXP' },
        //             { command: 'ADD' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println 12 % 5', () => {
        //     const source = 'println 12 % 5'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 6,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 12 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 5 },
        //             },
        //             { command: 'MOD' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println true and true println false and false println true and false println false and true', () => {
        //     const source =
        //         'println true and true println false and false println true and false println false and true'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 18,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println 1 and 1 println 0 and 0 println 1 and 0 println 0 and 1', () => {
        //     const source =
        //         'println 1 and 1 println 0 and 0 println 1 and 0 println 0 and 1'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 18,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'AND' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println true or true println false or false println true or false println false or true', () => {
        //     const source =
        //         'println true or true println false or false println true or false println false or true'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 18,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: false },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println 1 or 1 println 0 or 0 println 1 or 0 println 0 or 1', () => {
        //     const source =
        //         'println 1 or 1 println 0 or 0 println 1 or 0 println 0 or 1'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 18,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 0 },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_NUMBER', value: 1 },
        //             },
        //             { command: 'OR' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println ~true', () => {
        //     const source = 'println ~true'
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
        //     // console.dir(ast, { depth: null })
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     const result = runVM(vm, instructions)
        //     const interpretationResult = interpretAST(ast)
        //     const expected = {
        //         vm: {
        //             stack: [],
        //             programCounter: 6,
        //             stackPointer: 0,
        //             isRunning: false,
        //         },
        //         instructions: [
        //             {
        //                 command: 'LABEL',
        //                 argument: { type: 'LABEL', value: 'START' },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             {
        //                 command: 'PUSH',
        //                 argument: { type: 'TYPE_BOOL', value: true },
        //             },
        //             { command: 'XOR' },
        //             { command: 'PRINTLN' },
        //             { command: 'HALT' },
        //         ],
        //     }
        //     expect(result).toBe(expected)
        // })
        // it('run virtual machine with println ~1', () => {
        //     const source = 'println ~1'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     try {
        //         const result = runVM(vm, instructions)
        //     } catch (error) {
        //         expect(error.message).toBe(
        //             'Error on XOR between TYPE_NUMBER and TYPE_BOOL at 3.'
        //         )
        //     }
        // })
        // it('run virtual machine with println ~"false"', () => {
        //     const source = 'println ~"false"'
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
        //     const compiler = new Compiler()
        //     const instructions = generateCode(compiler, ast)
        //     const vm = new VirtualMachine()
        //     try {
        //         const result = runVM(vm, instructions)
        //         // const interpretationResult = interpretAST(ast)
        //     } catch (error) {
        //         expect(error.message).toBe(
        //             'Error on XOR between TYPE_STRING and TYPE_BOOL at 3.'
        //         )
        //     }
        // })
    })
}
