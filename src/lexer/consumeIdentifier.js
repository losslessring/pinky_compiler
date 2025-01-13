import { match } from './match'
import { peek } from './peek'
import { isLetter } from './isLetter'
import { isCharInteger } from './isCharInteger'

export function consumeIdentifier(cursor, source) {
    while (
        isLetter(peek(cursor, source)) ||
        isCharInteger(cursor, source) ||
        match('_', cursor, source)
    ) {
        cursor++
    }
    return cursor
}
