import assert from 'assert'
import { Compiler } from './classes/Compiler'
import { enumerate } from './../utils/enumerate'
import { reverse } from './../utils/reverse'

export function getSymbol(compiler, name) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(typeof name === 'string', `${name} is not of expected String type`)

    const reversedLocals = reverse(enumerate(compiler.locals))
    let localIndex = 0
    for (const localSymbol of reversedLocals) {
        if (localSymbol.element.name === name) {
            return { symbol: localSymbol.element, index: localSymbol.index }
        }
        localIndex = localIndex + 1
    }
    const reversedGlobals = reverse(enumerate(compiler.globals))
    let globalIndex = 0
    for (const globalSymbol of reversedGlobals) {
        if (globalSymbol.element.name === name) {
            return { symbol: globalSymbol.element, index: globalSymbol.index }
        }
        globalIndex = globalIndex + 1
    }

    return undefined
}
