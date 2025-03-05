import { expression } from './expression'
import { PrintStatement } from './classes/statement/PrintStatement'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { IfStatement } from './classes/statement/IfStatement'
import { statements } from './statements'
import { parseError } from './parseError'
import { WhileStatement } from './classes/statement/WhileStatement'

export function whileStatement(current, tokens) {
    if (current >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in while statement')
    }

    if (!tokens[current]) {
        throw new Error(
            'Tried to access an unexisting token in while statement'
        )
    }

    const whileToken = tokens[current]

    expectToken(whileToken.tokenType, TOKENS.TOK_WHILE, whileToken.line)

    const testConditionResult = expression(current + 1, tokens)

    const testConditionExitCursor = testConditionResult.current

    const doToken = tokens[testConditionExitCursor]

    expectToken(doToken.tokenType, TOKENS.TOK_DO, doToken.line)

    const doStatements = statements(testConditionExitCursor + 1, tokens)

    const doStatementsExitCursor = doStatements.current

    if (doStatementsExitCursor >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in do statements')
    }

    const endToken = tokens[doStatementsExitCursor]

    expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line)

    const endTokenExitCursor = doStatementsExitCursor + 1

    return {
        node: new WhileStatement(
            testConditionResult.node,
            doStatements.node,
            whileToken.line
        ),
        current: endTokenExitCursor,
        tokens,
    }
}
