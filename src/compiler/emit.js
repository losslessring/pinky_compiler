export function emit(compiler, instruction) {
    compiler.code.push(instruction)
    return compiler
}
