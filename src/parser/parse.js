import { expression } from './expression'
import { program } from './program'

export function parse(current, tokens) {
    const ast = expression(current, tokens)
    // const ast = program(current, tokens)
    return ast
}
