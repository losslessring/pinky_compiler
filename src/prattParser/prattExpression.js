import { nud } from './nud'
import { led } from './led'
import { BINDING_POWER } from './constants/bindingPower'
export function prattExpression(current, tokens, rightBindingPower = 0) {
    let leftExpressionResult = nud(current, tokens)

    const leftExpressionExitCursor = leftExpressionResult.current

    let cursor = leftExpressionExitCursor

    while (
        cursor < tokens.length &&
        BINDING_POWER[tokens[cursor].lexeme] > rightBindingPower
    ) {
        leftExpressionResult = led(cursor, tokens, leftExpressionResult)
        cursor = leftExpressionResult.current
    }
    return leftExpressionResult
}
