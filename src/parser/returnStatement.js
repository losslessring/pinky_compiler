import { expression } from './expression'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { ReturnStatement } from './classes/statement/ReturnStatement'

export function returnStatement(current, tokens) {
    const currentToken = tokens[current]

    if (
        current <= tokens.length &&
        tokens[current] &&
        matchTokenType(currentToken.tokenType, TOKENS.TOK_RET)
    ) {
        const expressionResult = expression(current + 1, tokens)

        const expressionExitCursor = expressionResult.current

        return {
            node: new ReturnStatement(expressionResult.node, currentToken.line),
            current: expressionExitCursor,
            tokens,
        }
    }

    return expressionResult
}
