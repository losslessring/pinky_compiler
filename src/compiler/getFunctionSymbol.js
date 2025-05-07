import assert from 'assert'
import { Compiler } from './classes/Compiler'
import { enumerate } from './../utils/enumerate'
import { reverse } from './../utils/reverse'

export function getFunctionSymbol(compiler, name) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )
    assert(typeof name === 'string', `${name} is not of expected String type`)

    const reversedFunctions = reverse(compiler.functions)

    for (const symbol of reversedFunctions) {
        assert(
            typeof symbol.name !== undefined,
            `Symbol name should not be undefined.`
        )
        if (symbol.name === name) {
            return symbol
        }
    }

    return undefined
}
