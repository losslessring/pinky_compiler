export function match(currentIndex, expected, source) {
    if (source[currentIndex] !== expected) {
        return false
    }
    return {
        match: true,
        current: currentIndex + 1,
    }
}
