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
import { IfStatement } from './../parser/classes/statement/IfStatement'
import { makeLabel } from './makeLabel'
import { Assignment } from './../parser/classes/statement/Assignment'
import { Identifier } from './../parser/classes/expressions/Identifier'
import { Symbol } from './classes/Symbol'
import { getSymbol } from './getSymbol'
import { addSymbol } from './addSymbol'
import { beginBlock } from './beginBlock'
import { endBlock } from './endBlock'
import { addLocalSymbol } from './addLocalSymbol'
import { WhileStatement } from './../parser/classes/statement/WhileStatement'
import { SYMBOL_TYPES } from './symbolTypes'
import { FunctionDeclaration } from './../parser/classes/statement/FunctionDeclaration'
import { FunctionCall } from './../parser/classes/expressions/FunctionCall'
import { FunctionCallStatement } from './../parser/classes/statement/FunctionCallStatement'
import { getFunctionSymbol } from './getFunctionSymbol'
import { addFunctionSymbol } from './addFunctionSymbol'

export function compile(compiler, node) {
    const {
        TYPE_NUMBER: NUMBER,
        TYPE_STRING: STRING,
        TYPE_BOOL: BOOL,
        TYPE_LABEL: LABEL,
        TYPE_SYMBOL: SYMBOL,
        TYPE_STACK_SLOT: STACK_SLOT,
    } = TYPES

    const labelPrefix = 'LBL'

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
                argument: { type: BOOL, value: true },
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
    } else if (node instanceof IfStatement) {
        compile(compiler, node.test)

        const thenLabel = makeLabel(compiler, labelPrefix)
        const elseLabel = makeLabel(compiler, labelPrefix)
        const exitLabel = makeLabel(compiler, labelPrefix)

        emit(compiler, {
            command: 'JMPZ',
            argument: { type: LABEL, value: elseLabel },
        })

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: thenLabel },
        })

        beginBlock(compiler)

        compile(compiler, node.thenStatements)

        endBlock(compiler)

        emit(compiler, {
            command: 'JMP',
            argument: { type: LABEL, value: exitLabel },
        })

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: elseLabel },
        })

        if (node.elseStatements) {
            beginBlock(compiler)
            compile(compiler, node.elseStatements)
            endBlock(compiler)
        }

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: exitLabel },
        })
    } else if (node instanceof WhileStatement) {
        const testLabel = makeLabel(compiler, labelPrefix)
        const bodyLabel = makeLabel(compiler, labelPrefix)
        const exitLabel = makeLabel(compiler, labelPrefix)

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: testLabel },
        })
        compile(compiler, node.test)

        emit(compiler, {
            command: 'JMPZ',
            argument: { type: LABEL, value: exitLabel },
        })

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: bodyLabel },
        })

        beginBlock(compiler)
        compile(compiler, node.bodyStatements)
        endBlock(compiler)

        emit(compiler, {
            command: 'JMP',
            argument: { type: LABEL, value: testLabel },
        })

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: exitLabel },
        })
    } else if (node instanceof Statements) {
        node.statements.forEach((statement) => {
            compile(compiler, statement)
        })
    } else if (node instanceof Assignment) {
        compile(compiler, node.right)

        const existingSymbol = getSymbol(compiler, node.left.name)
        if (!existingSymbol) {
            const newSymbol = new Symbol(
                node.left.name,
                compiler.scopeDepth,
                SYMBOL_TYPES.VARIABLE
            )
            if (compiler.scopeDepth === 0) {
                addSymbol(compiler, newSymbol)
                const newGlobalSlot = compiler.globals.length - 1
                emit(compiler, {
                    command: 'STORE_GLOBAL',
                    argument: { type: SYMBOL, value: newGlobalSlot },
                })
            } else {
                addLocalSymbol(compiler, newSymbol)
                emit(compiler, {
                    command: 'SET_SLOT',
                    argument: {
                        type: STACK_SLOT,
                        value: `${compiler.locals.length - 1} (${
                            newSymbol.name
                        })`,
                    },
                })
            }
        } else {
            const { symbol, index: slot } = existingSymbol
            if (symbol.depth === 0) {
                emit(compiler, {
                    command: 'STORE_GLOBAL',
                    argument: { type: SYMBOL, value: slot },
                })
            } else {
                emit(compiler, {
                    command: 'STORE_LOCAL',
                    argument: { type: STACK_SLOT, value: slot },
                })
            }
        }
    } else if (node instanceof Identifier) {
        const existingSymbol = getSymbol(compiler, node.name)

        if (!existingSymbol) {
            throw new Error(
                `Variable ${node.name} is not defined in line ${node.line}.`
            )
        } else {
            const { symbol, index: slot } = existingSymbol
            if (symbol.depth === 0) {
                emit(compiler, {
                    command: 'LOAD_GLOBAL',
                    argument: { type: SYMBOL, value: slot },
                })
            } else {
                emit(compiler, {
                    command: 'LOAD_LOCAL',
                    argument: { type: STACK_SLOT, value: slot },
                })
            }
        }
    } else if (node instanceof FunctionDeclaration) {
        const existingFunction = getFunctionSymbol(compiler, node.name)
        if (existingFunction) {
            throw new Error(
                `A function with the name ${node.name} was already declared in line ${node.line}.`
            )
        }

        const existingVariable = getSymbol(compiler, node.name)
        if (existingVariable) {
            throw new Error(
                `A variable with the name ${node.name} was already declared in this scope in line ${node.line}.`
            )
        }

        const newFunctionSymbol = new Symbol(
            node.name,
            compiler.scopeDepth,
            SYMBOL_TYPES.FUNCTION
        )
        addFunctionSymbol(compiler, newFunctionSymbol)

        const endLabel = makeLabel(compiler, labelPrefix)
        emit(compiler, {
            command: 'JMP',
            argument: { type: LABEL, value: endLabel },
        })
        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: newFunctionSymbol.name },
        })
        beginBlock(compiler)

        compile(compiler, node.bodyStatements)

        endBlock(compiler)

        emit(compiler, { command: 'RTS' })

        emit(compiler, {
            command: 'LABEL',
            argument: { type: LABEL, value: endLabel },
        })
    } else if (node instanceof FunctionCall) {
        emit(compiler, {
            command: 'JSR',
            argument: { type: LABEL, value: node.name },
        })
    } else if (node instanceof FunctionCallStatement) {
        compile(compiler, node.expression)
    } else {
        throw new Error(`Unrecognized ${node} in line ${node.line}`)
    }
}
