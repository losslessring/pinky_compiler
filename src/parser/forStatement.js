import { expression } from './expression'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { statements } from './statements'
import { ForStatement } from './classes/statement/ForStatement'
import { primary } from './primary'

export function forStatement(current, tokens) {
    if (current >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in for statement.')
    }

    if (!tokens[current]) {
        throw new Error('Tried to access an unexisting token in for statement.')
    }

    const forToken = tokens[current]

    expectToken(forToken.tokenType, TOKENS.TOK_FOR, forToken.line)

    const loopIdentifierResult = primary(current + 1, tokens)

    const loopIdentifierExitCursor = loopIdentifierResult.current

    const assignToken = tokens[loopIdentifierExitCursor]

    expectToken(assignToken.tokenType, TOKENS.TOK_ASSIGN, assignToken.line)

    const startResult = expression(loopIdentifierExitCursor + 1, tokens)

    const startExitCursor = startResult.current

    const commaToken = tokens[startExitCursor]

    expectToken(commaToken.tokenType, TOKENS.TOK_COMMA, commaToken.line)

    const endLoopConditionResult = expression(startExitCursor + 1, tokens)

    const endLoopConditionExitCursor = endLoopConditionResult.current

    const endLoopConditionToken = tokens[endLoopConditionExitCursor]

    let stepResult = undefined

    let stepExitCursor = endLoopConditionExitCursor

    if (matchTokenType(endLoopConditionToken.tokenType, TOKENS.TOK_COMMA)) {
        stepResult = expression(endLoopConditionExitCursor + 1, tokens)

        stepExitCursor = stepResult.current
    }
    const stepResultNode = stepResult ? stepResult.node : undefined

    const doToken = tokens[stepExitCursor]

    expectToken(doToken.tokenType, TOKENS.TOK_DO, doToken.line)

    const doStatements = statements(stepExitCursor + 1, tokens)

    const doStatementsExitCursor = doStatements.current

    if (doStatementsExitCursor >= tokens.length) {
        throw new Error('Tried to parse out of token bounds in do statements')
    }

    const endToken = tokens[doStatementsExitCursor]

    expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line)

    const endTokenExitCursor = doStatementsExitCursor + 1

    return {
        node: new ForStatement(
            loopIdentifierResult.node,
            startResult.node,
            endLoopConditionResult.node,
            stepResultNode,
            doStatements.node,
            forToken.line
        ),
        current: endTokenExitCursor,
        tokens,
    }
}
