import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { Integer } from './classes/expressions/Integer'

export function primary(current, tokens) {
    const currentToken = tokens[current]
    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_INTEGER)) {
        return new Integer(parseInt(currentToken.lexeme))
    }
}
