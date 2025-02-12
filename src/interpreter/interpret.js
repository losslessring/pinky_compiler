import { Integer } from './../parser/classes/expressions/Integer'
import { Float } from './../parser/classes/expressions/Float'
import { Grouping } from './../parser/classes/expressions/Grouping'
import { BinaryOperation } from './../parser/classes/expressions/BinaryOperation'
import { TOKENS } from './../lexer/tokens'
import { UnaryOperation } from './../parser/classes/expressions/UnaryOperation'
import { TYPES } from './types'
import { String_ } from '../parser/classes/expressions/String'
import { Boolean } from './../parser/classes/expressions/Boolean'
import { binaryOperatorTypeError } from './binaryOperatorTypeError'

export function interpret(node) {
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
        return interpret(node.value)
    } else if (node instanceof BinaryOperation) {
        const lexeme = node.operator.lexeme
        const line = node.operator.line
        const tokenType = node.operator.tokenType

        const { type: leftType, value: leftValue } = interpret(node.left)
        const { type: rightType, value: rightValue } = interpret(node.right)

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
            return { type: NUMBER, value: leftValue * rightValue }
        } else if (tokenType === TOKENS.TOK_SLASH) {
            return { type: NUMBER, value: leftValue / rightValue }
        }
    } else if (node instanceof UnaryOperation) {
        const { type: operandType, value: operandValue } = interpret(
            node.operand
        )
        if (node.operator.tokenType === TOKENS.TOK_PLUS) {
            return { type: NUMBER, value: +operandValue }
        } else if (node.operator.tokenType === TOKENS.TOK_MINUS) {
            return { type: NUMBER, value: -operandValue }
        }
    }
}
