import assert from 'assert'
import { VirtualMachine } from './classes/VirtualMachine'
import { OPCODES } from './opcodes'
import { createLabelTable } from './createLabelTable'

export function runVM(vm, instructions, vmOptions) {
    assert(
        vm instanceof VirtualMachine,
        `${vm} is not of expected VirtualMachine type`
    )

    vm.programCounter = 0
    vm.stackPointer = 0
    vm.isRunning = true

    createLabelTable(vm, instructions)

    while (vm.isRunning === true) {
        const instruction = instructions[vm.programCounter]

        vm.programCounter = vm.programCounter + 1

        const opCode = instruction.command
        const argument =
            instruction.argument === undefined ? '' : instruction.argument

        if (typeof OPCODES[opCode] !== 'function') {
            throw new Error(`Unrecognized VM instruction ${opCode}.`)
        }
        OPCODES[opCode](vm, argument, vmOptions)
    }

    return { vm, instructions, log: vmOptions?.executionLog?.log }
}
