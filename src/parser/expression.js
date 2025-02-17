import { logicalAnd } from './logicalAnd'
export function expression(current, tokens) {
    return logicalAnd(current, tokens)
}
