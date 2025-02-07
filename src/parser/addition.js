import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from '../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { multiplication } from './multiplication'

export function addition(current, tokens) {
    let expressionResult = multiplication(current, tokens)

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

        const rightOperandResult = multiplication(cursor + 1, tokens)

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
