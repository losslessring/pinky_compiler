export function beginBlock(compiler) {
    compiler.scopeDepth = compiler.scopeDepth + 1
    return compiler
}
