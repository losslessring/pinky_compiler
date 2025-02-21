import { expression } from './expression'
import { PrintStatement } from './classes/statement/PrintStatement'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'

export function printStatement(current, tokens) {
    const currentToken = tokens[current]

    if (
        current <= tokens.length &&
        tokens[current] &&
        matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINT)
    ) {
        const expressionResult = expression(current + 1, tokens)

        const expressionExitCursor = expressionResult.current

        return {
            node: new PrintStatement(expressionResult.node, currentToken.line),
            current: expressionExitCursor,
            tokens,
        }
    }

    return expressionResult
}
