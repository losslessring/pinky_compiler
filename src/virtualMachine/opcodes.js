import { TYPES } from './../interpreter/types'
import { vmError } from './vmError'
import { Frame } from './classes/Frame'

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
    ADD: function (vm, operationName, operation) {
        const { type: rightType, value: rightValue } = this.POP(vm)
        const { type: leftType, value: leftValue } = this.POP(vm)

        if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
            this.PUSH(vm, {
                type: TYPES.TYPE_NUMBER,
                value: leftValue + rightValue,
            })
        } else if (
            leftType === TYPES.TYPE_STRING ||
            rightType === TYPES.TYPE_STRING
        ) {
            this.PUSH(vm, {
                type: TYPES.TYPE_STRING,
                value: String(leftValue) + String(rightValue),
            })
        } else {
            vmError(
                `Error on ${operationName} between ${leftType} and ${rightType} at ${
                    vm.programCounter - 1
                }.`
            )
        }
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
        if (!vmOptions || vmOptions?.consoleOutput?.enable) {
            process.stdout.write(value.toString())
        }
        if (vmOptions?.executionLog?.enable) {
            vmOptions?.executionLog?.logFunction(value.toString())
        }
    },
    PRINTLN: function (vm, argument, vmOptions) {
        const { type, value } = this.POP(vm)
        if (!vmOptions || vmOptions?.consoleOutput?.enable) {
            console.log(value.toString())
        }
        if (vmOptions?.executionLog?.enable) {
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
    JSR: function (vm, label) {
        this._jumpErrorsCheck(vm, label)

        const { type, value } = this.POP(vm)
        const numberOfArguments = value
        const basePointer = vm.stackPointer - numberOfArguments
        const newFrame = new Frame(label, vm.programCounter, basePointer)
        vm.frames.push(newFrame)
        vm.programCounter = vm.labels[label.value]
    },
    RTS: function (vm) {
        const lastFrame = vm.frames[vm.frames.length - 1]
        const result = vm.stack[vm.stackPointer - 1]

        while (vm.stackPointer > lastFrame.framePointer) {
            this.POP(vm)
        }
        this.PUSH(vm, result)
        vm.programCounter = lastFrame.returnProgramCounter
        vm.frames.pop()
    },
    STORE_GLOBAL: function (vm, symbolDescriptor) {
        if (symbolDescriptor === undefined) {
            vmError(`Error on STORE_GLOBAL missing symbol descriptor object.`)
        }
        if (symbolDescriptor.value === undefined) {
            vmError(
                `Error on STORE_GLOBAL missing value in symbol descriptor object.`
            )
        }
        vm.globals[symbolDescriptor.value] = this.POP(vm)
    },
    LOAD_GLOBAL: function (vm, symbolDescriptor) {
        if (symbolDescriptor === undefined) {
            vmError(`Error on STORE_GLOBAL missing symbol descriptor object.`)
        }
        if (symbolDescriptor.value === undefined) {
            vmError(
                `Error on STORE_GLOBAL missing value in symbol descriptor object.`
            )
        }
        this.PUSH(vm, vm.globals[symbolDescriptor.value])
    },
    STORE_LOCAL: function (vm, slot) {
        if (slot === undefined) {
            vmError(`Error on STORE_LOCAL missing the slot.`)
        }
        if (slot.value === undefined) {
            vmError(`Error on STORE_LOCAL missing the slot value.`)
        }
        if (vm.frames.length > 0) {
            const offsetFrame =
                slot.value + vm.frames[vm.frames.length - 1].framePointer
            vm.stack[offsetFrame] = this.POP(vm)
        } else {
            vm.stack[slot.value] = this.POP(vm)
        }
    },
    LOAD_LOCAL: function (vm, slot) {
        if (slot === undefined) {
            vmError(`Error on LOAD_LOCAL missing the slot.`)
        }
        if (slot.value === undefined) {
            vmError(`Error on LOAD_LOCAL missing the slot value.`)
        }

        if (vm.frames.length > 0) {
            const offsetFrame =
                slot.value + vm.frames[vm.frames.length - 1].framePointer
            this.PUSH(vm, vm.stack[offsetFrame])
        } else {
            this.PUSH(vm, vm.stack[slot.value])
        }
    },
    SET_SLOT: function (vm, slot) {},
    HALT: function (vm) {
        vm.isRunning = false
    },
}
