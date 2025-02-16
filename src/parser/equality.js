import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from '../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { comparison } from './comparison'

export function equality(current, tokens) {
    let expressionResult = comparison(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_NE)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_EQEQ))
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = comparison(cursor + 1, tokens)

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
