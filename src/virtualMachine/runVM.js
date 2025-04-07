import assert from 'assert'
import { VirtualMachine } from './classes/VirtualMachine'
import { OPCODES } from './opcodes'

export function runVM(vm, instructions) {
    assert(
        vm instanceof VirtualMachine,
        `${vm} is not of expected VirtualMachine type`
    )

    vm.programCounter = 0
    vm.stackPointer = 0
    vm.isRunning = true

    while (vm.isRunning === true) {
        const instruction = instructions[vm.programCounter]
        vm.programCounter = vm.programCounter + 1

        const opCode = instruction.command
        const argument =
            instruction.argument === undefined ? '' : instruction.argument

        if (typeof OPCODES[opCode] !== 'function') {
            throw new Error(`Unrecognized VM instruction ${opCode}.`)
        }
        OPCODES[opCode](vm, argument)
    }

    return { vm, instructions }
}
