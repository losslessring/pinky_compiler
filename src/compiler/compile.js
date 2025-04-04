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
    } else if (node instanceof BinaryOperation) {
        const tokenType = node.operator.tokenType

        compile(compiler, node.left)
        compile(compiler, node.right)

        if (tokenType === TOKENS.TOK_PLUS) {
            emit(compiler, { command: 'ADD' })
        } else if (tokenType === TOKENS.TOK_MINUS) {
            emit(compiler, { command: 'SUB' })
        } else {
            throw new Error(
                `Unrecognized binary operation ${node.operator.lexeme} in line ${node.line}`
            )
        }
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
