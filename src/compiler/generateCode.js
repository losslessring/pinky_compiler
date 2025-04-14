import { compile } from './compile'
import { emit } from './emit'

export function generateCode(compiler, node) {
    const labelInstruction = {
        command: 'LABEL',
        argument: { type: 'TYPE_LABEL', value: 'START' },
    }

    emit(compiler, labelInstruction)
    compile(compiler, node)

    emit(compiler, { command: 'HALT' })
    return compiler.code
}
