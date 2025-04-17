import assert from 'assert'
import { Compiler } from './classes/Compiler'

export function getSymbol(compiler, name) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(typeof name === 'string', `${name} is not of expected String type`)

    return compiler.globals.find((symbol) => symbol.name === name)
}
