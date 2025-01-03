import { TOKENS } from './tokens.js'
import { createToken } from './createToken.js'

export function tokenize({ source, current, start, line, tokens }) {
    const newTokens = [...tokens]

    let cursor = current

    let lexemeStart = start

    let lineCursor = line

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
        if (currentCharacter === '\n') {
            lineCursor = lineCursor + 1
        } else if (currentCharacter === ' ') {
        } else if (currentCharacter === '\t') {
        } else if (currentCharacter === '\r') {
        } else if (currentCharacter === '#') {
            while (currentCharacter !== '\n') {
                cursor++
            }
        } else if (currentCharacter === '(') {
            newTokens.push(createToken_(TOKENS.TOK_LPAREN))
        } else if (currentCharacter === ')') {
            newTokens.push(createToken_(TOKENS.TOK_RPAREN))
        } else if (currentCharacter === '{') {
            newTokens.push(createToken_(TOKENS.TOK_LCURLY))
        } else if (currentCharacter === '}') {
            newTokens.push(createToken_(TOKENS.TOK_RCURLY))
        } else if (currentCharacter === '[') {
            newTokens.push(createToken_(TOKENS.TOK_LSQUAR))
        } else if (currentCharacter === ']') {
            newTokens.push(createToken_(TOKENS.TOK_RSQUAR))
        } else if (currentCharacter === '.') {
            newTokens.push(createToken_(TOKENS.TOK_DOT))
        } else if (currentCharacter === ',') {
            newTokens.push(createToken_(TOKENS.TOK_COMMA))
        } else if (currentCharacter === '+') {
            newTokens.push(createToken_(TOKENS.TOK_PLUS))
        } else if (currentCharacter === '-') {
            newTokens.push(createToken_(TOKENS.TOK_MINUS))
        } else if (currentCharacter === '*') {
            newTokens.push(createToken_(TOKENS.TOK_STAR))
        } else if (currentCharacter === '^') {
            newTokens.push(createToken_(TOKENS.TOK_CARET))
        } else if (currentCharacter === '/') {
            newTokens.push(createToken_(TOKENS.TOK_SLASH))
        } else if (currentCharacter === ';') {
            newTokens.push(createToken_(TOKENS.TOK_SEMICOLON))
        } else if (currentCharacter === '?') {
            newTokens.push(createToken_(TOKENS.TOK_QUESTION))
        } else if (currentCharacter === '%') {
            newTokens.push(createToken_(TOKENS.TOK_MOD))
        }

        lexemeStart = cursor
    }

    return {
        source,
        current: cursor,
        start: lexemeStart,
        line: lineCursor,
        tokens: newTokens,
    }
}
