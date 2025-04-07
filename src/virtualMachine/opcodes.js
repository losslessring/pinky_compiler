import { TYPES } from './../interpreter/types'
import { vmError } from './vmError'

export const OPCODES = {
    LABEL: function (vm, name) {},
    PUSH: function (vm, value) {
        vm.stack.push(value)
        vm.stackPointer = vm.stackPointer + 1
    },
    POP: function (vm) {
        vm.stackPointer = vm.stackPointer - 1
        return vm.stack.pop()
    },
    ADD: function (vm) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: leftValue + rightValue,
            })
        } else {
            vmError(`Error on ADD between ${leftType} and ${rightType}.`)
        }
    },
    SUB: function (vm) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: leftValue - rightValue,
            })
        } else {
            vmError(`Error on SUB between ${leftType} and ${rightType}.`)
        }
    },

    MUL: function (vm) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: leftValue * rightValue,
            })
        } else {
            vmError(`Error on MUL between ${leftType} and ${rightType}.`)
        }
    },

    DIV: function (vm) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: leftValue / rightValue,
            })
        } else {
            vmError(`Error on DIV between ${leftType} and ${rightType}.`)
        }
    },
    PRINT: function (vm) {
        const { type, value } = this.POP(vm)
        process.stdout.write(value.toString())
    },
    PRINTLN: function (vm) {
        const { type, value } = this.POP(vm)
        console.log(value.toString())
    },
    HALT: function (vm) {
        vm.isRunning = false
    },
}
