import { TOKENS } from './../lexer/tokens'
import { printStatement } from './printStatement'
import { matchTokenType } from './utils/matchTokenType'
import { printLineStatement } from './printLineStatement'

export function statement(current, tokens) {
    if (current >= tokens.length) {
        throw new Error('Tried to parse out of token bounds')
    }

    const currentToken = tokens[current]

    if (!tokens[current]) {
        throw new Error('Tried to access an unexisting token')
    }
    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINT)) {
        return printStatement(current, tokens)
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINTLN)) {
        return printLineStatement(current, tokens)
    }
}
