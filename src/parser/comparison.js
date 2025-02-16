import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from '../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { addition } from './addition'

export function comparison(current, tokens) {
    let expressionResult = addition(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_GT)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_GE)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_LT)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_LE))
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = addition(cursor + 1, tokens)

        const rightOperandNode = rightOperandResult.node

        const rightOperandExitCursor = rightOperandResult.current

        cursor = rightOperandExitCursor

        expressionResult = {
            node: new BinaryOperation(
                operator,
                expressionResult.node,
                rightOperandNode,
                operator.line
            ),
            current: rightOperandExitCursor,
            tokens,
        }
    }

    return expressionResult
}
