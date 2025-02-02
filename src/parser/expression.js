import { term } from './term'

export function expression(current, tokens) {
    return term(current, tokens)
}
