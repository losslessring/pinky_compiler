import { matchTokenType } from './utils/matchTokenType'
import { TOKENS } from './../lexer/tokens'
import { Integer } from './classes/expressions/Integer'
import { Float } from './classes/expressions/Float'
import { Grouping } from './classes/expressions/Grouping'
import { expression } from './expression'
import { parseError } from './parseError'
import { String_ } from './classes/expressions/String'
import { Boolean } from './classes/expressions/Boolean'
import { Identifier } from './classes/expressions/Identifier'
import { args } from './args'
import { FunctionCall } from './classes/expressions/FunctionCall'
import { expectToken } from './utils/expectToken'

export function primary(current, tokens) {
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
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_TRUE)) {
        return {
            node: new Boolean(true, currentToken.line),
            current: current + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FALSE)) {
        return {
            node: new Boolean(false, currentToken.line),
            current: current + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_STRING)) {
        return {
            node: new String_(
                currentToken.lexeme.slice(1, -1),
                currentToken.line
            ),
            current: current + 1,
            tokens,
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_LPAREN)) {
        const expressionResult = expression(current + 1, tokens)
        const expressionNode = expressionResult.node
        const expressionExitCursor = expressionResult.current
        const expressionExitToken = tokens[expressionExitCursor]

        if (expressionExitCursor >= tokens.length) {
            parseError("Error: ')' expected.", currentToken.line)
        }

        if (!matchTokenType(expressionExitToken.tokenType, TOKENS.TOK_RPAREN)) {
            parseError("Error: ')' expected.", currentToken.line)
        } else {
            return {
                node: new Grouping(expressionNode, currentToken.line),
                current: expressionExitCursor + 1,
                tokens,
            }
        }
    } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_IDENTIFIER)) {
        const next = current + 1
        const openBracketToken = next < tokens.length ? tokens[next] : undefined
        if (
            openBracketToken !== undefined &&
            matchTokenType(openBracketToken.tokenType, TOKENS.TOK_LPAREN)
        ) {
            const argumentsResult = args(current + 2, tokens)
            const argumentsResultExitCursor = argumentsResult.current

            const closeBracketToken = tokens[argumentsResultExitCursor]

            expectToken(
                closeBracketToken.tokenType,
                TOKENS.TOK_RPAREN,
                closeBracketToken.line
            )

            return {
                node: new FunctionCall(
                    currentToken.lexeme,
                    argumentsResult.node,
                    currentToken.line
                ),
                current: argumentsResultExitCursor + 1,
                tokens,
            }
        } else {
            return {
                node: new Identifier(currentToken.lexeme, currentToken.line),
                current: current + 1,
                tokens,
            }
        }
    }
}
