import { TOKENS } from './../lexer/tokens'
import { printStatement } from './printStatement'
import { matchTokenType } from './utils/matchTokenType'
import { printLineStatement } from './printLineStatement'
import { ifStatement } from './ifStatement'
import { Assignment } from './classes/statement/Assignment'
import { expression } from './expression'
import { whileStatement } from './whileStatement'
import { forStatement } from './forStatement'
import { functionDeclaration } from './functionDeclaration'
import { FunctionCallStatement } from './classes/statement/FunctionCallStatement'
import { returnStatement } from './returnStatement'

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
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FUNC)) {
        return functionDeclaration(current, tokens)
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_RET)) {
        return returnStatement(current, tokens)
    } else {
        const leftResult = expression(current, tokens)

        const leftExitCursor = leftResult.current

        const assignmentToken = tokens[leftExitCursor]

        if (
            assignmentToken !== undefined &&
            matchTokenType(assignmentToken.tokenType, TOKENS.TOK_ASSIGN)
        ) {
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
        } else {
            return {
                node: new FunctionCallStatement(
                    leftResult.node,
                    currentToken.line
                ),
                current: leftExitCursor,
                tokens,
            }
        }
    }
}
