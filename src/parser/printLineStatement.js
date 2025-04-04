import { expression } from './expression'
import { TOKENS } from '../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { PrintLineStatement } from './classes/statement/PrintLineStatement'

export function printLineStatement(current, tokens) {
    const currentToken = tokens[current]

    if (
        current <= tokens.length &&
        tokens[current] &&
        matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINTLN)
    ) {
        const expressionResult = expression(current + 1, tokens)

        const expressionExitCursor = expressionResult.current

        return {
            node: new PrintLineStatement(
                expressionResult.node,
                currentToken.line
            ),
            current: expressionExitCursor,
            tokens,
        }
    }

    return expressionResult
}
