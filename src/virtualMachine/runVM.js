import assert from 'assert'
import { VirtualMachine } from './classes/VirtualMachine'

export function runVM(vm, instructions) {
    assert(
        vm instanceof VirtualMachine,
        `${vm} is not of expected VirtualMachine type`
    )

    const LABEL = (name) => {}

    vm.programCounter = 0
    vm.stackPointer = 0
    vm.isRunning = true

    while (vm.isRunning === true) {
        const instruction = instructions[vm.programCounter]
        vm.programCounter = vm.programCounter + 1

        const opCode = instruction.command
        const args =
            instruction.argument === undefined ? '' : instruction.argument.value

        console.log(`${opCode} ${args}`)

        if (opCode === 'HALT') {
            vm.isRunning = false
        }
    }

    return { vm, instructions }
}
