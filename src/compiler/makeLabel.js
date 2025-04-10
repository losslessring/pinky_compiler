export function makeLabel(compiler, labelName) {
    compiler.labelCounter = compiler.labelCounter + 1
    return `${labelName}${compiler.labelCounter}`
}
