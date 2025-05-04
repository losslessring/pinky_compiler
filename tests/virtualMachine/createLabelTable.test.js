import { createLabelTable } from '../../src/virtualMachine/createLabelTable.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { VirtualMachine } from './../../src/virtualMachine/classes/VirtualMachine'

export const create_label_table_test = () => {
    describe('create label table', () => {
        it('create label table START', () => {
            const vm = new VirtualMachine()
            const instructions = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 2 },
                },
                { command: 'GT' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'XOR' },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_BOOL', value: true },
                },
                { command: 'XOR' },
                { command: 'OR' },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            const result = createLabelTable(vm, instructions)

            const expected = {
                stack: [],
                frames: [],
                labels: { START: 0 },
                programCounter: 0,
                stackPointer: 0,
                isRunning: false,
                globals: {},
            }

            expect(result).toBe(expected)
        })

        it('create label table START', () => {
            const vm = new VirtualMachine()
            const instructions = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                { command: 'GE' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'PUSH',
                    argument: {
                        type: 'TYPE_STRING',
                        value: 'Entered the consequence block.',
                    },
                },
                { command: 'PRINTLN' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'PUSH',
                    argument: {
                        type: 'TYPE_STRING',
                        value: 'Entered the alternative block.',
                    },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Goodbye!' },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            const result = createLabelTable(vm, instructions)

            const expected = {
                stack: [],
                frames: [],
                labels: { START: 0, LBL1: 5, LBL2: 9, LBL3: 12 },
                programCounter: 0,
                stackPointer: 0,
                isRunning: false,
                globals: {},
            }

            expect(result).toBe(expected)
        })

        it('create label table START', () => {
            const vm = new VirtualMachine()
            const instructions = [
                {
                    command: 'LABEL',
                    argument: { type: 'LABEL', value: 'START' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 3 },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_NUMBER', value: 0 },
                },
                { command: 'GE' },
                {
                    command: 'JMPZ',
                    argument: { type: 'TYPE_LABEL', value: 'LBL2' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL1' },
                },
                {
                    command: 'PUSH',
                    argument: {
                        type: 'TYPE_STRING',
                        value: 'Entered the consequence block.',
                    },
                },
                { command: 'PRINTLN' },
                {
                    command: 'JMP',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL' },
                },
                {
                    command: 'PUSH',
                    argument: {
                        type: 'TYPE_STRING',
                        value: 'Entered the alternative block.',
                    },
                },
                { command: 'PRINTLN' },
                {
                    command: 'LABEL',
                    argument: { type: 'TYPE_LABEL', value: 'LBL3' },
                },
                {
                    command: 'PUSH',
                    argument: { type: 'TYPE_STRING', value: 'Goodbye!' },
                },
                { command: 'PRINTLN' },
                { command: 'HALT' },
            ]
            try {
                createLabelTable(vm, instructions)
            } catch (error) {
                const expected =
                    'Missing the LABEL value when creating labels table at 9 instruction.'
                expect(error.message).toBe(expected)
            }
        })
    })
}
