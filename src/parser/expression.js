import { primary } from './primary'

export function expression(current, tokens) {
    return primary(current, tokens)
}
