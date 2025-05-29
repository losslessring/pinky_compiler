import { prattExpression } from './prattExpression'
export function prattParse(current, tokens) {
    const rightBindingPower = 0

    const ast = prattExpression(current, tokens, rightBindingPower)
    return ast
}
