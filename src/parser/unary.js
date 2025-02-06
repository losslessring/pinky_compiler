import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { primary } from './primary'
import { UnaryOperation } from './classes/expressions/UnaryOperation'

export function unary(current, tokens) {
    const currentToken = tokens[current]

    if (
        matchTokenType(currentToken.tokenType, TOKENS.TOK_NOT) ||
        matchTokenType(currentToken.tokenType, TOKENS.TOK_MINUS) ||
        matchTokenType(currentToken.tokenType, TOKENS.TOK_PLUS)
    ) {
        const operator = currentToken
        const operandResult = unary(current + 1, tokens)
        const operandNode = operandResult.node

        const operandExitCursor = operandResult.current

        return {
            node: new UnaryOperation(operator, operandNode, currentToken.line),
            current: operandExitCursor,
            tokens,
        }
    } else return primary(current, tokens)
}
