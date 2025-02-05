import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { Integer } from './classes/expressions/Integer'
import { Float } from './classes/expressions/Float'
import { Grouping } from './classes/expressions/Grouping'
import { expression } from './expression'
import { parseError } from './parseError'

export function primary(current, tokens) {
    const currentToken = tokens[current]

    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_INTEGER)) {
        return {
            node: new Integer(parseInt(currentToken.lexeme)),
            current: current + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FLOAT)) {
        return {
            node: new Float(parseFloat(currentToken.lexeme)),
            current: current + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_LPAREN)) {
        const expressionResult = expression(current + 1, tokens)
        const expressionNode = expressionResult.node
        const expressionExitCursor = expressionResult.current
        const expressionExitToken = tokens[expressionExitCursor]

        if (expressionExitCursor >= tokens.length) {
            parseError('Closing round bracket expected.', currentToken.line)
        }

        if (!matchTokenType(expressionExitToken.tokenType, TOKENS.TOK_RPAREN)) {
            parseError('Closing round bracket expected.', currentToken.line)
        } else {
            return {
                node: new Grouping(expressionNode),
                current: expressionExitCursor + 1,
                tokens,
            }
        }
    }
}
