export function match(expected, cursor, source) {
    if (source[cursor] !== expected) {
        return false
    }
    return true
}
