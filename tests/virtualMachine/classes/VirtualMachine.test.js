import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { VirtualMachine } from './../../../src/virtualMachine/classes/VirtualMachine'

export const VirtualMachine_test = () => {
    describe('virtual machine', () => {
        it('create new VirtualMachine class', () => {
            const result = new VirtualMachine()
            const expected = {
                stack: [],
                labels: {},
                programCounter: 0,
                stackPointer: 0,
                isRunning: false,
            }

            expect(result).toBe(expected)
        })
    })
}
