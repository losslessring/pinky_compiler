export function binaryOperatorTypeError(operator, leftType, rightType, line) {
    throw new TypeError(
        `Unsupported operator '${operator}' between ${leftType} and ${rightType} in line ${line}.`
    )
}
