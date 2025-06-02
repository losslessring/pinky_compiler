import { Integer } from '../parser/classes/expressions/Integer'
import { Float } from '../parser/classes/expressions/Float'
import { Grouping } from '../parser/classes/expressions/Grouping'
import { BinaryOperation } from '../parser/classes/expressions/BinaryOperation'
import { TOKENS } from '../lexer/tokens'
import { UnaryOperation } from '../parser/classes/expressions/UnaryOperation'
import { TYPES } from '../interpreter/types'
import { String_ } from '../parser/classes/expressions/String'
import { Boolean } from '../parser/classes/expressions/Boolean'
import { binaryOperatorTypeError } from '../interpreter/binaryOperatorTypeError'
import { unaryOperatorTypeError } from '../interpreter/unaryOperatorTypeError'
import { LogicalOperation } from '../parser/classes/expressions/LogicalOperation'
import { Statements } from '../parser/classes/statement/Statements'

export function prattInterpret(node) {
    const { TYPE_NUMBER: NUMBER, TYPE_STRING: STRING, TYPE_BOOL: BOOL } = TYPES

    if (node instanceof Integer) {
        return { type: NUMBER, value: parseFloat(node.value) }
    } else if (node instanceof Float) {
        return { type: NUMBER, value: parseFloat(node.value) }
    } else if (node instanceof String_) {
        return { type: STRING, value: String(node.value) }
    } else if (node instanceof Boolean) {
        return { type: BOOL, value: node.value }
    } else if (node instanceof Grouping) {
        return prattInterpret(node.value)
    } else if (node instanceof BinaryOperation) {
        const lexeme = node.operator.lexeme
        const line = node.operator.line
        const tokenType = node.operator.tokenType

        const { type: leftType, value: leftValue } = prattInterpret(node.left)
        const { type: rightType, value: rightValue } = prattInterpret(
            node.right
        )

        if (tokenType === TOKENS.TOK_PLUS) {
            if (leftType === NUMBER && rightType === NUMBER) {
                return {
                    type: NUMBER,
                    value: leftValue + rightValue,
                }
            } else if (leftType === STRING || rightType === STRING) {
                return {
                    type: STRING,
                    value: String(leftValue).concat(String(rightValue)),
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_MINUS) {
            if (leftType === NUMBER && rightType === NUMBER) {
                return {
                    type: NUMBER,
                    value: leftValue - rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_STAR) {
            if (leftType === NUMBER && rightType === NUMBER) {
                return {
                    type: NUMBER,
                    value: leftValue * rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_SLASH) {
            if (leftType === NUMBER && rightType === NUMBER) {
                if (rightValue === 0) {
                    throw new Error(`Division by zero in line ${line}`)
                }
                return {
                    type: NUMBER,
                    value: leftValue / rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_MOD) {
            if (leftType === NUMBER && rightType === NUMBER) {
                return {
                    type: NUMBER,
                    value: leftValue % rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_CARET) {
            if (leftType === NUMBER && rightType === NUMBER) {
                return {
                    type: NUMBER,
                    value: leftValue ** rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_GT) {
            if (
                (leftType === NUMBER && rightType === NUMBER) ||
                (leftType === STRING && rightType === STRING)
            ) {
                return {
                    type: BOOL,
                    value: leftValue > rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_GE) {
            if (
                (leftType === NUMBER && rightType === NUMBER) ||
                (leftType === STRING && rightType === STRING)
            ) {
                return {
                    type: BOOL,
                    value: leftValue >= rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_LT) {
            if (
                (leftType === NUMBER && rightType === NUMBER) ||
                (leftType === STRING && rightType === STRING)
            ) {
                return {
                    type: BOOL,
                    value: leftValue < rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_LE) {
            if (
                (leftType === NUMBER && rightType === NUMBER) ||
                (leftType === STRING && rightType === STRING)
            ) {
                return {
                    type: BOOL,
                    value: leftValue <= rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_EQEQ) {
            if (
                (leftType === NUMBER && rightType === NUMBER) ||
                (leftType === BOOL && rightType === BOOL) ||
                (leftType === STRING && rightType === STRING)
            ) {
                return {
                    type: BOOL,
                    value: leftValue === rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        } else if (tokenType === TOKENS.TOK_NE) {
            if (
                (leftType === NUMBER && rightType === NUMBER) ||
                (leftType === BOOL && rightType === BOOL) ||
                (leftType === STRING && rightType === STRING)
            ) {
                return {
                    type: BOOL,
                    value: leftValue !== rightValue,
                }
            } else {
                binaryOperatorTypeError(lexeme, leftType, rightType, line)
            }
        }
    } else if (node instanceof UnaryOperation) {
        const lexeme = node.operator.lexeme
        const line = node.operator.line
        const tokenType = node.operator.tokenType

        const { type: operandType, value: operandValue } = prattInterpret(
            node.operand
        )
        if (tokenType === TOKENS.TOK_PLUS) {
            if (operandType === NUMBER) {
                return { type: NUMBER, value: operandValue }
            } else {
                unaryOperatorTypeError(lexeme, operandType, line)
            }
        } else if (tokenType === TOKENS.TOK_MINUS) {
            if (operandType === NUMBER) {
                return { type: NUMBER, value: -operandValue }
            } else {
                unaryOperatorTypeError(lexeme, operandType, line)
            }
        } else if (tokenType === TOKENS.TOK_NOT) {
            if (operandType === BOOL) {
                return { type: BOOL, value: !operandValue }
            } else {
                unaryOperatorTypeError(lexeme, operandType, line)
            }
        }
    } else if (node instanceof LogicalOperation) {
        const lexeme = node.operator.lexeme
        const line = node.operator.line
        const tokenType = node.operator.tokenType

        const { type: leftType, value: leftValue } = prattInterpret(node.left)

        if (tokenType === TOKENS.TOK_OR) {
            if (leftType === BOOL) {
                if (leftValue) {
                    return { type: leftType, value: leftValue }
                }
            } else if (leftType === NUMBER) {
                if (leftValue) {
                    return { type: leftType, value: leftValue }
                }
            } else {
                throw new TypeError(
                    `Unsupported usage of logical operator '${lexeme}' with left ${leftType} in line ${line}.`
                )
            }
        } else if (tokenType === TOKENS.TOK_AND) {
            if (leftType === BOOL) {
                if (!leftValue) {
                    return { type: leftType, value: leftValue }
                }
            } else if (leftType === NUMBER) {
                if (!leftValue) {
                    return { type: leftType, value: leftValue }
                }
            } else {
                throw new TypeError(
                    `Unsupported usage of logical operator '${lexeme}' with left ${leftType} in line ${line}.`
                )
            }
        }
        const { type: rightType, value: rightValue } = prattInterpret(
            node.right
        )

        if (rightType === BOOL) {
            return { type: rightType, value: rightValue }
        } else if (rightType === NUMBER) {
            return { type: rightType, value: rightValue }
        } else {
            throw new TypeError(
                `Unsupported usage of logical operator '${lexeme}' with right ${rightType} in line ${line}.`
            )
        }
    } else if (node instanceof Statements) {
        node.statements.forEach((statement) => {
            prattInterpret(statement)
        })
    }
}
