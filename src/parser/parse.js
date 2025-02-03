import { expression } from './expression'

export function parse(current, tokens) {
    const ast = expression(current, tokens)
    return ast
}
