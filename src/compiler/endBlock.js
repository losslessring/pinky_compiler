export function endBlock(compiler) {
    if (compiler.scopeDepth <= 0) {
        throw new Error('Scope depth cannot be decreased to less than 0.')
    }
    compiler.scopeDepth = compiler.scopeDepth - 1
    return compiler
}
