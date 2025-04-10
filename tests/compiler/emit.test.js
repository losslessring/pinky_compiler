import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from '../../src/compiler/classes/Compiler'
import { emit } from './../../src/compiler/emit'
import { Float } from './../../src/parser/classes/expressions/Float'

export const emit_test = () => {
    describe('emit', () => {
        it('emit', () => {
            let compiler = new Compiler()
            const line = 1
            const instruction = {
                command: 'PUSH',
                argument: {
                    type: 'TYPE_NUMBER',
                    value: parseFloat(27.872),
                },
            }
            const result = emit(compiler, instruction)
            const expected = {
                code: [
                    {
                        command: 'PUSH',
                        argument: { type: 'TYPE_NUMBER', value: 27.872 },
                    },
                ],
                labelCounter: 0,
            }

            expect(result).toBe(expected)
        })
    })
}
