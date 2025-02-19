import { logicalOr } from './logicalOr'
export function expression(current, tokens) {
    return logicalOr(current, tokens)
}
