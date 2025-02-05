import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { factor } from './factor'

export function term(current, tokens) {
    let expressionResult = factor(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_STAR)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_SLASH))
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = factor(cursor + 1, tokens)

        const rightOperandNode = rightOperandResult.node

        const rightOperandExitCursor = rightOperandResult.current

        cursor = rightOperandExitCursor

        expressionResult = {
            node: new BinaryOperation(
                operator,
                expressionResult.node,
                rightOperandNode
            ),
            current: rightOperandExitCursor,
            tokens,
        }
    }

    return expressionResult
}
