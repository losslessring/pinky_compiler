import { expression } from './expression'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { IfStatement } from './classes/statement/IfStatement'
import { statements } from './statements'
import { parseError } from './parseError'
import { parameters } from './parameters'
import { FunctionDeclaration } from './classes/statement/FunctionDeclaration'

export function functionDeclaration(current, tokens) {
    const functionToken = tokens[current]

    expectToken(functionToken.tokenType, TOKENS.TOK_FUNC, functionToken.line)

    const functionNameToken = tokens[current + 1]

    expectToken(
        functionNameToken.tokenType,
        TOKENS.TOK_IDENTIFIER,
        functionNameToken.line
    )

    const openBracketToken = tokens[current + 2]

    const parametersResult = parameters(current + 3, tokens)
    const parametersExitCursor = parametersResult.current

    const closeBracketToken = tokens[parametersExitCursor]

    expectToken(
        closeBracketToken.tokenType,
        TOKENS.TOK_RPAREN,
        closeBracketToken.line
    )

    const bodyStatements = statements(parametersExitCursor + 1, tokens)

    const bodyStatementsExitCursor = bodyStatements.current

    const endToken = tokens[bodyStatementsExitCursor]

    expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line)

    const endTokenExitCursor = bodyStatementsExitCursor + 1

    return {
        node: new FunctionDeclaration(
            functionNameToken.lexeme,
            parametersResult.node,
            bodyStatements.node,
            functionToken.line
        ),
        current: endTokenExitCursor,
        tokens,
    }
}
