import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { parseError } from './parseError'
import { Parameter } from './classes/statement/Parameter'

export function parameters(current, tokens) {
    let params = []
    let cursor = current
    let numberOfParameters = 0

    while (!matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_RPAREN)) {
        const currentToken = tokens[cursor]
        if (matchTokenType(currentToken.tokenType, TOKENS.TOK_IDENTIFIER)) {
            numberOfParameters = numberOfParameters + 1
            if (numberOfParameters > 255) {
                parseError(
                    'Functions cannot have more than 255 parameters.',
                    currentToken.line
                )
            }
            params.push(new Parameter(currentToken.lexeme, currentToken.line))
            cursor++
            const nextToken = tokens[cursor]
            if (!matchTokenType(nextToken.tokenType, TOKENS.TOK_RPAREN)) {
                expectToken(
                    nextToken.tokenType,
                    TOKENS.TOK_COMMA,
                    nextToken.line
                )
                cursor++
            }
        }
    }
    return { node: params, current: cursor, tokens }
}
