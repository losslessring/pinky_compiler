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
import { unaryOperatorTypeError } from './unaryOperatorTypeError'
import { LogicalOperation } from './../parser/classes/expressions/LogicalOperation'
import { Statement } from './../parser/classes/statement/Statement'
import { Statements } from './../parser/classes/statement/Statements'
import { PrintStatement } from './../parser/classes/statement/PrintStatement'
import { PrintLineStatement } from './../parser/classes/statement/PrintLineStatement'
import { IfStatement } from './../parser/classes/statement/IfStatement'

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

        const { type: operandType, value: operandValue } = interpret(
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

        const { type: leftType, value: leftValue } = interpret(node.left)

        if (tokenType === TOKENS.TOK_OR) {
            if (leftType === BOOL) {
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
            } else {
                throw new TypeError(
                    `Unsupported usage of logical operator '${lexeme}' with left ${leftType} in line ${line}.`
                )
            }
        }
        const { type: rightType, value: rightValue } = interpret(node.right)

        if (rightType === BOOL) {
            return { type: rightType, value: rightValue }
        } else {
            throw new TypeError(
                `Unsupported usage of logical operator '${lexeme}' with right ${rightType} in line ${line}.`
            )
        }
    } else if (node instanceof Statements) {
        node.statements.forEach((statement) => {
            interpret(statement)
        })
    } else if (node instanceof PrintStatement) {
        const { type: expressionType, value: expressionValue } = interpret(
            node.value
        )
        process.stdout.write(expressionValue.toString())
    } else if (node instanceof PrintLineStatement) {
        const { type: expressionType, value: expressionValue } = interpret(
            node.value
        )
        console.log(expressionValue.toString())
    } else if (node instanceof IfStatement) {
        const {
            type: testCondtionExpressionType,
            value: testCondtionExpressionValue,
        } = interpret(node.test)

        if (testCondtionExpressionType !== BOOL) {
            throw new TypeError(
                `Test condition expression is not of a boolean type.`
            )
        }
        if (testCondtionExpressionValue) {
            interpret(node.thenStatements)
        } else {
            interpret(node.elseStatements)
        }
    }
}
