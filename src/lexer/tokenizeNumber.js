import { isCharInteger } from './isCharInteger'
import { lookahead } from './lookahead'
import { peek } from './peek'
import { TOKENS } from './tokens.js'

export function tokenizeNumber(cursor, source) {
    while (isCharInteger(cursor, source)) {
        cursor++
    }
    if (
        peek(cursor, source) === '.' &&
        Number.isInteger(parseInt(lookahead(cursor, 1, source)))
    ) {
        cursor++
        while (isCharInteger(cursor, source)) {
            cursor++
        }
        return {
            cursor,
            tokenType: TOKENS.TOK_FLOAT,
        }
    } else {
        return {
            cursor,
            tokenType: TOKENS.TOK_INTEGER,
        }
    }
}
