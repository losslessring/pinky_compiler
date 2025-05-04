import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Frame } from './../../../src/virtualMachine/classes/Frame'

export const Frame_test = () => {
    describe('frame', () => {
        it('create new Frame class', () => {
            const result = new Frame(100, 1)
            const expected = {
                returnProgramCounter: 100,
                framePointer: 1,
            }

            expect(result).toBe(expected)
        })
    })
}
