export function parseError(message, lineNumber) {
    throw new Error(`Line ${lineNumber} ${message}`)
}
