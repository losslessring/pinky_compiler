export function prettifyVMCode(printFn, code) {
    code.forEach((instruction) => {
        if (instruction?.command === 'LABEL') {
            printFn(`${instruction.argument.value}:`)
        } else if (
            instruction?.command !== undefined &&
            instruction?.argument?.value !== undefined
        ) {
            printFn(`    ${instruction.command} ${instruction.argument.value}`)
        }

        if (instruction?.argument === undefined) {
            printFn(`    ${instruction.command}`)
        }
    })
}
