import { equality } from './equality'
export function expression(current, tokens) {
    return equality(current, tokens)
}
