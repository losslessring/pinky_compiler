import assert from 'assert'
import { Compiler } from './classes/Compiler'

export function increaseNumberOfLocals(compiler) {
    assert(
        compiler instanceof Compiler,
        `${compiler} is not of expected Compiler type`
    )

    compiler.numberOfLocals = compiler.numberOfLocals + 1
    return compiler
}
