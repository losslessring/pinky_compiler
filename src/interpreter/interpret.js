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
import { Statements } from './../parser/classes/statement/Statements'
import { PrintStatement } from './../parser/classes/statement/PrintStatement'
import { PrintLineStatement } from './../parser/classes/statement/PrintLineStatement'
import { IfStatement } from './../parser/classes/statement/IfStatement'
import { Identifier } from './../parser/classes/expressions/Identifier'
import { Assignment } from './../parser/classes/statement/Assignment'
import { WhileStatement } from './../parser/classes/statement/WhileStatement'
import { ForStatement } from '../parser/classes/statement/ForStatement'
import { newEnvironment } from './environment/newEnvironment'
import { getVariable } from './environment/getVariable'
import { setVariable } from './environment/setVariable'
import { statement } from './../parser/statement'
import { FunctionDeclaration } from './../parser/classes/statement/FunctionDeclaration'
import { FunctionCallStatement } from './../parser/classes/statement/FunctionCallStatement'
import { setFunction } from './environment/setFunction'
import { getFunction } from './environment/getFunction'
import { FunctionCall } from './../parser/classes/expressions/FunctionCall'
import { parameters } from './../parser/parameters'

export function interpret(node, environment) {
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
        return interpret(node.value, environment)
    } else if (node instanceof Identifier) {
        const valueObject = getVariable(node.name, environment)

        if (valueObject === undefined) {
            throw new Error(
                `Undeclared identifier ${node.name} in line ${node.line}.`
            )
        }
        if (valueObject.value === undefined) {
            throw new Error(
                `Uninitialized identifier ${node.name} in line ${node.line}.`
            )
        }

        return valueObject
    } else if (node instanceof Assignment) {
        const rightTypeValue = interpret(node.right, environment)
        setVariable(node.left.name, rightTypeValue, environment)
    } else if (node instanceof BinaryOperation) {
        const lexeme = node.operator.lexeme
        const line = node.operator.line
        const tokenType = node.operator.tokenType

        const { type: leftType, value: leftValue } = interpret(
            node.left,
            environment
        )
        const { type: rightType, value: rightValue } = interpret(
            node.right,
            environment
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

        const { type: operandType, value: operandValue } = interpret(
            node.operand,
            environment
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

        const { type: leftType, value: leftValue } = interpret(
            node.left,
            environment
        )

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
        const { type: rightType, value: rightValue } = interpret(
            node.right,
            environment
        )

        if (rightType === BOOL) {
            return { type: rightType, value: rightValue }
        } else {
            throw new TypeError(
                `Unsupported usage of logical operator '${lexeme}' with right ${rightType} in line ${line}.`
            )
        }
    } else if (node instanceof Statements) {
        node.statements.forEach((statement) => {
            interpret(statement, environment)
        })
    } else if (node instanceof PrintStatement) {
        const { type: expressionType, value: expressionValue } = interpret(
            node.value,
            environment
        )
        process.stdout.write(expressionValue.toString())
    } else if (node instanceof PrintLineStatement) {
        const { type: expressionType, value: expressionValue } = interpret(
            node.value,
            environment
        )
        console.log(expressionValue.toString())
    } else if (node instanceof IfStatement) {
        const {
            type: testCondtionExpressionType,
            value: testCondtionExpressionValue,
        } = interpret(node.test, environment)

        if (testCondtionExpressionType !== BOOL) {
            throw new TypeError(
                `If test condition expression is not of a boolean type.`
            )
        }
        if (testCondtionExpressionValue) {
            interpret(node.thenStatements, newEnvironment(environment))
        } else {
            interpret(node.elseStatements, newEnvironment(environment))
        }
    } else if (node instanceof WhileStatement) {
        let whileLoopBodyEnvironment = newEnvironment(environment)

        while (true) {
            const {
                type: testCondtionExpressionType,
                value: testCondtionExpressionValue,
            } = interpret(node.test, environment)

            if (testCondtionExpressionType !== BOOL) {
                throw new TypeError(
                    `While test condition expression is not of a boolean type.`
                )
            }
            if (!testCondtionExpressionValue) {
                break
            }

            interpret(node.bodyStatements, whileLoopBodyEnvironment)
        }
    } else if (node instanceof ForStatement) {
        // console.log(node)
        if (!node.identifier) {
            throw new Error(`For loop counter identifier was not found.`)
        }

        if (!node.identifier.name) {
            throw new Error(`For loop counter identifier name was not found.`)
        }

        let counterVariableName = node.identifier.name

        if (!node.start) {
            throw new Error(`For loop counter start value was not found.`)
        }

        let { type: counterType, value: counterValue } = interpret(
            node.start,
            environment
        )

        if (!node.end) {
            throw new Error(`For loop counter end value was not found.`)
        }

        const { type: endType, value: endValue } = interpret(
            node.end,
            environment
        )

        let forLoopBodyEnvironment = newEnvironment(environment)

        if (counterValue < endValue) {
            const step =
                node.step === undefined
                    ? 1
                    : interpret(node.step, environment).value
            while (counterValue <= endValue) {
                const newCounterValue = {
                    type: TYPES.TYPE_NUMBER,
                    value: counterValue,
                }
                setVariable(counterVariableName, newCounterValue, environment)
                interpret(node.bodyStatements, forLoopBodyEnvironment)
                counterValue = counterValue + step
            }
        } else {
            const step =
                node.step === undefined
                    ? -1
                    : interpret(node.step, environment).value
            while (counterValue >= endValue) {
                const newCounterValue = {
                    type: TYPES.TYPE_NUMBER,
                    value: counterValue,
                }
                setVariable(counterVariableName, newCounterValue, environment)
                interpret(node.bodyStatements, forLoopBodyEnvironment)
                counterValue = counterValue + step
            }
        }
    } else if (node instanceof FunctionDeclaration) {
        setFunction(node.name, node, environment)
    } else if (node instanceof FunctionCall) {
        const func = getFunction(node.name, environment)

        if (!func) {
            throw new Error(
                `Function ${node.name} not declared, line ${node.line}.`
            )
        }
        //Pay attention to this
        const functionDeclaration = func.functionDeclaration
        const functionDeclarationEnvironment = func.declarationEnvironment

        if (node.args.length !== functionDeclaration.parameters.length) {
            throw new Error(
                `Function ${func.name} expected ${functionDeclaration.parameters.length} parameters, but ${node.args.length} arguments were passed.`
            )
        }

        let newFunctionEnvironment = newEnvironment(
            functionDeclarationEnvironment
        )

        const parameters = functionDeclaration.parameters

        const args = node.args.map((argument) =>
            interpret(argument, environment)
        )

        parameters.forEach((parameter, index) =>
            setVariable(parameter, args[index], newFunctionEnvironment)
        )

        interpret(functionDeclaration.bodyStatements, newFunctionEnvironment)
    } else if (node instanceof FunctionCallStatement) {
        interpret(node.expression, environment)
    }
}
