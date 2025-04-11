import { prefixInRange } from './prefixInRange'
export function prettifyVMCode(printFn, code) {
    const defaultOptions = {
        prefix: {
            show: true,
            symbol: '0',
            range: 8,
            symbolsAfter: '    ',
        },
    }
    const prefix = (index) =>
        defaultOptions?.prefix?.show === true
            ? prefixInRange(0, index, 8) + defaultOptions.prefix.symbolsAfter
            : ''

    code.forEach((instruction, index) => {
        if (instruction?.command === 'LABEL') {
            printFn(`${prefix(index)}${instruction.argument.value}:`)
        } else if (
            instruction?.command !== undefined &&
            instruction?.argument?.value !== undefined
        ) {
            printFn(
                `${prefix(index)}    ${instruction.command} ${
                    instruction.argument.value
                }`
            )
        }

        if (instruction?.argument === undefined) {
            printFn(`${prefix(index)}    ${instruction.command}`)
        }
    })
}
