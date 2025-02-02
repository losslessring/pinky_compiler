import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { factor } from './factor'

export function term(current, tokens) {
    const leftOperandResult = factor(current, tokens)

    const leftOperandNode = leftOperandResult.node
    const leftOperandExitCursor = leftOperandResult.current

    let endResult = undefined

    let cursor = leftOperandExitCursor

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

        endResult = {
            node: new BinaryOperation(
                operator,
                leftOperandNode,
                rightOperandNode
            ),
            current: rightOperandExitCursor,
            tokens,
        }
    }

    return endResult ? endResult : leftOperandResult
}
