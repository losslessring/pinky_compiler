import { match } from './match'

export function consumeString(startQuote, cursor, line, source) {
    while (!match(startQuote, cursor, source) && cursor <= source.length) {
        cursor++
    }

    if (cursor >= source.length) {
        throw new SyntaxError(`Line ${line} Unterminated string.`)
    }
    cursor++
    return cursor
}
