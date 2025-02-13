import { TYPES } from '../../src/interpreter/types.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { unaryOperatorTypeError } from './../../src/interpreter/unaryOperatorTypeError'

export const unary_operator_type_error_test = () => {
    describe('binary operator type error', () => {
        it('binary operator type error', () => {
            try {
                const operator = '+'

                const operandType = TYPES.TYPE_STRING
                const line = 1

                unaryOperatorTypeError(operator, operandType, line)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '+' with TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })
    })
}
