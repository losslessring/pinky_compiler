import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './../parser/utils/matchTokenType'
import { Integer } from './../parser/classes/expressions/Integer'
import { Float } from './../parser/classes/expressions/Float'
import { parseError } from './../parser/parseError'
import { prattExpression } from './prattExpression'
import { BINDING_POWER } from './constants/bindingPower'
import { Grouping } from './../parser/classes/expressions/Grouping'
import { UnaryOperation } from './../parser/classes/expressions/UnaryOperation'

export function nud(current, tokens) {
    const currentToken = tokens[current]

    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_LPAREN)) {
        const innerOperandsResult = prattExpression(
            current + 1,
            tokens,
            BINDING_POWER['(']
        )

        const innerOperandsNode = innerOperandsResult.node

        const innerOperandsExitCursor = innerOperandsResult.current

        const innerOperandsExitToken = tokens[innerOperandsExitCursor]

        if (
            !matchTokenType(innerOperandsExitToken.tokenType, TOKENS.TOK_RPAREN)
        ) {
            parseError("Error: ')' expected.", currentToken.line)
        }

        return {
            node: new Grouping(innerOperandsNode, currentToken.line),
            current: innerOperandsExitCursor + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_INTEGER)) {
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
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_MINUS)) {
        const operator = currentToken
        const rightOperandResult = prattExpression(
            current + 1,
            tokens,
            BINDING_POWER['neg']
        )
        const rightOperandNode = rightOperandResult.node

        const rightOperandExitCursor = rightOperandResult.current

        return {
            node: new UnaryOperation(
                operator,
                rightOperandNode,
                currentToken.line
            ),
            current: rightOperandExitCursor,
            tokens,
        }
    }
}
