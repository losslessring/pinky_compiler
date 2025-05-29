import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './../parser/utils/matchTokenType'
import { prattExpression } from './prattExpression'
import { BinaryOperation } from './../parser/classes/expressions/BinaryOperation'

export function led(current, tokens, left) {
    const cursor = current

    if (
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_PLUS)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_MINUS)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_STAR)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_SLASH))
    ) {
        const operator = tokens[cursor]

        const rightOperandResult = prattExpression(cursor + 1, tokens)

        const rightOperandNode = rightOperandResult.node

        const rightOperandExitCursor = rightOperandResult.current

        const expressionResult = {
            node: new BinaryOperation(
                operator,
                left.node,
                rightOperandNode,
                operator.line
            ),
            current: rightOperandExitCursor,
            tokens,
        }
        return expressionResult
    }
}
