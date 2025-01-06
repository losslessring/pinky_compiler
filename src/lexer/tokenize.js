import { TOKENS } from './tokens.js'
import { createToken } from './createToken.js'
import { peek } from './peek.js'
import { match } from './match'

export function tokenize({ source, current, start, line, tokens }) {
    const newTokens = [...tokens]

    let cursor = current

    let lexemeStart = start

    let lineCursor = line

    const createToken_ = (tokenType, cursorShift = 0) =>
        createToken({
            tokenType,
            source,
            lexemeStart,
            cursor: cursor + cursorShift,
            line: lineCursor,
        })
    const cursorShift = 1
    const createMultiCharToken = (tokenType) =>
        createToken_(tokenType, cursorShift)

    const addToken_ = (tokenType, cursorShift = 0) =>
        newTokens.push(createToken_(tokenType, cursorShift))

    while (cursor < source.length) {
        const currentCharacter = source[cursor]

        cursor++

        if (currentCharacter === '\n') {
            lineCursor = lineCursor + 1
        } else if (currentCharacter === ' ') {
        } else if (currentCharacter === '\t') {
        } else if (currentCharacter === '\r') {
        } else if (currentCharacter === '#') {
            while (peek(cursor, source) !== '\n') {
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
        } else if (currentCharacter === '=') {
            if (match(source, cursor, '=')) {
                newTokens.push(createMultiCharToken(TOKENS.TOK_EQ))
            }
        } else if (currentCharacter === '~') {
            if (match(source, cursor, '=')) {
                newTokens.push(createMultiCharToken(TOKENS.TOK_NE))
            } else newTokens.push(createToken_(TOKENS.TOK_NOT))
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
