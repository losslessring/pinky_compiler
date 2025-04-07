import { Integer } from '../parser/classes/expressions/Integer'
import { TYPES } from './../interpreter/types'
import { Statements } from './../parser/classes/statement/Statements'
import { emit } from './emit'
import { PrintStatement } from './../parser/classes/statement/PrintStatement'
import { PrintLineStatement } from './../parser/classes/statement/PrintLineStatement'
import { Float } from './../parser/classes/expressions/Float'
import { TOKENS } from './../lexer/tokens'
import { BinaryOperation } from './../parser/classes/expressions/BinaryOperation'
import { Boolean } from './../parser/classes/expressions/Boolean'
import { String_ } from './../parser/classes/expressions/String'
import { UnaryOperation } from './../parser/classes/expressions/UnaryOperation'
import { LogicalOperation } from './../parser/classes/expressions/LogicalOperation'
import { Grouping } from './../parser/classes/expressions/Grouping'

export function compile(compiler, node) {
    const { TYPE_NUMBER: NUMBER, TYPE_STRING: STRING, TYPE_BOOL: BOOL } = TYPES

    if (node instanceof Integer || node instanceof Float) {
        const argument = { type: NUMBER, value: parseFloat(node.value) }
        const instruction = {
            command: 'PUSH',
            argument,
        }
        emit(compiler, instruction)
    } else if (node instanceof Boolean) {
        const argument = {
            type: BOOL,
            value: node.value === true ? true : false,
        }
        const instruction = {
            command: 'PUSH',
            argument,
        }
        emit(compiler, instruction)
    } else if (node instanceof String_) {
        const argument = {
            type: STRING,
            value: String(node.value),
        }
        const instruction = {
            command: 'PUSH',
            argument,
        }
        emit(compiler, instruction)
    } else if (node instanceof BinaryOperation) {
        const tokenType = node.operator.tokenType

        compile(compiler, node.left)
        compile(compiler, node.right)

        if (tokenType === TOKENS.TOK_PLUS) {
            emit(compiler, { command: 'ADD' })
        } else if (tokenType === TOKENS.TOK_MINUS) {
            emit(compiler, { command: 'SUB' })
        } else if (tokenType === TOKENS.TOK_STAR) {
            emit(compiler, { command: 'MUL' })
        } else if (tokenType === TOKENS.TOK_SLASH) {
            emit(compiler, { command: 'DIV' })
        } else if (tokenType === TOKENS.TOK_CARET) {
            emit(compiler, { command: 'EXP' })
        } else if (tokenType === TOKENS.TOK_MOD) {
            emit(compiler, { command: 'MOD' })
        } else if (tokenType === TOKENS.TOK_LT) {
            emit(compiler, { command: 'LT' })
        } else if (tokenType === TOKENS.TOK_GT) {
            emit(compiler, { command: 'GT' })
        } else if (tokenType === TOKENS.TOK_LE) {
            emit(compiler, { command: 'LE' })
        } else if (tokenType === TOKENS.TOK_GE) {
            emit(compiler, { command: 'GE' })
        } else if (tokenType === TOKENS.TOK_EQEQ) {
            emit(compiler, { command: 'EQ' })
        } else if (tokenType === TOKENS.TOK_NE) {
            emit(compiler, { command: 'NE' })
        } else {
            throw new Error(
                `Unrecognized binary operation ${node.operator.lexeme} in line ${node.line}`
            )
        }
    } else if (node instanceof UnaryOperation) {
        compile(compiler, node.operand)
        const tokenType = node.operator.tokenType
        if (tokenType === TOKENS.TOK_MINUS) {
            emit(compiler, { command: 'NEG' })
        } else if (tokenType === TOKENS.TOK_NOT) {
            emit(compiler, {
                command: 'PUSH',
                argument: { type: NUMBER, value: 1 },
            })
            emit(compiler, { command: 'XOR' })
        }
    } else if (node instanceof LogicalOperation) {
        const tokenType = node.operator.tokenType

        compile(compiler, node.left)
        compile(compiler, node.right)

        if (tokenType === TOKENS.TOK_AND) {
            emit(compiler, { command: 'AND' })
        } else if (tokenType === TOKENS.TOK_OR) {
            emit(compiler, { command: 'OR' })
        }
    } else if (node instanceof Grouping) {
        compile(compiler, node.value)
    } else if (node instanceof PrintStatement) {
        compile(compiler, node.value)
        const instruction = {
            command: 'PRINT',
        }
        emit(compiler, instruction)
    } else if (node instanceof PrintLineStatement) {
        compile(compiler, node.value)
        const instruction = {
            command: 'PRINTLN',
        }
        emit(compiler, instruction)
    } else if (node instanceof Statements) {
        node.statements.forEach((statement) => {
            compile(compiler, statement)
        })
    } else {
        throw new Error(`Unrecognized ${node.name} in line ${node.line}`)
    }
}
