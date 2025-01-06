export function match(source, currentIndex, expected) {
    if (source[currentIndex] !== expected) {
        return false
    }
    return true
}
