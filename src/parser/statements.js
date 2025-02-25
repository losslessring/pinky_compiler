import { Statements } from './classes/statement/Statements'
import { statement } from './statement'

export function statements(current, tokens) {
    let statements = []

    let cursor = current

    while (cursor < tokens.length) {
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
