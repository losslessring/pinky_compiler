import { parseError } from './../parseError'
export function expectToken(tokenType, expectedType, lineNumber) {
    if (tokenType === expectedType) {
        return true
    } else {
        parseError(`expected ${expectedType}, found ${tokenType}`, lineNumber)
    }
}
