import { Statements } from './classes/statement/Statements'
import { statement } from './statement'

export function statements(current, tokens) {
    let statements = []

    let cursor = current

    while (cursor < tokens.length) {
        const currentStatement = statement(current, tokens)
        // console.log(currentStatement.node)
        statements.push(currentStatement.node)

        cursor = currentStatement.current
    }
    // const previousToken = tokens[current - 1]
    // return Statements(statements, previousToken.line)
    return {
        node: new Statements(statements, tokens[current].line),
        current: cursor,
        tokens,
    }
}
