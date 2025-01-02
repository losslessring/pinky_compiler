import { TOKENS } from './tokens.js'
import { createToken } from './createToken.js'

export function tokenize({ source, current, start, line, tokens }) {
    const newTokens = [...tokens]

    let cursor = current

    let lexemeStart = start

    while (cursor < source.length) {
        const currentCharacter = source[cursor]

        cursor++

        const createToken_ = (tokenType) =>
            createToken({
                tokenType,
                source,
                lexemeStart,
                cursor,
            })

        if (currentCharacter === '+') {
            newTokens.push(createToken_(TOKENS.TOK_PLUS))
        } else if (currentCharacter === '-') {
            newTokens.push(createToken_(TOKENS.TOK_MINUS))
        } else if (currentCharacter === '*') {
            newTokens.push(createToken_(TOKENS.TOK_STAR))
        }

        lexemeStart = cursor
    }

    return {
        source,
        current: cursor,
        start: lexemeStart,
        line,
        tokens: newTokens,
    }
}
