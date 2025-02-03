import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { BinaryOperation } from './classes/expressions/BinaryOperation'
import { factor } from './factor'
import { expression } from './expression'

export function term(current, tokens) {
    let expressionResult = factor(current, tokens)

    let cursor = expressionResult.current

    if (
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_STAR)) ||
        (cursor <= tokens.length &&
            tokens[cursor] &&
            matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_SLASH))
    ) {
        const operator = tokens[cursor]
        // should place term or expression to parse chain of expressions like 2*3*4*5
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
