import assert from 'assert'
import { Compiler } from './classes/Compiler'

export function getSymbol(compiler, name) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(typeof name === 'string', `${name} is not of expected String type`)

    // const localSymbol = compiler.locals.find((symbol) => symbol.name === name)
    // if (localSymbol !== undefined) {
    //     const localIndex = compiler.locals.findIndex(
    //         (symbol) => symbol.name === name
    //     )
    //     return { symbol: localSymbol, index: localIndex }
    // }

    // const globalSymbol = compiler.globals.find((symbol) => symbol.name === name)
    // if (localSymbol !== undefined) {
    //     const globalIndex = compiler.globals.findIndex(
    //         (symbol) => symbol.name === name
    //     )

    //     return { symbol: globalSymbol, index: globalIndex }
    // }
    // return undefined

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
