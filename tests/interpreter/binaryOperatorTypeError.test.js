import { TYPES } from '../../src/interpreter/types.js'
import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { binaryOperatorTypeError } from '../../src/interpreter/binaryOperatorTypeError'

export const binary_operator_type_error_test = () => {
    describe('binary operator type error', () => {
        it('binary operator type error', () => {
            try {
                const operator = '+'
                const leftType = TYPES.TYPE_BOOL
                const rightType = TYPES.TYPE_STRING
                const line = 1
                binaryOperatorTypeError(operator, leftType, rightType, line)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '+' between TYPE_BOOL and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })
    })
}
