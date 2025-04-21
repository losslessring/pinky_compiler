import assert from 'assert'
import { Compiler } from './classes/Compiler'

export function getSymbol(compiler, name) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(typeof name === 'string', `${name} is not of expected String type`)

    let localIndex = 0
    for (const localSymbol of compiler.locals) {
        if (localSymbol.name === name) {
            return { symbol: localSymbol, index: localIndex }
        }
        localIndex = localIndex + 1
    }

    let globalIndex = 0
    for (const globalSymbol of compiler.globals) {
        if (globalSymbol.name === name) {
            return { symbol: globalSymbol, index: globalIndex }
        }
        globalIndex = globalIndex + 1
    }

    return undefined
}
