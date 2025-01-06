import { Token } from './Token.js'

export function createToken({ tokenType, source, lexemeStart, cursor, line }) {
    return new Token(tokenType, source.slice(lexemeStart, cursor), line)
}
