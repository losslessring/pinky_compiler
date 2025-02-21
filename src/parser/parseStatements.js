import { program } from './program'

export function parseStatements(current, tokens) {
    const ast = program(current, tokens)
    return ast
}
