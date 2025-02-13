export function unaryOperatorTypeError(operator, operandType, line) {
    throw new TypeError(
        `Unsupported operator '${operator}' with ${operandType} in line ${line}.`
    )
}
