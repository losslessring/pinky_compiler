import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from '../lexer/tokens'
import { LogicalOperation } from './classes/expressions/LogicalOperation'
import { logicalAnd } from './logicalAnd'

export function logicalOr(current, tokens) {
    let expressionResult = logicalAnd(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        cursor <= tokens.length &&
        tokens[cursor] &&
        matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_OR)
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = logicalAnd(cursor + 1, tokens)

        const rightOperandNode = rightOperandResult.node

        const rightOperandExitCursor = rightOperandResult.current

        cursor = rightOperandExitCursor

        expressionResult = {
            node: new LogicalOperation(
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
