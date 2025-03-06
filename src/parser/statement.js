import { TOKENS } from './../lexer/tokens'
import { printStatement } from './printStatement'
import { matchTokenType } from './utils/matchTokenType'
import { printLineStatement } from './printLineStatement'
import { ifStatement } from './ifStatement'
import { Assignment } from './classes/statement/Assignment'
import { expression } from './expression'
import { whileStatement } from './whileStatement'

export function statement(current, tokens) {
    if (current >= tokens.length) {
        throw new Error('Tried to parse out of token bounds')
    }

    const currentToken = tokens[current]

    if (!tokens[current]) {
        throw new Error('Tried to access an unexisting token')
    }
    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINT)) {
        return printStatement(current, tokens)
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINTLN)) {
        return printLineStatement(current, tokens)
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_IF)) {
        return ifStatement(current, tokens)
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_WHILE)) {
        return whileStatement(current, tokens)
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FOR)) {
        return forStatement(current, tokens)
    } else {
        const leftResult = expression(current, tokens)

        const leftExitCursor = leftResult.current

        if (leftExitCursor >= tokens.length) {
            throw new Error(
                'Tried to parse out of token bounds in asignment statement'
            )
        }

        const assignmentToken = tokens[leftExitCursor]

        if (!assignmentToken) {
            throw new Error(
                'Tried to access an unexisting token in assignment statement'
            )
        }

        if (matchTokenType(assignmentToken.tokenType, TOKENS.TOK_ASSIGN)) {
            const rightResult = expression(leftExitCursor + 1, tokens)

            const rightExitCursor = rightResult.current

            return {
                node: new Assignment(
                    leftResult.node,
                    rightResult.node,
                    currentToken.line
                ),
                current: rightExitCursor,
                tokens,
            }
        }
    }
}
