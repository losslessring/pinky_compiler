import { expression } from './expression'
import { PrintStatement } from './classes/statement/PrintStatement'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { IfStatement } from './classes/statement/IfStatement'
import { statements } from './statements'
import { parseError } from './parseError'

export function ifStatement(current, tokens) {
    if (current >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in if statement')
    }

    const ifToken = tokens[current]

    if (!tokens[current]) {
        throw new Error('Tried to access an unexisting token in if statement')
    }

    expectToken(ifToken.tokenType, TOKENS.TOK_IF, ifToken.line)

    const testConditionResult = expression(current + 1, tokens)

    const testConditionExitCursor = testConditionResult.current

    const thenToken = tokens[testConditionExitCursor]

    expectToken(thenToken.tokenType, TOKENS.TOK_THEN, thenToken.line)

    const thenStatements = statements(testConditionExitCursor + 1, tokens)

    const thenStatementsExitCursor = thenStatements.current

    if (thenStatementsExitCursor >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in then statements')
    }

    const elseToken = tokens[thenStatementsExitCursor]

    let elseStatements

    if (matchTokenType(elseToken.tokenType, TOKENS.TOK_ELSE)) {
        elseStatements = statements(thenStatementsExitCursor + 1, tokens)
    } else {
        elseStatements = undefined
    }
    const elseStatementsExitCursor = elseStatements
        ? elseStatements.current
        : thenStatementsExitCursor

    if (elseStatementsExitCursor >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in else statements')
    }

    const endToken = tokens[elseStatementsExitCursor]

    expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line)

    const endTokenExitCursor = elseStatementsExitCursor + 1

    return {
        node: new IfStatement(
            testConditionResult.node,
            thenStatements.node,
            elseStatements ? elseStatements.node : elseStatements,
            ifToken.line
        ),
        current: endTokenExitCursor,
        tokens,
    }
}
