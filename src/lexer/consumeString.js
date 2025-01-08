import { isCharInteger } from './isCharInteger'
import { lookahead } from './lookahead'
import { match } from './match'
import { peek } from './peek'
import { TOKENS } from './tokens.js'

export function consumeString(startQuote, cursor, source) {
    while (!match(startQuote, cursor, source)) {
        cursor++
    }
    cursor++
    return cursor
}
