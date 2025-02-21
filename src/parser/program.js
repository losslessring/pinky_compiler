import { statements } from './statements'

export function program(current, tokens) {
    return statements(current, tokens)
}
