import { match } from './match'

export function consumeString(startQuote, cursor, source) {
    while (!match(startQuote, cursor, source)) {
        cursor++
    }
    cursor++
    return cursor
}
