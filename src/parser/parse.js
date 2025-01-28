import { primary } from './primary'

export function parse(current, tokens) {
    const ast = primary(current, tokens)
    return ast
}
