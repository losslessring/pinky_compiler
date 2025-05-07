import assert from 'assert'
import { Symbol } from './classes/Symbol'
import { Compiler } from './classes/Compiler'
import { SYMBOL_TYPES } from './symbolTypes'

export function addFunctionSymbol(compiler, symbol) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(symbol instanceof Symbol, `${symbol} is not of expected Symbol type`)

    assert(
        symbol.symbolType === SYMBOL_TYPES.FUNCTION,
        `${symbol} is not of expected ${SYMBOL_TYPES.FUNCTION} Symbol type.`
    )

    compiler.functions.push(symbol)

    return compiler
}
