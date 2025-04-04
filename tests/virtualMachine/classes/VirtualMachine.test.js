import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { VirtualMachine } from './../../../src/virtualMachine/classes/VirtualMachine'

export const VirtualMachine_test = () => {
    describe('virtual machine', () => {
        it('create new VirtualMachine class', () => {
            const result = new VirtualMachine()
            const expected = { stack: [], programCounter: 0 }

            expect(result).toBe(expected)
        })
    })
}
