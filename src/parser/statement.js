import { TOKENS } from './../lexer/tokens'
import { printStatement } from './printStatement'
import { matchTokenType } from './utils/matchTokenType'

export function statement(current, tokens) {
    const currentToken = tokens[current]

    if (
        current <= tokens.length &&
        tokens[current] &&
        matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINT)
    ) {
        return printStatement(current, tokens)
    }
}
