import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../../src/compiler/classes/Compiler'
import { VirtualMachine } from '../../../src/virtualMachine/classes/VirtualMachine'
import { runVM } from '../../../src/virtualMachine/runVM'
import { tokenize } from '../../../src/lexer/tokenize'
import { parseStatements } from '../../../src/parser/parseStatements'
import { generateCode } from '../../../src/compiler/generateCode'
import { interpretAST } from '../../../src/interpreter/interpretAST.js'
import { prettifyVMCode } from '../../../src/utils/prettifyVMCode'
import { createTestVMOptions } from '../../../src/virtualMachine/setup/createTestVMOptions'
import { OPCODES } from './../../../src/virtualMachine/opcodes'
import { Frame } from './../../../src/virtualMachine/classes/Frame'

export const rts_test = () => {
    describe('return from subroutine', () => {
        it('return from subroutine', () => {
            const vm = new VirtualMachine()
            vm.stack = [
                { a: 2 },
                { b: 3 },
                { r: 2 },
                { m: 3 },
                { x: 2 },
                { y: 3 },
                { r: 0 },
                'return_value',
            ]
            const frame0 = new Frame('functionName0', 50, 0)
            const frame1 = new Frame('functionName1', 100, 4)
            vm.frames = [frame0, frame1]
            vm.stackPointer = 8
            OPCODES.RTS(vm)

            const result = vm

            const expected = {
                stack: [{ a: 2 }, { b: 3 }, { r: 2 }, { m: 3 }, 'return_value'],
                frames: [
                    {
                        name: 'functionName0',
                        returnProgramCounter: 50,
                        framePointer: 0,
                    },
                ],
                labels: {},
                globals: {},
                programCounter: 100,
                stackPointer: 5,
                isRunning: false,
            }
            expect(result).toBe(expected)
        })
    })
}
