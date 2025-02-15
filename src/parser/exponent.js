import { unary } from './unary'
import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from '../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'

export function exponent(current, tokens) {
    let expressionResult = unary(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        cursor <= tokens.length &&
        tokens[cursor] &&
        matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_CARET)
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = exponent(cursor + 1, tokens)

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
