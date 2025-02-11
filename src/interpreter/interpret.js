import { Integer } from './../parser/classes/expressions/Integer'
import { Float } from './../parser/classes/expressions/Float'
import { Grouping } from './../parser/classes/expressions/Grouping'
import { BinaryOperation } from './../parser/classes/expressions/BinaryOperation'
import { TOKENS } from './../lexer/tokens'
import { UnaryOperation } from './../parser/classes/expressions/UnaryOperation'
import { TYPES } from './types'
import { String_ } from '../parser/classes/expressions/String'

export function interpret(node) {
    const { TYPE_NUMBER, TYPE_STRING, TYPE_BOOL } = TYPES

    if (node instanceof Integer) {
        return { type: TYPE_NUMBER, value: parseFloat(node.value) }
    } else if (node instanceof Float) {
        return { type: TYPE_NUMBER, value: parseFloat(node.value) }
    } else if (node instanceof String_) {
        return { type: TYPE_STRING, value: String(node.value) }
    } else if (node instanceof Grouping) {
        return interpret(node.value)
    } else if (node instanceof BinaryOperation) {
        const { type: leftType, value: leftValue } = interpret(node.left)
        const { type: rightType, value: rightValue } = interpret(node.right)

        if (node.operator.tokenType === TOKENS.TOK_PLUS) {
            if (leftType === TYPE_NUMBER && rightType === TYPE_NUMBER) {
                return {
                    type: TYPE_NUMBER,
                    value: leftValue + rightValue,
                }
            } else if (leftType === TYPE_STRING || rightType === TYPE_STRING) {
                return {
                    type: TYPE_STRING,
                    value: String(leftValue).concat(String(rightValue)),
                }
            } else {
                throw new Error(
                    `Unsupported operator ${node.operator.lexeme} between ${leftType} and ${rightType} in line ${node.operator.line}.`
                )
            }
        } else if (node.operator.tokenType === TOKENS.TOK_MINUS) {
            return { type: TYPE_NUMBER, value: leftValue - rightValue }
        } else if (node.operator.tokenType === TOKENS.TOK_STAR) {
            return { type: TYPE_NUMBER, value: leftValue * rightValue }
        } else if (node.operator.tokenType === TOKENS.TOK_SLASH) {
            return { type: TYPE_NUMBER, value: leftValue / rightValue }
        }
    } else if (node instanceof UnaryOperation) {
        const { type: operandType, value: operandValue } = interpret(
            node.operand
        )
        if (node.operator.tokenType === TOKENS.TOK_PLUS) {
            return { type: TYPE_NUMBER, value: +operandValue }
        } else if (node.operator.tokenType === TOKENS.TOK_MINUS) {
            return { type: TYPE_NUMBER, value: -operandValue }
        }
    }
}
