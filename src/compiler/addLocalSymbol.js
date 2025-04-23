import assert from 'assert'
import { Symbol } from './classes/Symbol'
import { Compiler } from './classes/Compiler'

export function addLocalSymbol(compiler, symbol) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(symbol instanceof Symbol, `${symbol} is not of expected Symbol type`)
    compiler.locals.push(symbol)

    return compiler
}
