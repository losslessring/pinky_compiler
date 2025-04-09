import { TYPES } from './../interpreter/types'
import { vmError } from './vmError'

export const OPCODES = {
    _binaryOperation: function (vm, operationName, operation) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: operation(leftValue, rightValue),
            })
        } else {
            vmError(
                `Error on ${operationName} between ${leftType} and ${rightType} at ${
                    vm.programCounter - 1
                }.`
            )
        }
    },
    _logicalOperation: function (vm, operationName, operation) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: operation(leftValue, rightValue),
            })
        } else if (
            leftType === TYPES.TYPE_BOOL &&
            rightType === TYPES.TYPE_BOOL
        ) {
            this.PUSH(vm, {
                type: TYPES.TYPE_BOOL,
                value: operation(leftValue, rightValue),
            })
        } else {
            vmError(
                `Error on ${operationName} between ${leftType} and ${rightType} at ${
                    vm.programCounter - 1
                }.`
            )
        }
    },
    _compareOperation: function (vm, operationName, operation) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_BOOL,
                value: operation(leftValue, rightValue),
            })
        } else if (
            leftType === TYPES.TYPE_STRING &&
            rightType === TYPES.TYPE_STRING
        ) {
            this.PUSH(vm, {
                type: TYPES.TYPE_BOOL,
                value: operation(leftValue, rightValue),
            })
        } else {
            vmError(
                `Error on ${operationName} between ${leftType} and ${rightType} at ${
                    vm.programCounter - 1
                }.`
            )
        }
    },
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
        this._binaryOperation(vm, 'ADD', (left, right) => left + right)
    },
    SUB: function (vm) {
        this._binaryOperation(vm, 'SUB', (left, right) => left - right)
    },

    MUL: function (vm) {
        this._binaryOperation(vm, 'MUL', (left, right) => left * right)
    },

    DIV: function (vm) {
        this._binaryOperation(vm, 'DIV', (left, right) => left / right)
    },
    EXP: function (vm) {
        this._binaryOperation(vm, 'EXP', (left, right) => left ** right)
    },
    MOD: function (vm) {
        this._binaryOperation(vm, 'MOD', (left, right) => left % right)
    },
    AND: function (vm) {
        this._logicalOperation(vm, 'AND', (left, right) => left && right)
    },
    OR: function (vm) {
        this._logicalOperation(vm, 'OR', (left, right) => left || right)
    },
    XOR: function (vm) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_BOOL && rightType === TYPES.TYPE_BOOL) {
            this.PUSH(vm, {
                type: TYPES.TYPE_BOOL,
                value: !!(leftValue ^ rightValue),
            })
        } else {
            vmError(
                `Error on XOR between ${leftType} and ${rightType} at ${
                    vm.programCounter - 1
                }.`
            )
        }
    },
    NEG: function (vm) {
        const { type: operandType, value: operand } = this.POP(vm)

        if (operandType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: -operand,
            })
        } else {
            vmError(
                `Error on NEG with ${operandType} at ${vm.programCounter - 1}.`
            )
        }
    },
    LT: function (vm) {
        this._compareOperation(vm, 'LT', (left, right) => left < right)
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
