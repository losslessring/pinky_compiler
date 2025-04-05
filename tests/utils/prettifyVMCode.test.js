import { sum } from '../../src/utils/sum.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { prettifyVMCode } from './../../src/utils/prettifyVMCode'

export const prettify_VM_code_test = () => {
    describe('prettify virtual machine code', () => {
        // it('prettify virtual machine code', () => {
        //     const code = [
        //         {
        //             command: 'LABEL',
        //             argument: { type: 'LABEL', value: 'START' },
        //         },
        //         {
        //             command: 'PUSH',
        //             argument: { type: 'TYPE_NUMBER', value: 3 },
        //         },
        //         {
        //             command: 'PUSH',
        //             argument: { type: 'TYPE_NUMBER', value: 5 },
        //         },
        //         { command: 'ADD' },
        //         {
        //             command: 'PUSH',
        //             argument: { type: 'TYPE_NUMBER', value: 6 },
        //         },
        //         {
        //             command: 'PUSH',
        //             argument: { type: 'TYPE_NUMBER', value: 2 },
        //         },
        //         { command: 'MUL' },
        //         { command: 'SUB' },
        //         {
        //             command: 'PUSH',
        //             argument: { type: 'TYPE_NUMBER', value: 3 },
        //         },
        //         { command: 'NEG' },
        //         { command: 'SUB' },
        //         { command: 'PRINTLN' },
        //         { command: 'HALT' },
        //     ]
        //     const result = prettifyVMCode(console.log, code)
        //     const expected = undefined
        //     expect(result).toBe(expected)
        // })
    })
}
