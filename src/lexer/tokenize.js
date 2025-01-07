import { TOKENS } from './tokens.js'
import { createToken } from './createToken.js'
import { peek } from './peek.js'
import { match } from './match'
import { isCharInteger } from './isCharInteger.js'
import { lookahead } from './lookahead'

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

    const addToken = (tokenType) => newTokens.push(createToken_(tokenType))

    const addMulticharToken = (tokenType) =>
        newTokens.push(createToken_(tokenType))

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
            addToken(TOKENS.TOK_LPAREN)
        } else if (currentCharacter === ')') {
            addToken(TOKENS.TOK_RPAREN)
        } else if (currentCharacter === '{') {
            addToken(TOKENS.TOK_LCURLY)
        } else if (currentCharacter === '}') {
            addToken(TOKENS.TOK_RCURLY)
        } else if (currentCharacter === '[') {
            addToken(TOKENS.TOK_LSQUAR)
        } else if (currentCharacter === ']') {
            addToken(TOKENS.TOK_RSQUAR)
        } else if (currentCharacter === '.') {
            addToken(TOKENS.TOK_DOT)
        } else if (currentCharacter === ',') {
            addToken(TOKENS.TOK_COMMA)
        } else if (currentCharacter === '+') {
            addToken(TOKENS.TOK_PLUS)
        } else if (currentCharacter === '-') {
            addToken(TOKENS.TOK_MINUS)
        } else if (currentCharacter === '*') {
            addToken(TOKENS.TOK_STAR)
        } else if (currentCharacter === '^') {
            addToken(TOKENS.TOK_CARET)
        } else if (currentCharacter === '/') {
            addToken(TOKENS.TOK_SLASH)
        } else if (currentCharacter === ';') {
            addToken(TOKENS.TOK_SEMICOLON)
        } else if (currentCharacter === '?') {
            addToken(TOKENS.TOK_QUESTION)
        } else if (currentCharacter === '%') {
            addToken(TOKENS.TOK_MOD)
        } else if (currentCharacter === '=') {
            if (match(source, cursor, '=')) {
                cursor++
                addMulticharToken(TOKENS.TOK_EQ)
            }
        } else if (currentCharacter === '~') {
            if (match(source, cursor, '=')) {
                cursor++
                addMulticharToken(TOKENS.TOK_NE)
            } else addToken(TOKENS.TOK_NOT)
        } else if (currentCharacter === '<') {
            if (match(source, cursor, '=')) {
                cursor++
                addMulticharToken(TOKENS.TOK_LE)
            } else addToken(TOKENS.TOK_LT)
        } else if (currentCharacter === '>') {
            if (match(source, cursor, '=')) {
                cursor++
                addMulticharToken(TOKENS.TOK_GE)
            } else addToken(TOKENS.TOK_GT)
        } else if (currentCharacter === ':') {
            if (match(source, cursor, '=')) {
                cursor++
                addMulticharToken(TOKENS.TOK_ASSIGN)
            } else addToken(TOKENS.TOK_COLON)
        } else if (Number.isInteger(parseInt(currentCharacter))) {
            while (isCharInteger(cursor, source)) {
                cursor++
            }
            if (
                peek(cursor, source) === '.' &&
                Number.isInteger(parseInt(lookahead(cursor, 1, source)))
            ) {
                cursor++
                while (isCharInteger(cursor, source)) {
                    cursor++
                }
                addMulticharToken(TOKENS.TOK_FLOAT)
            } else {
                addMulticharToken(TOKENS.TOK_INTEGER)
            }
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
