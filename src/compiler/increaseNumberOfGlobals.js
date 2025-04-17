import assert from 'assert'
import { Compiler } from './classes/Compiler'

export function increaseNumberOfGlobals(compiler) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )

    compiler.numberOfGlobals = compiler.numberOfGlobals + 1
    return compiler
}
