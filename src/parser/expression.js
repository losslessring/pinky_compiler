import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { term } from './term'

export function expression(current, tokens) {
    let expressionResult = term(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_PLUS)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_MINUS))
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = term(cursor + 1, tokens)

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
