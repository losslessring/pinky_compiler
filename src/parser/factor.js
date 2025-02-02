import { unary } from './unary'

export function factor(current, tokens) {
    return unary(current, tokens)
}
