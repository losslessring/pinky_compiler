import { Token } from './Token.js'

export function createToken({ tokenType, source, lexemeStart, cursor }) {
    return new Token(tokenType, source.slice(lexemeStart, cursor))
}
