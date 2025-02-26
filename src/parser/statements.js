import { Statements } from './classes/statement/Statements'
import { statement } from './statement'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'

export function statements(current, tokens) {
    let statements = []

    let cursor = current

    while (
        cursor < tokens.length &&
        !matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_ELSE) &&
        !matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_END)
    ) {
        const currentStatement = statement(cursor, tokens)

        statements.push(currentStatement.node)

        cursor = currentStatement.current
    }

    return {
        node: new Statements(statements, tokens[current].line),
        current: cursor,
        tokens,
    }
}
