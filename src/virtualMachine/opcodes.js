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
    _equalityOperation: function (vm, operationName, operation) {
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
    _jumpErrorsCheck: function (vm, label) {
        if (!vm) {
            vmError(`Error on JMP missing the virtual machine object.`)
        }
        if (!vm.labels) {
            vmError(`Error on JMP missing the virtual machine labels object.`)
        }
        if (!label) {
            vmError(`Error on JMP missing the label object.`)
        }
        if (!label.value) {
            vmError(`Error on JMP missing the label value.`)
        }
        if (!vm.labels[label.value]) {
            vmError(
                `Error on JMP cannot find the requested label ${label.value} at virtual machine labels.`
            )
        }
        return true
    },
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
    GT: function (vm) {
        this._compareOperation(vm, 'GT', (left, right) => left > right)
    },
    LE: function (vm) {
        this._compareOperation(vm, 'LE', (left, right) => left <= right)
    },
    GE: function (vm) {
        this._compareOperation(vm, 'GE', (left, right) => left >= right)
    },
    EQ: function (vm) {
        this._equalityOperation(vm, 'EQ', (left, right) => left === right)
    },
    NE: function (vm) {
        this._equalityOperation(vm, 'NE', (left, right) => left !== right)
    },

    PRINT: function (vm, argument, vmOptions) {
        const { type, value } = this.POP(vm)
        if (!vmOptions) {
            process.stdout.write(value.toString())
        } else if (vmOptions?.executionLog?.enable) {
            vmOptions?.executionLog?.logFunction(value.toString())
        }
    },
    PRINTLN: function (vm, argument, vmOptions) {
        const { type, value } = this.POP(vm)
        if (!vmOptions || !vmOptions?.executionLog?.enable) {
            console.log(value.toString())
        } else if (vmOptions?.executionLog?.enable) {
            vmOptions?.executionLog?.logFunction(value.toString())
        }
    },
    LABEL: function (vm, name) {},
    JMP: function (vm, label) {
        this._jumpErrorsCheck(vm, label)
        vm.programCounter = vm.labels[label.value]
    },
    JMPZ: function (vm, label) {
        this._jumpErrorsCheck(vm, label)
        const { type, value } = this.POP(vm)
        if (value === 0 || value === false) {
            vm.programCounter = vm.labels[label.value]
        }
    },
    HALT: function (vm) {
        vm.isRunning = false
    },
}
