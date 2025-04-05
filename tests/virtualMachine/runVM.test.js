import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from './../../src/compiler/classes/Compiler'
import { VirtualMachine } from './../../src/virtualMachine/classes/VirtualMachine'
import { runVM } from './../../src/virtualMachine/runVM'
import { tokenize } from './../../src/lexer/tokenize'
import { parseStatements } from './../../src/parser/parseStatements'
import { generateCode } from './../../src/compiler/generateCode'

export const run_VM_test = () => {
    describe('run virtual machine', () => {
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
            const result = runVM(vm, instructions)

            const expected = {
                vm: {
                    stack: [],
                    programCounter: 10,
                    stackPointer: 0,
                    isRunning: false,
                },
                instructions: [
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
            }
            expect(result).toBe(expected)
        })
    })
}
