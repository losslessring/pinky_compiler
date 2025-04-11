import { vmError } from './vmError'

export function createLabelTable(vm, instructions) {
    instructions.forEach((instruction, adress) => {
        const opCode = instruction?.command

        if (opCode === 'LABEL') {
            if (instruction?.argument?.value) {
                vm.labels = {
                    ...vm.labels,
                    [instruction.argument.value]: adress,
                }
            } else {
                vmError(
                    `Missing the ${opCode} value when creating labels table at ${adress} instruction.`
                )
            }
        }
    })

    return vm
}
