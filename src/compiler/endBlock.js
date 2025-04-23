import { emit } from './emit'
export function endBlock(compiler) {
    if (compiler.scopeDepth <= 0) {
        throw new Error('Scope depth cannot be decreased to less than 0.')
    }
    compiler.scopeDepth = compiler.scopeDepth - 1

    let localCounter = compiler.locals.length - 1

    while (
        compiler.locals.length > 0 &&
        compiler.locals[localCounter].depth > compiler.scopeDepth
    ) {
        emit(compiler, { command: 'POP' })
        compiler.locals.pop()

        localCounter = localCounter - 1
    }

    return compiler
}
