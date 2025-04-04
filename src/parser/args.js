import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { parseError } from './parseError'
import { expression } from './expression'

export function args(current, tokens) {
    let args = []
    let cursor = current

    while (!matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_RPAREN)) {
        const currentArgumentResult = expression(cursor, tokens)
        const currentArgumentResultExitCursor = currentArgumentResult.current

        args.push(currentArgumentResult.node)
        cursor = currentArgumentResultExitCursor

        const nextToken = tokens[cursor]
        if (!matchTokenType(nextToken.tokenType, TOKENS.TOK_RPAREN)) {
            expectToken(nextToken.tokenType, TOKENS.TOK_COMMA, nextToken.line)
            cursor++
        }
    }
    return { node: args, current: cursor, tokens }
}
