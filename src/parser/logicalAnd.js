import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from '../lexer/tokens'
import { equality } from './equality'
import { LogicalOperation } from './classes/expressions/LogicalOperation'

export function logicalAnd(current, tokens) {
    let expressionResult = equality(current, tokens)

    const expressionExitCursor = expressionResult.current

    let cursor = expressionExitCursor

    while (
        cursor <= tokens.length &&
        tokens[cursor] &&
        matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_AND)
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = equality(cursor + 1, tokens)

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
