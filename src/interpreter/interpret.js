import { Integer } from './../parser/classes/expressions/Integer'
import { Float } from './../parser/classes/expressions/Float'
import { Grouping } from './../parser/classes/expressions/Grouping'
import { BinaryOperation } from './../parser/classes/expressions/BinaryOperation'
import { TOKENS } from './../lexer/tokens'
import { UnaryOperation } from './../parser/classes/expressions/UnaryOperation'

export function interpret(node) {
    if (node instanceof Integer) {
        return parseFloat(node.value)
    } else if (node instanceof Float) {
        return parseFloat(node.value)
    } else if (node instanceof Grouping) {
        return interpret(node.value)
    } else if (node instanceof BinaryOperation) {
        const leftValue = interpret(node.left)
        const rightValue = interpret(node.right)
        if (node.operator.tokenType === TOKENS.TOK_PLUS) {
            return leftValue + rightValue
        } else if (node.operator.tokenType === TOKENS.TOK_MINUS) {
            return leftValue - rightValue
        } else if (node.operator.tokenType === TOKENS.TOK_STAR) {
            return leftValue * rightValue
        } else if (node.operator.tokenType === TOKENS.TOK_SLASH) {
            return leftValue / rightValue
        }
    } else if (node instanceof UnaryOperation) {
        const operand = interpret(node.operand)
        if (node.operator.tokenType === TOKENS.TOK_PLUS) {
            return +operand
        } else if (node.operator.tokenType === TOKENS.TOK_MINUS) {
            return -operand
        }
    }
}
