import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './../parser/utils/matchTokenType'
import { Integer } from './../parser/classes/expressions/Integer'
import { Float } from './../parser/classes/expressions/Float'
export function nud(current, tokens) {
    const currentToken = tokens[current]

    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_INTEGER)) {
        return {
            node: new Integer(parseInt(currentToken.lexeme), currentToken.line),
            current: current + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FLOAT)) {
        return {
            node: new Float(parseFloat(currentToken.lexeme), currentToken.line),
            current: current + 1,
            tokens,
        }
    }
}
