var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// tests/virtualMachine/runVM.test.js
var runVM_test_exports = {};
__export(runVM_test_exports, {
  run_VM_test: () => run_VM_test
});

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// node_modules/ramda/es/internal/_arrayFromIterator.js
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

// node_modules/ramda/es/internal/_includesWith.js
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

// node_modules/ramda/es/internal/_functionName.js
function _functionName(f) {
  var match2 = String(f).match(/^function (\w*)/);
  return match2 == null ? "" : match2[1];
}

// node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/ramda/es/internal/_objectIs.js
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

// node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// node_modules/ramda/es/type.js
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type_default = type;

// node_modules/ramda/es/internal/_equals.js
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (objectIs_default(a, b)) {
    return true;
  }
  var typeA = type_default(a);
  if (typeA !== type_default(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && objectIs_default(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!objectIs_default(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys_default(a);
  if (keysA.length !== keys_default(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

// node_modules/ramda/es/equals.js
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
var equals_default = equals;

// testingLibrary/testingLibrary.js
var logColors = {
  Reset: "\x1B[0m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgWhite: "\x1B[37m",
  FgGray: "\x1B[90m"
};
var loggerFn = console.log;
var LOG_LEVEL = "error";
var TestMatchers = class {
  constructor({
    actual,
    logColors: logColors2,
    logFn = console.log,
    logLevel = LOG_LEVEL
  }) {
    this.actual = actual;
    this.logFn = logFn;
    this.logColors = logColors2;
    this.logLevel = logLevel;
  }
  toBe(expected) {
    if (equals_default(expected, this.actual)) {
      if (this.logLevel === "all") {
        this.logFn(
          `${this.logColors.FgGreen}Succeeded${this.logColors.Reset}`
        );
      }
    } else {
      this.logFn(
        `${this.logColors.FgRed}Test failed
Actual:
${JSON.stringify(
          this.actual
        )}
                
Expected:
${JSON.stringify(expected)}
${this.logColors.Reset}`
      );
      throw new Error();
    }
  }
  toBeTruthy() {
    if (this.actual) {
      this.logFn(`Succeeded`);
    } else {
      this.logFn(
        `Fail - Expected value to be truthy but got ${this.actual}`
      );
      throw new Error(
        `Fail - Expected value to be truthy but got ${this.actual}`
      );
    }
  }
};
function expect(actual) {
  return new TestMatchers({ actual, logColors, logFn: loggerFn });
}
function describe(suiteName, fn, logFn = loggerFn, logLevel = LOG_LEVEL) {
  try {
    if (logLevel === "all") {
      logFn(`suite: ${suiteName}`);
    }
    fn();
  } catch (err) {
    logFn(
      `${logColors.FgRed}suite: ${suiteName}
${err.message}${logColors.Reset}`
    );
  }
}
function it(testName, fn, logFn = loggerFn, logLevel = LOG_LEVEL) {
  if (logLevel === "all") {
    logFn(`test: ${testName}`);
  }
  try {
    fn();
  } catch (err) {
    logFn(`${logColors.FgRed}${err.message}${logColors.Reset}`);
    throw new Error(`test: ${testName}`);
  }
}

// src/compiler/classes/Compiler.js
var Compiler = class {
  constructor() {
    this.code = [];
    this.locals = [];
    this.globals = [];
    this.functions = [];
    this.scopeDepth = 0;
    this.labelCounter = 0;
  }
};

// src/virtualMachine/classes/VirtualMachine.js
var VirtualMachine = class {
  constructor() {
    this.stack = [];
    this.frames = [];
    this.labels = {};
    this.globals = {};
    this.programCounter = 0;
    this.stackPointer = 0;
    this.isRunning = false;
  }
};

// src/virtualMachine/runVM.js
import assert from "assert";

// src/interpreter/types.js
var TYPES = {
  TYPE_NUMBER: "TYPE_NUMBER",
  TYPE_STRING: "TYPE_STRING",
  TYPE_BOOL: "TYPE_BOOL",
  TYPE_LABEL: "TYPE_LABEL",
  TYPE_SYMBOL: "TYPE_SYMBOL",
  TYPE_STACK_SLOT: "TYPE_STACK_SLOT"
};

// src/virtualMachine/vmError.js
function vmError(message) {
  throw new Error(message);
}

// src/virtualMachine/classes/Frame.js
var Frame = class {
  constructor(name, returnProgramCounter, framePointer) {
    this.name = name;
    this.returnProgramCounter = returnProgramCounter;
    this.framePointer = framePointer;
  }
};

// src/virtualMachine/opcodes.js
var OPCODES = {
  _binaryOperation: function(vm, operationName, operation) {
    const { type: rightType, value: rightValue } = this.POP(vm);
    const { type: leftType, value: leftValue } = this.POP(vm);
    if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
      this.PUSH(vm, {
        type: TYPES.TYPE_NUMBER,
        value: operation(leftValue, rightValue)
      });
    } else {
      vmError(
        `Error on ${operationName} between ${leftType} and ${rightType} at ${vm.programCounter - 1}.`
      );
    }
  },
  _logicalOperation: function(vm, operationName, operation) {
    const { type: rightType, value: rightValue } = this.POP(vm);
    const { type: leftType, value: leftValue } = this.POP(vm);
    if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
      this.PUSH(vm, {
        type: TYPES.TYPE_NUMBER,
        value: operation(leftValue, rightValue)
      });
    } else if (leftType === TYPES.TYPE_BOOL && rightType === TYPES.TYPE_BOOL) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: operation(leftValue, rightValue)
      });
    } else {
      vmError(
        `Error on ${operationName} between ${leftType} and ${rightType} at ${vm.programCounter - 1}.`
      );
    }
  },
  _compareOperation: function(vm, operationName, operation) {
    const { type: rightType, value: rightValue } = this.POP(vm);
    const { type: leftType, value: leftValue } = this.POP(vm);
    if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: operation(leftValue, rightValue)
      });
    } else if (leftType === TYPES.TYPE_STRING && rightType === TYPES.TYPE_STRING) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: operation(leftValue, rightValue)
      });
    } else {
      vmError(
        `Error on ${operationName} between ${leftType} and ${rightType} at ${vm.programCounter - 1}.`
      );
    }
  },
  _equalityOperation: function(vm, operationName, operation) {
    const { type: rightType, value: rightValue } = this.POP(vm);
    const { type: leftType, value: leftValue } = this.POP(vm);
    if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: operation(leftValue, rightValue)
      });
    } else if (leftType === TYPES.TYPE_STRING && rightType === TYPES.TYPE_STRING) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: operation(leftValue, rightValue)
      });
    } else if (leftType === TYPES.TYPE_BOOL && rightType === TYPES.TYPE_BOOL) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: operation(leftValue, rightValue)
      });
    } else {
      vmError(
        `Error on ${operationName} between ${leftType} and ${rightType} at ${vm.programCounter - 1}.`
      );
    }
  },
  _jumpErrorsCheck: function(vm, label) {
    if (!vm) {
      vmError(`Error on JMP missing the virtual machine object.`);
    }
    if (!vm.labels) {
      vmError(`Error on JMP missing the virtual machine labels object.`);
    }
    if (!label) {
      vmError(`Error on JMP missing the label object.`);
    }
    if (!label.value) {
      vmError(`Error on JMP missing the label value.`);
    }
    if (!vm.labels[label.value]) {
      vmError(
        `Error on JMP cannot find the requested label ${label.value} at virtual machine labels.`
      );
    }
    return true;
  },
  PUSH: function(vm, value) {
    vm.stack.push(value);
    vm.stackPointer = vm.stackPointer + 1;
  },
  POP: function(vm) {
    vm.stackPointer = vm.stackPointer - 1;
    return vm.stack.pop();
  },
  ADD: function(vm, operationName, operation) {
    const { type: rightType, value: rightValue } = this.POP(vm);
    const { type: leftType, value: leftValue } = this.POP(vm);
    if (leftType === TYPES.TYPE_NUMBER && rightType === TYPES.TYPE_NUMBER) {
      this.PUSH(vm, {
        type: TYPES.TYPE_NUMBER,
        value: leftValue + rightValue
      });
    } else if (leftType === TYPES.TYPE_STRING || rightType === TYPES.TYPE_STRING) {
      this.PUSH(vm, {
        type: TYPES.TYPE_STRING,
        value: String(leftValue) + String(rightValue)
      });
    } else {
      vmError(
        `Error on ${operationName} between ${leftType} and ${rightType} at ${vm.programCounter - 1}.`
      );
    }
  },
  SUB: function(vm) {
    this._binaryOperation(vm, "SUB", (left, right) => left - right);
  },
  MUL: function(vm) {
    this._binaryOperation(vm, "MUL", (left, right) => left * right);
  },
  DIV: function(vm) {
    this._binaryOperation(vm, "DIV", (left, right) => left / right);
  },
  EXP: function(vm) {
    this._binaryOperation(vm, "EXP", (left, right) => left ** right);
  },
  MOD: function(vm) {
    this._binaryOperation(vm, "MOD", (left, right) => left % right);
  },
  AND: function(vm) {
    this._logicalOperation(vm, "AND", (left, right) => left && right);
  },
  OR: function(vm) {
    this._logicalOperation(vm, "OR", (left, right) => left || right);
  },
  XOR: function(vm) {
    const { type: rightType, value: rightValue } = this.POP(vm);
    const { type: leftType, value: leftValue } = this.POP(vm);
    if (leftType === TYPES.TYPE_BOOL && rightType === TYPES.TYPE_BOOL) {
      this.PUSH(vm, {
        type: TYPES.TYPE_BOOL,
        value: !!(leftValue ^ rightValue)
      });
    } else {
      vmError(
        `Error on XOR between ${leftType} and ${rightType} at ${vm.programCounter - 1}.`
      );
    }
  },
  NEG: function(vm) {
    const { type: operandType, value: operand } = this.POP(vm);
    if (operandType === TYPES.TYPE_NUMBER) {
      this.PUSH(vm, {
        type: TYPES.TYPE_NUMBER,
        value: -operand
      });
    } else {
      vmError(
        `Error on NEG with ${operandType} at ${vm.programCounter - 1}.`
      );
    }
  },
  LT: function(vm) {
    this._compareOperation(vm, "LT", (left, right) => left < right);
  },
  GT: function(vm) {
    this._compareOperation(vm, "GT", (left, right) => left > right);
  },
  LE: function(vm) {
    this._compareOperation(vm, "LE", (left, right) => left <= right);
  },
  GE: function(vm) {
    this._compareOperation(vm, "GE", (left, right) => left >= right);
  },
  EQ: function(vm) {
    this._equalityOperation(vm, "EQ", (left, right) => left === right);
  },
  NE: function(vm) {
    this._equalityOperation(vm, "NE", (left, right) => left !== right);
  },
  PRINT: function(vm, argument, vmOptions) {
    const { type: type3, value } = this.POP(vm);
    if (!vmOptions || vmOptions?.consoleOutput?.enable) {
      process.stdout.write(value.toString());
    }
    if (vmOptions?.executionLog?.enable) {
      vmOptions?.executionLog?.logFunction(value.toString());
    }
  },
  PRINTLN: function(vm, argument, vmOptions) {
    const { type: type3, value } = this.POP(vm);
    if (!vmOptions || vmOptions?.consoleOutput?.enable) {
      console.log(value.toString());
    }
    if (vmOptions?.executionLog?.enable) {
      vmOptions?.executionLog?.logFunction(value.toString());
    }
  },
  LABEL: function(vm, name) {
  },
  JMP: function(vm, label) {
    this._jumpErrorsCheck(vm, label);
    vm.programCounter = vm.labels[label.value];
  },
  JMPZ: function(vm, label) {
    this._jumpErrorsCheck(vm, label);
    const { type: type3, value } = this.POP(vm);
    if (value === 0 || value === false) {
      vm.programCounter = vm.labels[label.value];
    }
  },
  JSR: function(vm, label) {
    this._jumpErrorsCheck(vm, label);
    const { type: type3, value } = this.POP(vm);
    const numberOfArguments = value;
    const basePointer = vm.stackPointer - numberOfArguments;
    const newFrame = new Frame(label, vm.programCounter, basePointer);
    vm.frames.push(newFrame);
    vm.programCounter = vm.labels[label.value];
  },
  RTS: function(vm) {
    const lastFrame = vm.frames[vm.frames.length - 1];
    vm.programCounter = lastFrame.returnProgramCounter;
    vm.frames.pop();
  },
  STORE_GLOBAL: function(vm, symbolDescriptor) {
    if (symbolDescriptor === void 0) {
      vmError(`Error on STORE_GLOBAL missing symbol descriptor object.`);
    }
    if (symbolDescriptor.value === void 0) {
      vmError(
        `Error on STORE_GLOBAL missing value in symbol descriptor object.`
      );
    }
    vm.globals[symbolDescriptor.value] = this.POP(vm);
  },
  LOAD_GLOBAL: function(vm, symbolDescriptor) {
    if (symbolDescriptor === void 0) {
      vmError(`Error on STORE_GLOBAL missing symbol descriptor object.`);
    }
    if (symbolDescriptor.value === void 0) {
      vmError(
        `Error on STORE_GLOBAL missing value in symbol descriptor object.`
      );
    }
    this.PUSH(vm, vm.globals[symbolDescriptor.value]);
  },
  STORE_LOCAL: function(vm, slot) {
    if (slot === void 0) {
      vmError(`Error on STORE_LOCAL missing the slot.`);
    }
    if (slot.value === void 0) {
      vmError(`Error on STORE_LOCAL missing the slot value.`);
    }
    if (vm.frames.length > 0) {
      const offsetFrame = slot.value + vm.frames[vm.frames.length - 1].framePointer;
      vm.stack[offsetFrame] = this.POP(vm);
    } else {
      vm.stack[slot.value] = this.POP(vm);
    }
  },
  LOAD_LOCAL: function(vm, slot) {
    if (slot === void 0) {
      vmError(`Error on LOAD_LOCAL missing the slot.`);
    }
    if (slot.value === void 0) {
      vmError(`Error on LOAD_LOCAL missing the slot value.`);
    }
    if (vm.frames.length > 0) {
      const offsetFrame = slot.value + vm.frames[vm.frames.length - 1].framePointer;
      this.PUSH(vm, vm.stack[offsetFrame]);
    } else {
      this.PUSH(vm, vm.stack[slot.value]);
    }
  },
  SET_SLOT: function(vm, slot) {
  },
  HALT: function(vm) {
    vm.isRunning = false;
  }
};

// src/virtualMachine/createLabelTable.js
function createLabelTable(vm, instructions) {
  instructions.forEach((instruction, adress) => {
    const opCode = instruction?.command;
    if (opCode === "LABEL") {
      if (instruction?.argument?.value) {
        vm.labels = {
          ...vm.labels,
          [instruction.argument.value]: adress
        };
      } else {
        vmError(
          `Missing the ${opCode} value when creating labels table at ${adress} instruction.`
        );
      }
    }
  });
  return vm;
}

// src/virtualMachine/runVM.js
function runVM(vm, instructions, vmOptions) {
  assert(
    vm instanceof VirtualMachine,
    `${vm} is not of expected VirtualMachine type`
  );
  vm.programCounter = 0;
  vm.stackPointer = 0;
  vm.isRunning = true;
  createLabelTable(vm, instructions);
  while (vm.isRunning === true) {
    const instruction = instructions[vm.programCounter];
    vm.programCounter = vm.programCounter + 1;
    const opCode = instruction.command;
    const argument = instruction.argument === void 0 ? "" : instruction.argument;
    if (typeof OPCODES[opCode] !== "function") {
      throw new Error(`Unrecognized VM instruction ${opCode}.`);
    }
    OPCODES[opCode](vm, argument, vmOptions);
  }
  return { vm, instructions, log: vmOptions?.executionLog?.log };
}

// src/lexer/tokens.js
var TOKENS = {
  //Single-char tokens
  TOK_LPAREN: "TOK_LPAREN",
  TOK_RPAREN: "TOK_RPAREN",
  TOK_LCURLY: "TOK_LCURLY",
  TOK_RCURLY: "TOK_RCURLY",
  TOK_LSQUAR: "TOK_LSQUAR",
  TOK_RSQUAR: "TOK_RSQUAR",
  TOK_COMMA: "TOK_COMMA",
  TOK_DOT: "TOK_DOT",
  TOK_PLUS: "TOK_PLUS",
  TOK_MINUS: "TOK_MINUS",
  TOK_STAR: "TOK_STAR",
  TOK_SLASH: "TOK_SLASH",
  TOK_CARET: "TOK_CARET",
  TOK_MOD: "TOK_MOD",
  TOK_COLON: "TOK_COLON",
  // :
  TOK_SEMICOLON: "TOK_SEMICOLON",
  TOK_QUESTION: "TOK_QUESTION",
  TOK_NOT: "TOK_NOT",
  // ~
  TOK_GT: "TOK_GT",
  TOK_LT: "TOK_LT",
  TOK_EQ: "TOK_EQ",
  // =
  // Two-char tokens
  TOK_EQEQ: "TOK_EQEQ",
  // ==
  TOK_GE: "TOK_GE",
  TOK_LE: "TOK_LE",
  TOK_NE: "TOK_NE",
  // ~=
  TOK_ASSIGN: "TOK_ASSIGN",
  // :=
  TOK_GTGT: "TOK_GTGT",
  TOK_LTLT: "TOK_LTLT",
  // Literals
  TOK_IDENTIFIER: "TOK_IDENTIFIER",
  TOK_STRING: "TOK_STRING",
  TOK_INTEGER: "TOK_INTEGER",
  TOK_FLOAT: "TOK_FLOAT",
  // Keywords
  TOK_IF: "TOK_IF",
  TOK_THEN: "TOK_THEN",
  TOK_ELSE: "TOK_ELSE",
  TOK_TRUE: "TOK_TRUE",
  TOK_FALSE: "TOK_FALSE",
  TOK_AND: "TOK_AND",
  TOK_OR: "TOK_OR",
  TOK_LOCAL: "TOK_LOCAL",
  TOK_WHILE: "TOK_WHILE",
  TOK_DO: "TOK_DO",
  TOK_FOR: "TOK_FOR",
  TOK_FUNC: "TOK_FUNC",
  TOK_NULL: "TOK_NULL",
  TOK_END: "TOK_END",
  TOK_PRINT: "TOK_PRINT",
  TOK_PRINTLN: "TOK_PRINTLN",
  TOK_RET: "TOK_RET"
};
var KEYWORDS = {
  if: TOKENS.TOK_IF,
  else: TOKENS.TOK_ELSE,
  then: TOKENS.TOK_THEN,
  true: TOKENS.TOK_TRUE,
  false: TOKENS.TOK_FALSE,
  and: TOKENS.TOK_AND,
  or: TOKENS.TOK_OR,
  local: TOKENS.TOK_LOCAL,
  while: TOKENS.TOK_WHILE,
  do: TOKENS.TOK_DO,
  for: TOKENS.TOK_FOR,
  func: TOKENS.TOK_FUNC,
  null: TOKENS.TOK_NULL,
  end: TOKENS.TOK_END,
  print: TOKENS.TOK_PRINT,
  println: TOKENS.TOK_PRINTLN,
  ret: TOKENS.TOK_RET
};

// src/lexer/Token.js
var Token = class {
  constructor(tokenType, lexeme, line) {
    this.tokenType = tokenType;
    this.lexeme = lexeme;
    this.line = line;
  }
  toString() {
    return `${this.tokenType}, ${this.lexeme}, ${this.line}`;
  }
};

// src/lexer/createToken.js
function createToken({ tokenType, source, lexemeStart, cursor, line }) {
  return new Token(tokenType, source.slice(lexemeStart, cursor), line);
}

// src/lexer/peek.js
function peek(cursor, source) {
  return source[cursor];
}

// src/lexer/match.js
function match(expected, cursor, source) {
  if (source[cursor] !== expected) {
    return false;
  }
  return true;
}

// src/lexer/isCharInteger.js
function isCharInteger(cursor, source) {
  return Number.isInteger(parseInt(source[cursor]));
}

// src/lexer/lookahead.js
function lookahead(currentIndex, n, source) {
  return source[currentIndex + n];
}

// src/lexer/tokenizeNumber.js
function tokenizeNumber(cursor, source) {
  while (isCharInteger(cursor, source)) {
    cursor++;
  }
  if (peek(cursor, source) === "." && Number.isInteger(parseInt(lookahead(cursor, 1, source)))) {
    cursor++;
    while (isCharInteger(cursor, source)) {
      cursor++;
    }
    return {
      cursor,
      tokenType: TOKENS.TOK_FLOAT
    };
  } else {
    return {
      cursor,
      tokenType: TOKENS.TOK_INTEGER
    };
  }
}

// src/lexer/consumeString.js
function consumeString(startQuote, cursor, line, source) {
  while (!match(startQuote, cursor, source) && cursor <= source.length) {
    cursor++;
  }
  if (cursor >= source.length) {
    throw new SyntaxError(`Line ${line} Unterminated string.`);
  }
  cursor++;
  return cursor;
}

// src/lexer/isLetter.js
function isLetter(char) {
  return /^[A-Z]$/i.test(char);
}

// src/lexer/consumeIdentifier.js
function consumeIdentifier(cursor, source) {
  while (isLetter(peek(cursor, source)) || isCharInteger(cursor, source) || match("_", cursor, source)) {
    cursor++;
  }
  return cursor;
}

// src/lexer/tokenize.js
function tokenize({ source, current, start, line, tokens }) {
  const newTokens = [...tokens];
  let cursor = current;
  let lexemeStart = start;
  let lineCursor = line;
  const createToken_ = (tokenType, cursorShift = 0) => createToken({
    tokenType,
    source,
    lexemeStart,
    cursor: cursor + cursorShift,
    line: lineCursor
  });
  const addToken = (tokenType) => newTokens.push(createToken_(tokenType));
  const addMulticharToken = (tokenType) => newTokens.push(createToken_(tokenType));
  while (cursor < source.length) {
    const currentCharacter = source[cursor];
    cursor++;
    if (currentCharacter === "\n") {
      lineCursor = lineCursor + 1;
    } else if (currentCharacter === " ") {
    } else if (currentCharacter === "	") {
    } else if (currentCharacter === "\r") {
    } else if (currentCharacter === "-") {
      if (match("-", cursor, source)) {
        while (peek(cursor, source) !== "\n" && cursor <= source.length) {
          cursor++;
        }
      } else {
        addToken(TOKENS.TOK_MINUS);
      }
    } else if (currentCharacter === "(") {
      addToken(TOKENS.TOK_LPAREN);
    } else if (currentCharacter === ")") {
      addToken(TOKENS.TOK_RPAREN);
    } else if (currentCharacter === "{") {
      addToken(TOKENS.TOK_LCURLY);
    } else if (currentCharacter === "}") {
      addToken(TOKENS.TOK_RCURLY);
    } else if (currentCharacter === "[") {
      addToken(TOKENS.TOK_LSQUAR);
    } else if (currentCharacter === "]") {
      addToken(TOKENS.TOK_RSQUAR);
    } else if (currentCharacter === ".") {
      addToken(TOKENS.TOK_DOT);
    } else if (currentCharacter === ",") {
      addToken(TOKENS.TOK_COMMA);
    } else if (currentCharacter === "+") {
      addToken(TOKENS.TOK_PLUS);
    } else if (currentCharacter === "-") {
      addToken(TOKENS.TOK_MINUS);
    } else if (currentCharacter === "*") {
      addToken(TOKENS.TOK_STAR);
    } else if (currentCharacter === "^") {
      addToken(TOKENS.TOK_CARET);
    } else if (currentCharacter === "/") {
      addToken(TOKENS.TOK_SLASH);
    } else if (currentCharacter === ";") {
      addToken(TOKENS.TOK_SEMICOLON);
    } else if (currentCharacter === "?") {
      addToken(TOKENS.TOK_QUESTION);
    } else if (currentCharacter === "%") {
      addToken(TOKENS.TOK_MOD);
    } else if (currentCharacter === "=") {
      if (match("=", cursor, source)) {
        cursor++;
        addMulticharToken(TOKENS.TOK_EQEQ);
      } else
        addToken(TOKENS.TOK_EQ);
    } else if (currentCharacter === "~") {
      if (match("=", cursor, source)) {
        cursor++;
        addMulticharToken(TOKENS.TOK_NE);
      } else
        addToken(TOKENS.TOK_NOT);
    } else if (currentCharacter === "<") {
      if (match("=", cursor, source)) {
        cursor++;
        addMulticharToken(TOKENS.TOK_LE);
      } else
        addToken(TOKENS.TOK_LT);
    } else if (currentCharacter === ">") {
      if (match("=", cursor, source)) {
        cursor++;
        addMulticharToken(TOKENS.TOK_GE);
      } else
        addToken(TOKENS.TOK_GT);
    } else if (currentCharacter === ":") {
      if (match("=", cursor, source)) {
        cursor++;
        addMulticharToken(TOKENS.TOK_ASSIGN);
      } else
        addToken(TOKENS.TOK_COLON);
    } else if (Number.isInteger(parseInt(currentCharacter))) {
      const { cursor: cursorMovedAhead, tokenType } = tokenizeNumber(
        cursor,
        source
      );
      cursor = cursorMovedAhead;
      addMulticharToken(tokenType);
    } else if (currentCharacter === '"' || currentCharacter === "'") {
      cursor = consumeString(currentCharacter, cursor, lineCursor, source);
      addMulticharToken(TOKENS.TOK_STRING);
    } else if (isLetter(currentCharacter) || currentCharacter === "_") {
      cursor = consumeIdentifier(cursor, source);
      const text = source.slice(lexemeStart, cursor);
      const keyword = KEYWORDS[text];
      keyword ? addMulticharToken(keyword) : addMulticharToken(TOKENS.TOK_IDENTIFIER);
    } else {
      throw new SyntaxError(
        `Line ${lineCursor}. Error at ${cursor - 1}: Unexpected character '${currentCharacter}'.`
      );
    }
    lexemeStart = cursor;
  }
  return {
    source,
    current: cursor,
    start: lexemeStart,
    line: lineCursor,
    tokens: newTokens
  };
}

// src/parser/classes/statement/Statements.js
import assert2 from "assert";

// src/parser/classes/expressions/Node.js
var Node = class {
  constructor() {
  }
};

// src/parser/classes/statement/Statement.js
var Statement = class extends Node {
  constructor() {
    super();
  }
};

// src/parser/classes/statement/Statements.js
var Statements = class extends Node {
  constructor(statements2, line) {
    super();
    statements2.forEach((statement2) => {
      assert2(
        statement2 instanceof Statement,
        `${statement2} is not of expected Statement type`
      );
    });
    this.statements = statements2;
    this.line = line;
  }
  toString() {
    return `Statements ${this.statements}`;
  }
};

// src/parser/utils/matchTokenType.js
function matchTokenType(tokenType, expectedType) {
  if (tokenType !== expectedType) {
    return false;
  } else
    return true;
}

// src/parser/classes/expressions/LogicalOperation.js
import assert3 from "assert";

// src/parser/classes/expressions/Expression.js
var Expression = class extends Node {
  constructor() {
    super();
  }
};

// src/parser/classes/expressions/LogicalOperation.js
var LogicalOperation = class extends Expression {
  constructor(operator, left, right, line) {
    super();
    assert3(
      operator instanceof Token,
      `${operator} is not of expected Token type`
    );
    assert3(
      left instanceof Expression,
      `${left} is not of expected Expression type`
    );
    assert3(
      right instanceof Expression,
      `${right} is not of expected Expression type`
    );
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.line = line;
  }
  toString() {
    return `Logical operation ${this.operator.lexeme}, ${this.left}, ${this.right}`;
  }
};

// src/parser/classes/expressions/BinaryOperation.js
import assert4 from "assert";
var BinaryOperation = class extends Expression {
  constructor(operator, left, right, line) {
    super();
    assert4(
      operator instanceof Token,
      `${operator} is not of expected Token type`
    );
    assert4(
      left instanceof Expression,
      `${left} is not of expected Expression type`
    );
    assert4(
      right instanceof Expression,
      `${right} is not of expected Expression type`
    );
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.line = line;
  }
  toString() {
    return `Binary operation ${this.operator.lexeme}, ${this.left}, ${this.right}`;
  }
};

// src/parser/classes/expressions/Integer.js
import assert5 from "assert";
var Integer = class extends Expression {
  constructor(value, line) {
    super();
    assert5(
      Number.isInteger(value),
      `${value} is not of expected integer type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `Integer ${this.value}`;
  }
};

// src/parser/classes/expressions/Float.js
var Float = class extends Expression {
  constructor(value, line) {
    super();
    this.value = value;
    this.line = line;
  }
  toString() {
    return `Float ${this.value}`;
  }
};

// src/parser/classes/expressions/Grouping.js
import assert6 from "assert";
var Grouping = class extends Expression {
  constructor(value, line) {
    super();
    assert6(
      value instanceof Expression,
      `${value} is not of expected Expression type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `Grouping ${this.value}`;
  }
};

// src/parser/parseError.js
function parseError(message, lineNumber) {
  throw new Error(`Line ${lineNumber} ${message}`);
}

// src/parser/classes/expressions/String.js
import assert7 from "assert";
var String_ = class extends Expression {
  constructor(value, line) {
    super();
    assert7(
      typeof value === "string",
      `${value} is not of expected string type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `String_ ${this.value}`;
  }
};

// src/parser/classes/expressions/Boolean.js
import assert8 from "assert";
var Boolean = class extends Expression {
  constructor(value, line) {
    super();
    assert8(
      typeof value === "boolean",
      `${value} is not of expected boolean type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `Boolean ${this.value}`;
  }
};

// src/parser/classes/expressions/Identifier.js
import assert9 from "assert";
var Identifier = class extends Expression {
  constructor(name, line) {
    super();
    assert9(
      typeof name === "string",
      `${name} is not of expected string type`
    );
    this.name = name;
    this.line = line;
  }
  toString() {
    return `Identifier ${this.name}`;
  }
};

// src/parser/utils/expectToken.js
function expectToken(tokenType, expectedType, lineNumber) {
  if (tokenType === expectedType) {
    return true;
  } else {
    parseError(`expected ${expectedType}, found ${tokenType}`, lineNumber);
  }
}

// src/parser/args.js
function args(current, tokens) {
  let args2 = [];
  let cursor = current;
  while (!matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_RPAREN)) {
    const currentArgumentResult = expression(cursor, tokens);
    const currentArgumentResultExitCursor = currentArgumentResult.current;
    args2.push(currentArgumentResult.node);
    cursor = currentArgumentResultExitCursor;
    const nextToken = tokens[cursor];
    if (!matchTokenType(nextToken.tokenType, TOKENS.TOK_RPAREN)) {
      expectToken(nextToken.tokenType, TOKENS.TOK_COMMA, nextToken.line);
      cursor++;
    }
  }
  return { node: args2, current: cursor, tokens };
}

// src/parser/classes/expressions/FunctionCall.js
import assert10 from "assert";
var FunctionCall = class extends Expression {
  constructor(name, args2, line) {
    super();
    assert10(
      typeof name === "string",
      `Constructor parameter 'name' of a FunctionDeclaration class instance with a value of ${name} of the ${name?.constructor?.name} type is not of the expected string type.`
    );
    this.name = name;
    this.args = args2;
    this.line = line;
  }
  toString() {
    return `FunctionCall ${this.name}, ${this.args}, line ${this.line}.`;
  }
};

// src/parser/primary.js
function primary(current, tokens) {
  const currentToken = tokens[current];
  if (matchTokenType(currentToken.tokenType, TOKENS.TOK_INTEGER)) {
    return {
      node: new Integer(parseInt(currentToken.lexeme), currentToken.line),
      current: current + 1,
      tokens
    };
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FLOAT)) {
    return {
      node: new Float(parseFloat(currentToken.lexeme), currentToken.line),
      current: current + 1,
      tokens
    };
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_TRUE)) {
    return {
      node: new Boolean(true, currentToken.line),
      current: current + 1,
      tokens
    };
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FALSE)) {
    return {
      node: new Boolean(false, currentToken.line),
      current: current + 1,
      tokens
    };
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_STRING)) {
    return {
      node: new String_(
        currentToken.lexeme.slice(1, -1),
        currentToken.line
      ),
      current: current + 1,
      tokens
    };
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_LPAREN)) {
    const expressionResult2 = expression(current + 1, tokens);
    const expressionNode = expressionResult2.node;
    const expressionExitCursor = expressionResult2.current;
    const expressionExitToken = tokens[expressionExitCursor];
    if (expressionExitCursor >= tokens.length) {
      parseError("Error: ')' expected.", currentToken.line);
    }
    if (!matchTokenType(expressionExitToken.tokenType, TOKENS.TOK_RPAREN)) {
      parseError("Error: ')' expected.", currentToken.line);
    } else {
      return {
        node: new Grouping(expressionNode, currentToken.line),
        current: expressionExitCursor + 1,
        tokens
      };
    }
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_IDENTIFIER)) {
    const next = current + 1;
    const openBracketToken = next < tokens.length ? tokens[next] : void 0;
    if (openBracketToken !== void 0 && matchTokenType(openBracketToken.tokenType, TOKENS.TOK_LPAREN)) {
      const argumentsResult = args(current + 2, tokens);
      const argumentsResultExitCursor = argumentsResult.current;
      const closeBracketToken = tokens[argumentsResultExitCursor];
      expectToken(
        closeBracketToken.tokenType,
        TOKENS.TOK_RPAREN,
        closeBracketToken.line
      );
      return {
        node: new FunctionCall(
          currentToken.lexeme,
          argumentsResult.node,
          currentToken.line
        ),
        current: argumentsResultExitCursor + 1,
        tokens
      };
    } else {
      return {
        node: new Identifier(currentToken.lexeme, currentToken.line),
        current: current + 1,
        tokens
      };
    }
  }
}

// src/parser/classes/expressions/UnaryOperation.js
import assert11 from "assert";
var UnaryOperation = class extends Expression {
  constructor(operator, operand, line) {
    super();
    assert11(
      operator instanceof Token,
      `${operator} is not of expected Token type`
    );
    assert11(
      operand instanceof Expression,
      `${operand} is not of expected Expression type`
    );
    this.operator = operator;
    this.operand = operand;
    this.line = line;
  }
  toString() {
    return `Unary operation ${this.operator.lexeme}, ${this.operand}`;
  }
};

// src/parser/unary.js
function unary(current, tokens) {
  const currentToken = tokens[current];
  if (matchTokenType(currentToken.tokenType, TOKENS.TOK_NOT) || matchTokenType(currentToken.tokenType, TOKENS.TOK_MINUS) || matchTokenType(currentToken.tokenType, TOKENS.TOK_PLUS)) {
    const operator = currentToken;
    const operandResult = unary(current + 1, tokens);
    const operandNode = operandResult.node;
    const operandExitCursor = operandResult.current;
    return {
      node: new UnaryOperation(operator, operandNode, currentToken.line),
      current: operandExitCursor,
      tokens
    };
  } else
    return primary(current, tokens);
}

// src/parser/exponent.js
function exponent(current, tokens) {
  let expressionResult2 = unary(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_CARET)) {
    const operator = tokens[cursor];
    const rightOperandResult = exponent(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new BinaryOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/modulo.js
function modulo(current, tokens) {
  let expressionResult2 = exponent(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_MOD)) {
    const operator = tokens[cursor];
    const rightOperandResult = exponent(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new BinaryOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/multiplication.js
function multiplication(current, tokens) {
  let expressionResult2 = modulo(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_STAR) || cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_SLASH)) {
    const operator = tokens[cursor];
    const rightOperandResult = modulo(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new BinaryOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/addition.js
function addition(current, tokens) {
  let expressionResult2 = multiplication(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_PLUS) || cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_MINUS)) {
    const operator = tokens[cursor];
    const rightOperandResult = multiplication(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new BinaryOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/comparison.js
function comparison(current, tokens) {
  let expressionResult2 = addition(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && (matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_GT) || matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_GE) || matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_LT) || matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_LE))) {
    const operator = tokens[cursor];
    const rightOperandResult = addition(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new BinaryOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/equality.js
function equality(current, tokens) {
  let expressionResult2 = comparison(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_NE) || cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_EQEQ)) {
    const operator = tokens[cursor];
    const rightOperandResult = comparison(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new BinaryOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/logicalAnd.js
function logicalAnd(current, tokens) {
  let expressionResult2 = equality(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_AND)) {
    const operator = tokens[cursor];
    const rightOperandResult = equality(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new LogicalOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/logicalOr.js
function logicalOr(current, tokens) {
  let expressionResult2 = logicalAnd(current, tokens);
  const expressionExitCursor = expressionResult2.current;
  let cursor = expressionExitCursor;
  while (cursor <= tokens.length && tokens[cursor] && matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_OR)) {
    const operator = tokens[cursor];
    const rightOperandResult = logicalAnd(cursor + 1, tokens);
    const rightOperandNode = rightOperandResult.node;
    const rightOperandExitCursor = rightOperandResult.current;
    cursor = rightOperandExitCursor;
    expressionResult2 = {
      node: new LogicalOperation(
        operator,
        expressionResult2.node,
        rightOperandNode,
        operator.line
      ),
      current: rightOperandExitCursor,
      tokens
    };
  }
  return expressionResult2;
}

// src/parser/expression.js
function expression(current, tokens) {
  return logicalOr(current, tokens);
}

// src/parser/classes/statement/PrintStatement.js
import assert12 from "assert";
var PrintStatement = class extends Statement {
  constructor(value, line) {
    super();
    assert12(
      value instanceof Expression,
      `${value} is not of expected Expression type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `PrintStatement ${this.value}, line ${this.line}`;
  }
};

// src/parser/printStatement.js
function printStatement(current, tokens) {
  const currentToken = tokens[current];
  if (current <= tokens.length && tokens[current] && matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINT)) {
    const expressionResult2 = expression(current + 1, tokens);
    const expressionExitCursor = expressionResult2.current;
    return {
      node: new PrintStatement(expressionResult2.node, currentToken.line),
      current: expressionExitCursor,
      tokens
    };
  }
  return expressionResult;
}

// src/parser/classes/statement/PrintLineStatement.js
import assert13 from "assert";
var PrintLineStatement = class extends Statement {
  constructor(value, line) {
    super();
    assert13(
      value instanceof Expression,
      `${value} is not of expected Expression type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `PrintLineStatement ${this.value}, line ${this.line}`;
  }
};

// src/parser/printLineStatement.js
function printLineStatement(current, tokens) {
  const currentToken = tokens[current];
  if (current <= tokens.length && tokens[current] && matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINTLN)) {
    const expressionResult2 = expression(current + 1, tokens);
    const expressionExitCursor = expressionResult2.current;
    return {
      node: new PrintLineStatement(
        expressionResult2.node,
        currentToken.line
      ),
      current: expressionExitCursor,
      tokens
    };
  }
  return expressionResult;
}

// src/parser/classes/statement/IfStatement.js
import assert14 from "assert";
var IfStatement = class extends Statement {
  constructor(test, thenStatements, elseStatements, line) {
    super();
    assert14(
      test instanceof Expression,
      `Test condition object ${JSON.stringify(
        test
      )} in if statement is not of expected Expression type`
    );
    assert14(
      thenStatements instanceof Statements,
      `'then' statements object ${JSON.stringify(
        thenStatements
      )} in if statement is not of expected Statements type`
    );
    assert14(
      elseStatements === void 0 || elseStatements instanceof Statements,
      `'else' statements object ${JSON.stringify(
        elseStatements
      )}in if statement is not of expected Statements type`
    );
    this.test = test;
    this.thenStatements = thenStatements;
    this.elseStatements = elseStatements;
    this.line = line;
  }
  toString() {
    return `IfStatement ${this.test}, then ${this.thenStatements}, else ${this.elseStatements}, line ${this.line}`;
  }
};

// src/parser/ifStatement.js
function ifStatement(current, tokens) {
  if (current >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in if statement");
  }
  const ifToken = tokens[current];
  if (!tokens[current]) {
    throw new Error("Tried to access an unexisting token in if statement");
  }
  expectToken(ifToken.tokenType, TOKENS.TOK_IF, ifToken.line);
  const testConditionResult = expression(current + 1, tokens);
  const testConditionExitCursor = testConditionResult.current;
  const thenToken = tokens[testConditionExitCursor];
  expectToken(thenToken.tokenType, TOKENS.TOK_THEN, thenToken.line);
  const thenStatements = statements(testConditionExitCursor + 1, tokens);
  const thenStatementsExitCursor = thenStatements.current;
  if (thenStatementsExitCursor >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in then statements");
  }
  const elseToken = tokens[thenStatementsExitCursor];
  let elseStatements;
  if (matchTokenType(elseToken.tokenType, TOKENS.TOK_ELSE)) {
    elseStatements = statements(thenStatementsExitCursor + 1, tokens);
  } else {
    elseStatements = void 0;
  }
  const elseStatementsExitCursor = elseStatements ? elseStatements.current : thenStatementsExitCursor;
  if (elseStatementsExitCursor >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in else statements");
  }
  const endToken = tokens[elseStatementsExitCursor];
  expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line);
  const endTokenExitCursor = elseStatementsExitCursor + 1;
  return {
    node: new IfStatement(
      testConditionResult.node,
      thenStatements.node,
      elseStatements ? elseStatements.node : elseStatements,
      ifToken.line
    ),
    current: endTokenExitCursor,
    tokens
  };
}

// src/parser/classes/statement/Assignment.js
import assert15 from "assert";
var Assignment = class extends Statement {
  constructor(left, right, line) {
    super();
    assert15(
      left instanceof Identifier,
      `${left} is not of expected Identifier type`
    );
    assert15(
      right instanceof Expression,
      `${right} is not of expected Expression type`
    );
    this.left = left;
    this.right = right;
    this.line = line;
  }
  toString() {
    return `Assignment ${this.left}, ${this.right} line ${this.line}`;
  }
};

// src/parser/classes/statement/WhileStatement.js
import assert16 from "assert";
var WhileStatement = class extends Statement {
  constructor(test, bodyStatements, line) {
    super();
    assert16(
      test instanceof Expression,
      `Test condition object ${JSON.stringify(
        test
      )} in while statement is not of expected Expression type`
    );
    assert16(
      bodyStatements instanceof Statements,
      `Object ${JSON.stringify(
        bodyStatements
      )} in while statement is not of expected Statements type`
    );
    this.test = test;
    this.bodyStatements = bodyStatements;
    this.line = line;
  }
  toString() {
    return `WhileStatement ${this.test}, ${this.bodyStatements}, line ${this.line}`;
  }
};

// src/parser/whileStatement.js
function whileStatement(current, tokens) {
  if (current >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in while statement");
  }
  if (!tokens[current]) {
    throw new Error(
      "Tried to access an unexisting token in while statement"
    );
  }
  const whileToken = tokens[current];
  expectToken(whileToken.tokenType, TOKENS.TOK_WHILE, whileToken.line);
  const testConditionResult = expression(current + 1, tokens);
  const testConditionExitCursor = testConditionResult.current;
  const doToken = tokens[testConditionExitCursor];
  expectToken(doToken.tokenType, TOKENS.TOK_DO, doToken.line);
  const doStatements = statements(testConditionExitCursor + 1, tokens);
  const doStatementsExitCursor = doStatements.current;
  if (doStatementsExitCursor >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in do statements");
  }
  const endToken = tokens[doStatementsExitCursor];
  expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line);
  const endTokenExitCursor = doStatementsExitCursor + 1;
  return {
    node: new WhileStatement(
      testConditionResult.node,
      doStatements.node,
      whileToken.line
    ),
    current: endTokenExitCursor,
    tokens
  };
}

// src/parser/classes/statement/ForStatement.js
import assert17 from "assert";
var ForStatement = class extends Statement {
  constructor(identifier, start, end, step, bodyStatements, line) {
    super();
    assert17(
      identifier instanceof Identifier,
      `Constructor parameter 'identifier' with a value of ${JSON.stringify(
        identifier
      )} of the ${identifier?.constructor?.name} type in for statement is not of expected Identifier type.`
    );
    assert17(
      start instanceof Expression,
      `Constructor parameter 'start' with a value of ${JSON.stringify(
        start
      )} of the ${start?.constructor?.name} type in for statement is not of expected Expression type.`
    );
    assert17(
      end instanceof Expression,
      `Constructor parameter 'end' with a value of ${JSON.stringify(
        end
      )} of the ${end?.constructor?.name} type in for statement is not of expected Expression type.`
    );
    assert17(
      step instanceof Expression || step === void 0,
      `Constructor parameter 'step' with a value of ${JSON.stringify(
        step
      )} of the ${step?.constructor?.name} type in for statement is not of expected undefined or Expression type.`
    );
    assert17(
      bodyStatements instanceof Statements,
      `Constructor parameter 'bodyStatements' with a value of ${JSON.stringify(
        bodyStatements
      )} of the ${bodyStatements?.constructor?.name} type in for statement is not of expected Statements type`
    );
    assert17(
      typeof line === "number",
      `Constructor parameter 'line' with a value of ${JSON.stringify(
        line
      )} in for statement is not of expected Number type`
    );
    this.identifier = identifier;
    this.start = start;
    this.end = end;
    this.step = step;
    this.bodyStatements = bodyStatements;
    this.line = line;
  }
  toString() {
    return `ForStatement ${this.identifier}, ${this.start}, ${this.end}, ${this.step}, ${this.bodyStatements}, line ${this.line}.`;
  }
};

// src/parser/forStatement.js
function forStatement(current, tokens) {
  if (current >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in for statement.");
  }
  if (!tokens[current]) {
    throw new Error("Tried to access an unexisting token in for statement.");
  }
  const forToken = tokens[current];
  expectToken(forToken.tokenType, TOKENS.TOK_FOR, forToken.line);
  const loopIdentifierResult = primary(current + 1, tokens);
  const loopIdentifierExitCursor = loopIdentifierResult.current;
  const assignToken = tokens[loopIdentifierExitCursor];
  expectToken(assignToken.tokenType, TOKENS.TOK_ASSIGN, assignToken.line);
  const startResult = expression(loopIdentifierExitCursor + 1, tokens);
  const startExitCursor = startResult.current;
  const commaToken = tokens[startExitCursor];
  expectToken(commaToken.tokenType, TOKENS.TOK_COMMA, commaToken.line);
  const endLoopConditionResult = expression(startExitCursor + 1, tokens);
  const endLoopConditionExitCursor = endLoopConditionResult.current;
  const endLoopConditionToken = tokens[endLoopConditionExitCursor];
  let stepResult = void 0;
  let stepExitCursor = endLoopConditionExitCursor;
  if (matchTokenType(endLoopConditionToken.tokenType, TOKENS.TOK_COMMA)) {
    stepResult = expression(endLoopConditionExitCursor + 1, tokens);
    stepExitCursor = stepResult.current;
  }
  const stepResultNode = stepResult ? stepResult.node : void 0;
  const doToken = tokens[stepExitCursor];
  expectToken(doToken.tokenType, TOKENS.TOK_DO, doToken.line);
  const doStatements = statements(stepExitCursor + 1, tokens);
  const doStatementsExitCursor = doStatements.current;
  if (doStatementsExitCursor >= tokens.length) {
    throw new Error("Tried to parse out of token bounds in do statements");
  }
  const endToken = tokens[doStatementsExitCursor];
  expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line);
  const endTokenExitCursor = doStatementsExitCursor + 1;
  return {
    node: new ForStatement(
      loopIdentifierResult.node,
      startResult.node,
      endLoopConditionResult.node,
      stepResultNode,
      doStatements.node,
      forToken.line
    ),
    current: endTokenExitCursor,
    tokens
  };
}

// src/parser/classes/statement/Parameter.js
import assert18 from "assert";

// src/parser/classes/statement/Declaration.js
var Declaration = class extends Statement {
  constructor() {
    super();
  }
};

// src/parser/classes/statement/Parameter.js
var Parameter = class extends Declaration {
  constructor(name, line) {
    super();
    assert18(
      typeof name === "string",
      `Constructor parameter 'name' of a Parameter class instance with a value of ${name} of the ${name?.constructor?.name} type is not of the expected string type.`
    );
    this.name = name;
    this.line = line;
  }
  toString() {
    return `Parameter ${this.name}`;
  }
};

// src/parser/parameters.js
function parameters(current, tokens) {
  let params = [];
  let cursor = current;
  let numberOfParameters = 0;
  while (!matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_RPAREN)) {
    const currentToken = tokens[cursor];
    if (matchTokenType(currentToken.tokenType, TOKENS.TOK_IDENTIFIER)) {
      numberOfParameters = numberOfParameters + 1;
      if (numberOfParameters > 255) {
        parseError(
          "Functions cannot have more than 255 parameters.",
          currentToken.line
        );
      }
      params.push(new Parameter(currentToken.lexeme, currentToken.line));
      cursor++;
      const nextToken = tokens[cursor];
      if (!matchTokenType(nextToken.tokenType, TOKENS.TOK_RPAREN)) {
        expectToken(
          nextToken.tokenType,
          TOKENS.TOK_COMMA,
          nextToken.line
        );
        cursor++;
      }
    }
  }
  return { node: params, current: cursor, tokens };
}

// src/parser/classes/statement/FunctionDeclaration.js
import assert19 from "assert";
var FunctionDeclaration = class extends Declaration {
  constructor(name, parameters2, bodyStatements, line) {
    super();
    assert19(
      typeof name === "string",
      `Constructor parameter 'name' of a FunctionDeclaration class instance with a value of ${name} of the ${name?.constructor?.name} type is not of the expected string type.`
    );
    assert19(
      Array.isArray(parameters2),
      `Constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of ${parameters2} of the ${parameters2?.constructor?.name} type is not of the expected Array type.`
    );
    parameters2.forEach((parameter) => {
      assert19(
        parameter instanceof Parameter,
        `The value of the constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of ${parameter} of the ${parameter?.constructor?.name} type is not of the expected Parameter type.`
      );
    });
    this.name = name;
    this.parameters = parameters2;
    this.bodyStatements = bodyStatements;
    this.line = line;
  }
  toString() {
    return `FunctionDeclaration ${this.name}, ${this.parameters}, ${this.bodyStatements}, line ${this.line}.`;
  }
};

// src/parser/functionDeclaration.js
function functionDeclaration(current, tokens) {
  const functionToken = tokens[current];
  expectToken(functionToken.tokenType, TOKENS.TOK_FUNC, functionToken.line);
  const functionNameToken = tokens[current + 1];
  expectToken(
    functionNameToken.tokenType,
    TOKENS.TOK_IDENTIFIER,
    functionNameToken.line
  );
  const openBracketToken = tokens[current + 2];
  const parametersResult = parameters(current + 3, tokens);
  const parametersExitCursor = parametersResult.current;
  const closeBracketToken = tokens[parametersExitCursor];
  expectToken(
    closeBracketToken.tokenType,
    TOKENS.TOK_RPAREN,
    closeBracketToken.line
  );
  const bodyStatements = statements(parametersExitCursor + 1, tokens);
  const bodyStatementsExitCursor = bodyStatements.current;
  const endToken = tokens[bodyStatementsExitCursor];
  expectToken(endToken.tokenType, TOKENS.TOK_END, endToken.line);
  const endTokenExitCursor = bodyStatementsExitCursor + 1;
  return {
    node: new FunctionDeclaration(
      functionNameToken.lexeme,
      parametersResult.node,
      bodyStatements.node,
      functionToken.line
    ),
    current: endTokenExitCursor,
    tokens
  };
}

// src/parser/classes/statement/FunctionCallStatement.js
import assert20 from "assert";
var FunctionCallStatement = class extends Statement {
  constructor(expression2, line) {
    super();
    assert20(
      expression2 instanceof FunctionCall,
      `Constructor parameter 'expression' with a value of ${JSON.stringify(
        expression2
      )} of the ${expression2?.constructor?.name} type in FunctionCallStatement is not of expected FunctionCall type.`
    );
    this.expression = expression2;
    this.line = line;
  }
  toString() {
    return `FunctionCallStatement ${this.expression}.`;
  }
};

// src/parser/classes/statement/ReturnStatement.js
import assert21 from "assert";
var ReturnStatement = class extends Statement {
  constructor(value, line) {
    super();
    assert21(
      value instanceof Expression,
      `${value} is not of expected Expression type`
    );
    this.value = value;
    this.line = line;
  }
  toString() {
    return `ReturnStatement ${this.value}, line ${this.line}`;
  }
};

// src/parser/returnStatement.js
function returnStatement(current, tokens) {
  const currentToken = tokens[current];
  if (current <= tokens.length && tokens[current] && matchTokenType(currentToken.tokenType, TOKENS.TOK_RET)) {
    const expressionResult2 = expression(current + 1, tokens);
    const expressionExitCursor = expressionResult2.current;
    return {
      node: new ReturnStatement(expressionResult2.node, currentToken.line),
      current: expressionExitCursor,
      tokens
    };
  }
  return expressionResult;
}

// src/parser/classes/statement/LocalAssignment.js
import assert22 from "assert";
var LocalAssignment = class extends Statement {
  constructor(left, right, line) {
    super();
    assert22(
      left instanceof Identifier,
      `${left} is not of expected Identifier type`
    );
    assert22(
      right instanceof Expression,
      `${right} is not of expected Expression type`
    );
    this.left = left;
    this.right = right;
    this.line = line;
  }
  toString() {
    return `LocalAssignment ${this.left}, ${this.right} line ${this.line}`;
  }
};

// src/parser/localAssignment.js
function localAssignment(current, tokens) {
  if (!tokens[current]) {
    throw new Error(
      "Tried to access an unexisting token in local assignment"
    );
  }
  const localToken = tokens[current];
  expectToken(localToken.tokenType, TOKENS.TOK_LOCAL, localToken.line);
  const leftResult = expression(current + 1, tokens);
  const leftExitCursor = leftResult.current;
  const assignmentToken = tokens[leftExitCursor];
  if (assignmentToken !== void 0 && matchTokenType(assignmentToken.tokenType, TOKENS.TOK_ASSIGN)) {
    const rightResult = expression(leftExitCursor + 1, tokens);
    const rightExitCursor = rightResult.current;
    return {
      node: new LocalAssignment(
        leftResult.node,
        rightResult.node,
        localToken.line
      ),
      current: rightExitCursor,
      tokens
    };
  }
}

// src/parser/statement.js
function statement(current, tokens) {
  if (current >= tokens.length) {
    throw new Error("Tried to parse out of token bounds");
  }
  const currentToken = tokens[current];
  if (!tokens[current]) {
    throw new Error("Tried to access an unexisting token");
  }
  if (matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINT)) {
    return printStatement(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_PRINTLN)) {
    return printLineStatement(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_IF)) {
    return ifStatement(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_WHILE)) {
    return whileStatement(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FOR)) {
    return forStatement(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_FUNC)) {
    return functionDeclaration(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_RET)) {
    return returnStatement(current, tokens);
  } else if (matchTokenType(currentToken.tokenType, TOKENS.TOK_LOCAL)) {
    return localAssignment(current, tokens);
  } else {
    const leftResult = expression(current, tokens);
    const leftExitCursor = leftResult.current;
    const assignmentToken = tokens[leftExitCursor];
    if (assignmentToken !== void 0 && matchTokenType(assignmentToken.tokenType, TOKENS.TOK_ASSIGN)) {
      const rightResult = expression(leftExitCursor + 1, tokens);
      const rightExitCursor = rightResult.current;
      return {
        node: new Assignment(
          leftResult.node,
          rightResult.node,
          currentToken.line
        ),
        current: rightExitCursor,
        tokens
      };
    } else {
      return {
        node: new FunctionCallStatement(
          leftResult.node,
          currentToken.line
        ),
        current: leftExitCursor,
        tokens
      };
    }
  }
}

// src/parser/statements.js
function statements(current, tokens) {
  let statements2 = [];
  let cursor = current;
  while (cursor < tokens.length && !matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_ELSE) && !matchTokenType(tokens[cursor].tokenType, TOKENS.TOK_END)) {
    const currentStatement = statement(cursor, tokens);
    statements2.push(currentStatement.node);
    cursor = currentStatement.current;
  }
  return {
    node: new Statements(statements2, tokens[current].line),
    current: cursor,
    tokens
  };
}

// src/parser/program.js
function program(current, tokens) {
  return statements(current, tokens);
}

// src/parser/parseStatements.js
function parseStatements(current, tokens) {
  const ast = program(current, tokens);
  return ast;
}

// src/compiler/emit.js
function emit(compiler, instruction) {
  compiler.code.push(instruction);
  return compiler;
}

// src/compiler/makeLabel.js
function makeLabel(compiler, labelName) {
  compiler.labelCounter = compiler.labelCounter + 1;
  return `${labelName}${compiler.labelCounter}`;
}

// src/compiler/classes/Symbol.js
import assert23 from "assert";

// src/compiler/symbolTypes.js
var SYMBOL_TYPES = {
  VARIABLE: "SYM_VAR",
  FUNCTION: "SYM_FUNC"
};

// src/compiler/classes/Symbol.js
var Symbol2 = class {
  constructor(name, depth = 0, symbolType = SYMBOL_TYPES.VARIABLE, arity = 0) {
    assert23(
      typeof name === "string",
      `${name} is not of expected String type`
    );
    this.name = name;
    this.depth = depth;
    this.symbolType = symbolType;
    this.arity = arity;
  }
};

// src/compiler/getSymbol.js
import assert24 from "assert";

// src/utils/enumerate.js
function enumerate(array) {
  return array.map((element, index) => ({ element, index }));
}

// src/utils/reverse.js
function reverse(array) {
  return [...array].reverse();
}

// src/compiler/getSymbol.js
function getSymbol(compiler, name) {
  assert24(
    compiler instanceof Compiler,
    `${compiler} is not of expected Compiler type`
  );
  assert24(typeof name === "string", `${name} is not of expected String type`);
  const reversedLocals = reverse(enumerate(compiler.locals));
  let localIndex = 0;
  for (const localSymbol of reversedLocals) {
    if (localSymbol.element.name === name) {
      return { symbol: localSymbol.element, index: localSymbol.index };
    }
    localIndex = localIndex + 1;
  }
  const reversedGlobals = reverse(enumerate(compiler.globals));
  let globalIndex = 0;
  for (const globalSymbol of reversedGlobals) {
    if (globalSymbol.element.name === name) {
      return { symbol: globalSymbol.element, index: globalSymbol.index };
    }
    globalIndex = globalIndex + 1;
  }
  return void 0;
}

// src/compiler/addSymbol.js
import assert25 from "assert";
function addSymbol(compiler, symbol) {
  assert25(
    compiler instanceof Compiler,
    `${compiler} is not of expected Compiler type`
  );
  assert25(symbol instanceof Symbol2, `${symbol} is not of expected Symbol type`);
  compiler.globals.push(symbol);
  return compiler;
}

// src/compiler/beginBlock.js
function beginBlock(compiler) {
  compiler.scopeDepth = compiler.scopeDepth + 1;
  return compiler;
}

// src/compiler/endBlock.js
function endBlock(compiler) {
  if (compiler.scopeDepth <= 0) {
    throw new Error("Scope depth cannot be decreased to less than 0.");
  }
  compiler.scopeDepth = compiler.scopeDepth - 1;
  let localCounter = compiler.locals.length - 1;
  while (compiler.locals.length > 0 && compiler.locals[localCounter].depth > compiler.scopeDepth) {
    emit(compiler, { command: "POP" });
    compiler.locals.pop();
    localCounter = localCounter - 1;
  }
  return compiler;
}

// src/compiler/addLocalSymbol.js
import assert26 from "assert";
function addLocalSymbol(compiler, symbol) {
  assert26(
    compiler instanceof Compiler,
    `${compiler} is not of expected Compiler type`
  );
  assert26(symbol instanceof Symbol2, `${symbol} is not of expected Symbol type`);
  compiler.locals.push(symbol);
  return compiler;
}

// src/compiler/getFunctionSymbol.js
import assert27 from "assert";
function getFunctionSymbol(compiler, name) {
  assert27(
    compiler instanceof Compiler,
    `${compiler} is not of expected Compiler type`
  );
  assert27(typeof name === "string", `${name} is not of expected String type`);
  const reversedFunctions = reverse(compiler.functions);
  for (const symbol of reversedFunctions) {
    assert27(
      typeof symbol.name !== void 0,
      `Symbol name should not be undefined.`
    );
    if (symbol.name === name) {
      return symbol;
    }
  }
  return void 0;
}

// src/compiler/addFunctionSymbol.js
import assert28 from "assert";
function addFunctionSymbol(compiler, symbol) {
  assert28(
    compiler instanceof Compiler,
    `${compiler} is not of expected Compiler type`
  );
  assert28(symbol instanceof Symbol2, `${symbol} is not of expected Symbol type`);
  assert28(
    symbol.symbolType === SYMBOL_TYPES.FUNCTION,
    `${symbol} is not of expected ${SYMBOL_TYPES.FUNCTION} Symbol type.`
  );
  compiler.functions.push(symbol);
  return compiler;
}

// src/compiler/compile.js
function compile(compiler, node) {
  const {
    TYPE_NUMBER: NUMBER,
    TYPE_STRING: STRING,
    TYPE_BOOL: BOOL,
    TYPE_LABEL: LABEL,
    TYPE_SYMBOL: SYMBOL,
    TYPE_STACK_SLOT: STACK_SLOT
  } = TYPES;
  const labelPrefix = "LBL";
  if (node instanceof Integer || node instanceof Float) {
    const argument = { type: NUMBER, value: parseFloat(node.value) };
    const instruction = {
      command: "PUSH",
      argument
    };
    emit(compiler, instruction);
  } else if (node instanceof Boolean) {
    const argument = {
      type: BOOL,
      value: node.value === true ? true : false
    };
    const instruction = {
      command: "PUSH",
      argument
    };
    emit(compiler, instruction);
  } else if (node instanceof String_) {
    const argument = {
      type: STRING,
      value: String(node.value)
    };
    const instruction = {
      command: "PUSH",
      argument
    };
    emit(compiler, instruction);
  } else if (node instanceof BinaryOperation) {
    const tokenType = node.operator.tokenType;
    compile(compiler, node.left);
    compile(compiler, node.right);
    if (tokenType === TOKENS.TOK_PLUS) {
      emit(compiler, { command: "ADD" });
    } else if (tokenType === TOKENS.TOK_MINUS) {
      emit(compiler, { command: "SUB" });
    } else if (tokenType === TOKENS.TOK_STAR) {
      emit(compiler, { command: "MUL" });
    } else if (tokenType === TOKENS.TOK_SLASH) {
      emit(compiler, { command: "DIV" });
    } else if (tokenType === TOKENS.TOK_CARET) {
      emit(compiler, { command: "EXP" });
    } else if (tokenType === TOKENS.TOK_MOD) {
      emit(compiler, { command: "MOD" });
    } else if (tokenType === TOKENS.TOK_LT) {
      emit(compiler, { command: "LT" });
    } else if (tokenType === TOKENS.TOK_GT) {
      emit(compiler, { command: "GT" });
    } else if (tokenType === TOKENS.TOK_LE) {
      emit(compiler, { command: "LE" });
    } else if (tokenType === TOKENS.TOK_GE) {
      emit(compiler, { command: "GE" });
    } else if (tokenType === TOKENS.TOK_EQEQ) {
      emit(compiler, { command: "EQ" });
    } else if (tokenType === TOKENS.TOK_NE) {
      emit(compiler, { command: "NE" });
    } else {
      throw new Error(
        `Unrecognized binary operation ${node.operator.lexeme} in line ${node.line}`
      );
    }
  } else if (node instanceof UnaryOperation) {
    compile(compiler, node.operand);
    const tokenType = node.operator.tokenType;
    if (tokenType === TOKENS.TOK_MINUS) {
      emit(compiler, { command: "NEG" });
    } else if (tokenType === TOKENS.TOK_NOT) {
      emit(compiler, {
        command: "PUSH",
        argument: { type: BOOL, value: true }
      });
      emit(compiler, { command: "XOR" });
    }
  } else if (node instanceof LogicalOperation) {
    const tokenType = node.operator.tokenType;
    compile(compiler, node.left);
    compile(compiler, node.right);
    if (tokenType === TOKENS.TOK_AND) {
      emit(compiler, { command: "AND" });
    } else if (tokenType === TOKENS.TOK_OR) {
      emit(compiler, { command: "OR" });
    }
  } else if (node instanceof Grouping) {
    compile(compiler, node.value);
  } else if (node instanceof PrintStatement) {
    compile(compiler, node.value);
    const instruction = {
      command: "PRINT"
    };
    emit(compiler, instruction);
  } else if (node instanceof PrintLineStatement) {
    compile(compiler, node.value);
    const instruction = {
      command: "PRINTLN"
    };
    emit(compiler, instruction);
  } else if (node instanceof IfStatement) {
    compile(compiler, node.test);
    const thenLabel = makeLabel(compiler, labelPrefix);
    const elseLabel = makeLabel(compiler, labelPrefix);
    const exitLabel = makeLabel(compiler, labelPrefix);
    emit(compiler, {
      command: "JMPZ",
      argument: { type: LABEL, value: elseLabel }
    });
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: thenLabel }
    });
    beginBlock(compiler);
    compile(compiler, node.thenStatements);
    endBlock(compiler);
    emit(compiler, {
      command: "JMP",
      argument: { type: LABEL, value: exitLabel }
    });
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: elseLabel }
    });
    if (node.elseStatements) {
      beginBlock(compiler);
      compile(compiler, node.elseStatements);
      endBlock(compiler);
    }
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: exitLabel }
    });
  } else if (node instanceof WhileStatement) {
    const testLabel = makeLabel(compiler, labelPrefix);
    const bodyLabel = makeLabel(compiler, labelPrefix);
    const exitLabel = makeLabel(compiler, labelPrefix);
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: testLabel }
    });
    compile(compiler, node.test);
    emit(compiler, {
      command: "JMPZ",
      argument: { type: LABEL, value: exitLabel }
    });
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: bodyLabel }
    });
    beginBlock(compiler);
    compile(compiler, node.bodyStatements);
    endBlock(compiler);
    emit(compiler, {
      command: "JMP",
      argument: { type: LABEL, value: testLabel }
    });
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: exitLabel }
    });
  } else if (node instanceof Statements) {
    node.statements.forEach((statement2) => {
      compile(compiler, statement2);
    });
  } else if (node instanceof Assignment) {
    compile(compiler, node.right);
    const existingSymbol = getSymbol(compiler, node.left.name);
    if (!existingSymbol) {
      const newSymbol = new Symbol2(
        node.left.name,
        compiler.scopeDepth,
        SYMBOL_TYPES.VARIABLE
      );
      if (compiler.scopeDepth === 0) {
        addSymbol(compiler, newSymbol);
        const newGlobalSlot = compiler.globals.length - 1;
        emit(compiler, {
          command: "STORE_GLOBAL",
          argument: { type: SYMBOL, value: newGlobalSlot }
        });
      } else {
        addLocalSymbol(compiler, newSymbol);
        emit(compiler, {
          command: "SET_SLOT",
          argument: {
            type: STACK_SLOT,
            value: `${compiler.locals.length - 1} (${newSymbol.name})`
          }
        });
      }
    } else {
      const { symbol, index: slot } = existingSymbol;
      if (symbol.depth === 0) {
        emit(compiler, {
          command: "STORE_GLOBAL",
          argument: { type: SYMBOL, value: slot }
        });
      } else {
        emit(compiler, {
          command: "STORE_LOCAL",
          argument: { type: STACK_SLOT, value: slot }
        });
      }
    }
  } else if (node instanceof Identifier) {
    const existingSymbol = getSymbol(compiler, node.name);
    if (!existingSymbol) {
      throw new Error(
        `Variable ${node.name} is not defined in line ${node.line}.`
      );
    } else {
      const { symbol, index: slot } = existingSymbol;
      if (symbol.depth === 0) {
        emit(compiler, {
          command: "LOAD_GLOBAL",
          argument: { type: SYMBOL, value: slot }
        });
      } else {
        emit(compiler, {
          command: "LOAD_LOCAL",
          argument: { type: STACK_SLOT, value: slot }
        });
      }
    }
  } else if (node instanceof FunctionDeclaration) {
    const existingFunction = getFunctionSymbol(compiler, node.name);
    if (existingFunction) {
      throw new Error(
        `A function with the name ${node.name} was already declared in line ${node.line}.`
      );
    }
    const existingVariable = getSymbol(compiler, node.name);
    if (existingVariable) {
      throw new Error(
        `A variable with the name ${node.name} was already declared in this scope in line ${node.line}.`
      );
    }
    const newFunctionSymbol = new Symbol2(
      node.name,
      compiler.scopeDepth,
      SYMBOL_TYPES.FUNCTION,
      node.parameters.length
    );
    addFunctionSymbol(compiler, newFunctionSymbol);
    const endLabel = makeLabel(compiler, labelPrefix);
    emit(compiler, {
      command: "JMP",
      argument: { type: LABEL, value: endLabel }
    });
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: newFunctionSymbol.name }
    });
    beginBlock(compiler);
    if (node.parameters) {
      node.parameters.forEach((parameter) => {
        const newSymbol = new Symbol2(
          parameter.name,
          compiler.scopeDepth,
          SYMBOL_TYPES.VARIABLE
        );
        addLocalSymbol(compiler, newSymbol);
        emit(compiler, {
          command: "SET_SLOT",
          argument: {
            type: STACK_SLOT,
            value: `${compiler.locals.length - 1} (${newSymbol.name})`
          }
        });
      });
    }
    compile(compiler, node.bodyStatements);
    endBlock(compiler);
    emit(compiler, { command: "RTS" });
    emit(compiler, {
      command: "LABEL",
      argument: { type: LABEL, value: endLabel }
    });
  } else if (node instanceof FunctionCall) {
    const func = getFunctionSymbol(compiler, node.name);
    if (!func) {
      throw new Error(
        `Function declaration with the name ${node.name} was not found in line ${node.line}.`
      );
    }
    if (func.arity !== node.args.length) {
      throw new Error(
        `Function ${node.name} was expecting ${func.arity} arguments but ${node.args.length} arguments were passed in line ${node.line}.`
      );
    }
    node.args.forEach((arg) => compile(compiler, arg));
    const numberOfArguments = { type: NUMBER, value: node.args.length };
    emit(compiler, {
      command: "PUSH",
      argument: numberOfArguments
    });
    emit(compiler, {
      command: "JSR",
      argument: { type: LABEL, value: node.name }
    });
  } else if (node instanceof FunctionCallStatement) {
    compile(compiler, node.expression);
  } else {
    throw new Error(`Unrecognized ${node} in line ${node.line}`);
  }
}

// src/compiler/generateCode.js
function generateCode(compiler, node) {
  const labelInstruction = {
    command: "LABEL",
    argument: { type: "TYPE_LABEL", value: "START" }
  };
  emit(compiler, labelInstruction);
  compile(compiler, node);
  emit(compiler, { command: "HALT" });
  return compiler.code;
}

// src/interpreter/binaryOperatorTypeError.js
function binaryOperatorTypeError(operator, leftType, rightType, line) {
  throw new TypeError(
    `Unsupported operator '${operator}' between ${leftType} and ${rightType} in line ${line}.`
  );
}

// src/interpreter/unaryOperatorTypeError.js
function unaryOperatorTypeError(operator, operandType, line) {
  throw new TypeError(
    `Unsupported operator '${operator}' with ${operandType} in line ${line}.`
  );
}

// src/interpreter/classes/Environment.js
var Environment = class {
  constructor(parent = void 0) {
    this.variables = {};
    this.functions = {};
    this.parent = parent;
  }
};

// src/interpreter/environment/newEnvironment.js
function newEnvironment(environment) {
  if (environment !== void 0) {
    if (!(environment instanceof Environment)) {
      throw new TypeError(
        `${JSON.stringify(
          environment
        )} is not of expected Environment type`
      );
    }
  }
  return new Environment(environment);
}

// src/interpreter/environment/getVariable.js
function getVariable(name, environment) {
  if (!(environment instanceof Environment)) {
    throw new TypeError(
      `${JSON.stringify(environment)} is not of expected Environment type`
    );
  }
  let currentEnvironment = environment;
  while (currentEnvironment !== void 0) {
    const value = currentEnvironment.variables[name];
    if (value !== void 0) {
      return value;
    } else {
      currentEnvironment = currentEnvironment.parent;
    }
  }
  return void 0;
}

// src/interpreter/environment/setVariable.js
function setVariable(name, value, environment) {
  if (!(environment instanceof Environment)) {
    throw new TypeError(
      `${JSON.stringify(environment)} is not of expected Environment type`
    );
  }
  let originalEnvironment = environment;
  let currentEnvironment = environment;
  while (currentEnvironment !== void 0) {
    const existingKeysValues = Object.entries(currentEnvironment.variables);
    const isValueExists = existingKeysValues.find(
      ([existingKey, existingValue]) => existingKey === name
    );
    if (isValueExists) {
      currentEnvironment.variables[name] = value;
      return value;
    }
    currentEnvironment = currentEnvironment.parent;
  }
  originalEnvironment.variables[name] = value;
}

// src/interpreter/environment/setFunction.js
function setFunction(name, node, declarationEnvironment, environment) {
  environment.functions[name] = {
    functionDeclaration: node,
    declarationEnvironment
  };
}

// src/interpreter/environment/getFunction.js
function getFunction(name, environment) {
  if (!(environment instanceof Environment)) {
    throw new TypeError(
      `${JSON.stringify(environment)} is not of expected Environment type`
    );
  }
  let currentEnvironment = environment;
  while (currentEnvironment !== void 0) {
    const func = currentEnvironment.functions[name];
    if (func !== void 0) {
      return func;
    } else {
      currentEnvironment = currentEnvironment.parent;
    }
  }
  return void 0;
}

// src/interpreter/classes/Return.js
var Return = class extends Error {
  constructor(returnObject) {
    super(returnObject);
    this.returnObject = returnObject;
  }
};

// src/interpreter/environment/setLocal.js
function setLocal(name, value, environment) {
  if (!(environment instanceof Environment)) {
    throw new TypeError(
      `${JSON.stringify(environment)} is not of expected Environment type`
    );
  }
  environment.variables[name] = value;
}

// src/interpreter/interpret.js
function interpret(node, environment) {
  const { TYPE_NUMBER: NUMBER, TYPE_STRING: STRING, TYPE_BOOL: BOOL } = TYPES;
  if (node instanceof Integer) {
    return { type: NUMBER, value: parseFloat(node.value) };
  } else if (node instanceof Float) {
    return { type: NUMBER, value: parseFloat(node.value) };
  } else if (node instanceof String_) {
    return { type: STRING, value: String(node.value) };
  } else if (node instanceof Boolean) {
    return { type: BOOL, value: node.value };
  } else if (node instanceof Grouping) {
    return interpret(node.value, environment);
  } else if (node instanceof Identifier) {
    const valueObject = getVariable(node.name, environment);
    if (valueObject === void 0) {
      throw new Error(
        `Undeclared identifier ${node.name} in line ${node.line}.`
      );
    }
    if (valueObject.value === void 0) {
      throw new Error(
        `Uninitialized identifier ${node.name} in line ${node.line}.`
      );
    }
    return valueObject;
  } else if (node instanceof Assignment) {
    const rightTypeValue = interpret(node.right, environment);
    setVariable(node.left.name, rightTypeValue, environment);
  } else if (node instanceof LocalAssignment) {
    const rightTypeValue = interpret(node.right, environment);
    setLocal(node.left.name, rightTypeValue, environment);
  } else if (node instanceof BinaryOperation) {
    const lexeme = node.operator.lexeme;
    const line = node.operator.line;
    const tokenType = node.operator.tokenType;
    const { type: leftType, value: leftValue } = interpret(
      node.left,
      environment
    );
    const { type: rightType, value: rightValue } = interpret(
      node.right,
      environment
    );
    if (tokenType === TOKENS.TOK_PLUS) {
      if (leftType === NUMBER && rightType === NUMBER) {
        return {
          type: NUMBER,
          value: leftValue + rightValue
        };
      } else if (leftType === STRING || rightType === STRING) {
        return {
          type: STRING,
          value: String(leftValue).concat(String(rightValue))
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_MINUS) {
      if (leftType === NUMBER && rightType === NUMBER) {
        return {
          type: NUMBER,
          value: leftValue - rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_STAR) {
      if (leftType === NUMBER && rightType === NUMBER) {
        return {
          type: NUMBER,
          value: leftValue * rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_SLASH) {
      if (leftType === NUMBER && rightType === NUMBER) {
        if (rightValue === 0) {
          throw new Error(`Division by zero in line ${line}`);
        }
        return {
          type: NUMBER,
          value: leftValue / rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_MOD) {
      if (leftType === NUMBER && rightType === NUMBER) {
        return {
          type: NUMBER,
          value: leftValue % rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_CARET) {
      if (leftType === NUMBER && rightType === NUMBER) {
        return {
          type: NUMBER,
          value: leftValue ** rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_GT) {
      if (leftType === NUMBER && rightType === NUMBER || leftType === STRING && rightType === STRING) {
        return {
          type: BOOL,
          value: leftValue > rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_GE) {
      if (leftType === NUMBER && rightType === NUMBER || leftType === STRING && rightType === STRING) {
        return {
          type: BOOL,
          value: leftValue >= rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_LT) {
      if (leftType === NUMBER && rightType === NUMBER || leftType === STRING && rightType === STRING) {
        return {
          type: BOOL,
          value: leftValue < rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_LE) {
      if (leftType === NUMBER && rightType === NUMBER || leftType === STRING && rightType === STRING) {
        return {
          type: BOOL,
          value: leftValue <= rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_EQEQ) {
      if (leftType === NUMBER && rightType === NUMBER || leftType === BOOL && rightType === BOOL || leftType === STRING && rightType === STRING) {
        return {
          type: BOOL,
          value: leftValue === rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    } else if (tokenType === TOKENS.TOK_NE) {
      if (leftType === NUMBER && rightType === NUMBER || leftType === BOOL && rightType === BOOL || leftType === STRING && rightType === STRING) {
        return {
          type: BOOL,
          value: leftValue !== rightValue
        };
      } else {
        binaryOperatorTypeError(lexeme, leftType, rightType, line);
      }
    }
  } else if (node instanceof UnaryOperation) {
    const lexeme = node.operator.lexeme;
    const line = node.operator.line;
    const tokenType = node.operator.tokenType;
    const { type: operandType, value: operandValue } = interpret(
      node.operand,
      environment
    );
    if (tokenType === TOKENS.TOK_PLUS) {
      if (operandType === NUMBER) {
        return { type: NUMBER, value: operandValue };
      } else {
        unaryOperatorTypeError(lexeme, operandType, line);
      }
    } else if (tokenType === TOKENS.TOK_MINUS) {
      if (operandType === NUMBER) {
        return { type: NUMBER, value: -operandValue };
      } else {
        unaryOperatorTypeError(lexeme, operandType, line);
      }
    } else if (tokenType === TOKENS.TOK_NOT) {
      if (operandType === BOOL) {
        return { type: BOOL, value: !operandValue };
      } else {
        unaryOperatorTypeError(lexeme, operandType, line);
      }
    }
  } else if (node instanceof LogicalOperation) {
    const lexeme = node.operator.lexeme;
    const line = node.operator.line;
    const tokenType = node.operator.tokenType;
    const { type: leftType, value: leftValue } = interpret(
      node.left,
      environment
    );
    if (tokenType === TOKENS.TOK_OR) {
      if (leftType === BOOL) {
        if (leftValue) {
          return { type: leftType, value: leftValue };
        }
      } else if (leftType === NUMBER) {
        if (leftValue) {
          return { type: leftType, value: leftValue };
        }
      } else {
        throw new TypeError(
          `Unsupported usage of logical operator '${lexeme}' with left ${leftType} in line ${line}.`
        );
      }
    } else if (tokenType === TOKENS.TOK_AND) {
      if (leftType === BOOL) {
        if (!leftValue) {
          return { type: leftType, value: leftValue };
        }
      } else if (leftType === NUMBER) {
        if (!leftValue) {
          return { type: leftType, value: leftValue };
        }
      } else {
        throw new TypeError(
          `Unsupported usage of logical operator '${lexeme}' with left ${leftType} in line ${line}.`
        );
      }
    }
    const { type: rightType, value: rightValue } = interpret(
      node.right,
      environment
    );
    if (rightType === BOOL) {
      return { type: rightType, value: rightValue };
    } else if (rightType === NUMBER) {
      return { type: rightType, value: rightValue };
    } else {
      throw new TypeError(
        `Unsupported usage of logical operator '${lexeme}' with right ${rightType} in line ${line}.`
      );
    }
  } else if (node instanceof Statements) {
    node.statements.forEach((statement2) => {
      interpret(statement2, environment);
    });
  } else if (node instanceof PrintStatement) {
    const { type: expressionType, value: expressionValue } = interpret(
      node.value,
      environment
    );
    process.stdout.write(expressionValue.toString());
  } else if (node instanceof PrintLineStatement) {
    const { type: expressionType, value: expressionValue } = interpret(
      node.value,
      environment
    );
    console.log(expressionValue.toString());
  } else if (node instanceof IfStatement) {
    const {
      type: testCondtionExpressionType,
      value: testCondtionExpressionValue
    } = interpret(node.test, environment);
    if (testCondtionExpressionType !== BOOL) {
      throw new TypeError(
        `If test condition expression is not of a boolean type.`
      );
    }
    if (testCondtionExpressionValue) {
      interpret(node.thenStatements, newEnvironment(environment));
    } else {
      interpret(node.elseStatements, newEnvironment(environment));
    }
  } else if (node instanceof WhileStatement) {
    let whileLoopBodyEnvironment = newEnvironment(environment);
    while (true) {
      const {
        type: testCondtionExpressionType,
        value: testCondtionExpressionValue
      } = interpret(node.test, environment);
      if (testCondtionExpressionType !== BOOL) {
        throw new TypeError(
          `While test condition expression is not of a boolean type.`
        );
      }
      if (!testCondtionExpressionValue) {
        break;
      }
      interpret(node.bodyStatements, whileLoopBodyEnvironment);
    }
  } else if (node instanceof ForStatement) {
    if (!node.identifier) {
      throw new Error(`For loop counter identifier was not found.`);
    }
    if (!node.identifier.name) {
      throw new Error(`For loop counter identifier name was not found.`);
    }
    let counterVariableName = node.identifier.name;
    if (!node.start) {
      throw new Error(`For loop counter start value was not found.`);
    }
    let { type: counterType, value: counterValue } = interpret(
      node.start,
      environment
    );
    if (!node.end) {
      throw new Error(`For loop counter end value was not found.`);
    }
    const { type: endType, value: endValue } = interpret(
      node.end,
      environment
    );
    let forLoopBodyEnvironment = newEnvironment(environment);
    if (counterValue < endValue) {
      const step = node.step === void 0 ? 1 : interpret(node.step, environment).value;
      while (counterValue <= endValue) {
        const newCounterValue = {
          type: TYPES.TYPE_NUMBER,
          value: counterValue
        };
        setVariable(counterVariableName, newCounterValue, environment);
        interpret(node.bodyStatements, forLoopBodyEnvironment);
        counterValue = counterValue + step;
      }
    } else {
      const step = node.step === void 0 ? -1 : interpret(node.step, environment).value;
      while (counterValue >= endValue) {
        const newCounterValue = {
          type: TYPES.TYPE_NUMBER,
          value: counterValue
        };
        setVariable(counterVariableName, newCounterValue, environment);
        interpret(node.bodyStatements, forLoopBodyEnvironment);
        counterValue = counterValue + step;
      }
    }
  } else if (node instanceof FunctionDeclaration) {
    setFunction(node.name, node, environment, environment);
  } else if (node instanceof FunctionCall) {
    const func = getFunction(node.name, environment);
    if (!func) {
      throw new Error(
        `Function ${node.name} was not declared, line ${node.line}.`
      );
    }
    const functionDeclaration2 = func.functionDeclaration;
    const functionDeclarationEnvironment = func.declarationEnvironment;
    if (node.args.length !== functionDeclaration2.parameters.length) {
      throw new Error(
        `Function ${functionDeclaration2.name} expected ${functionDeclaration2.parameters.length} parameters, but ${node.args.length} arguments were passed, line ${node.line}.`
      );
    }
    let newFunctionEnvironment = newEnvironment(
      functionDeclarationEnvironment
    );
    const parameters2 = functionDeclaration2.parameters;
    const args2 = node.args.map(
      (argument) => interpret(argument, environment)
    );
    parameters2.forEach(
      (parameter, index) => setLocal(parameter.name, args2[index], newFunctionEnvironment)
    );
    try {
      interpret(
        functionDeclaration2.bodyStatements,
        newFunctionEnvironment
      );
    } catch (error) {
      if (error instanceof Return) {
        return error.returnObject;
      }
    }
  } else if (node instanceof FunctionCallStatement) {
    interpret(node.expression, environment);
  } else if (node instanceof ReturnStatement) {
    throw new Return(interpret(node.value, environment));
  }
}

// src/interpreter/interpretAST.js
function interpretAST(node) {
  let environment = new Environment();
  interpret(node, environment);
}

// src/utils/prefixInRange.js
function prefixInRange(char, num, range) {
  return String(num).padStart(range, char);
}

// src/utils/prettifyVMCode.js
function prettifyVMCode(printFn, code) {
  const defaultOptions = {
    prefix: {
      show: true,
      symbol: "0",
      range: 8,
      symbolsAfter: "    "
    }
  };
  const prefix = (index) => defaultOptions?.prefix?.show === true ? prefixInRange(0, index, 8) + defaultOptions.prefix.symbolsAfter : "";
  code.forEach((instruction, index) => {
    if (instruction?.command === "LABEL") {
      printFn(`${prefix(index)}${instruction.argument.value}:`);
    } else if (instruction?.command !== void 0 && instruction?.argument?.value !== void 0) {
      printFn(
        `${prefix(index)}    ${instruction.command} ${instruction.argument.value}`
      );
    }
    if (instruction?.argument === void 0) {
      printFn(`${prefix(index)}    ${instruction.command}`);
    }
  });
}

// src/virtualMachine/setup/createTestVMOptions.js
function createTestVMOptions(options) {
  return {
    consoleOutput: {
      enable: options.consoleOutput
    },
    executionLog: {
      enable: options.enableLog,
      log: [],
      logFunction: function(value) {
        this.log.push(value);
      }
    }
  };
}

// tests/virtualMachine/runVM.test.js
var run_VM_test = () => {
  describe("run virtual machine", () => {
    const CONSOLE_OUTPUT = true;
    const RUN_INTERPRETER = true;
    it("run virtual machine with println 2 + 3", () => {
      const source = "println 2 + 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 6,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "ADD" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["5"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 2 + 3 * 5 - 1", () => {
      const source = "println 2 + 3 * 5 - 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 10,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "MUL" },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "SUB" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["16"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println (2 + 3) * 5 - 1", () => {
      const source = "println (2 + 3) * 5 - 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 10,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "MUL" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "SUB" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["24"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println (2 + 3) * 5 - 1 + (4 / 2) ^ 2", () => {
      const source = "println (2 + 3) * 5 - 1 + (4 / 2) ^ 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 16,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "MUL" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "SUB" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "DIV" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "EXP" },
          { command: "ADD" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["28"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 12 % 5", () => {
      const source = "println 12 % 5";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 6,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 12 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "MOD" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["2"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println true and true println false and false println true and false println false and true", () => {
      const source = "println true and true println false and false println true and false println false and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 18,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "false", "false", "false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 and 1 println 0 and 0 println 1 and 0 println 0 and 1", () => {
      const source = "println 1 and 1 println 0 and 0 println 1 and 0 println 0 and 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 18,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "AND" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["1", "0", "0", "0"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println true or true println false or false println true or false println false or true", () => {
      const source = "println true or true println false or false println true or false println false or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 18,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "false", "true", "true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 or 1 println 0 or 0 println 1 or 0 println 0 or 1", () => {
      const source = "println 1 or 1 println 0 or 0 println 1 or 0 println 0 or 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 18,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["1", "0", "1", "1"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println ~true", () => {
      const source = "println ~true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 6,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "XOR" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println ~1", () => {
      const source = "println ~1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on XOR between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println ~"false"', () => {
      const source = 'println ~"false"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on XOR between TYPE_STRING and TYPE_BOOL at 3."
        );
      }
    });
    it("run virtual machine with println -10", () => {
      const source = "println -10";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 5,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 10 }
          },
          { command: "NEG" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["-10"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println -true", () => {
      const source = "println -true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe("Error on NEG with TYPE_BOOL at 2.");
      }
    });
    it('run virtual machine with println -"false"', () => {
      const source = 'println -"false"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on NEG with TYPE_STRING at 2."
        );
      }
    });
    it("run virtual machine with println 5 < 4 println 2 < 5 println 3 < 3", () => {
      const source = "println 5 < 4 println 2 < 5 println 3 < 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 14,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "true", "false"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" < "b" println "aa" < "aaa" println "bb" < "bb" println "bbb" < "BBB" println "B" < "bb"', () => {
      const source = 'println "a" < "b" println "aa" < "aaa" println "bb" < "bb" println "bbb" < "BBB" println "B" < "bb"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 22,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aa" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aaa" }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bbb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "BBB" }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "B" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "LT" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "true", "false", "false", "true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 < true", () => {
      const source = "println 1 < true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LT between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println 1 < "abc"', () => {
      const source = 'println 1 < "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LT between TYPE_NUMBER and TYPE_STRING at 3."
        );
      }
    });
    it('run virtual machine with println true < "abc"', () => {
      const source = 'println true < "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LT between TYPE_BOOL and TYPE_STRING at 3."
        );
      }
    });
    it("run virtual machine with println true < 1", () => {
      const source = "println true < 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LT between TYPE_BOOL and TYPE_NUMBER at 3."
        );
      }
    });
    it("run virtual machine with println 5 > 4 println 2 > 5 println 3 > 3", () => {
      const source = "println 5 > 4 println 2 > 5 println 3 > 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 14,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "false", "false"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" > "b" println "aa" > "aaa" println "bb" > "bb" println "bbb" > "BBB" println "B" > "bb"', () => {
      const source = 'println "a" > "b" println "aa" > "aaa" println "bb" > "bb" println "bbb" > "BBB" println "B" > "bb"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 22,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aa" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aaa" }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bbb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "BBB" }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "B" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "GT" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "false", "false", "true", "false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 > true", () => {
      const source = "println 1 > true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GT between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println 1 > "abc"', () => {
      const source = 'println 1 > "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GT between TYPE_NUMBER and TYPE_STRING at 3."
        );
      }
    });
    it('run virtual machine with println true > "abc"', () => {
      const source = 'println true > "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GT between TYPE_BOOL and TYPE_STRING at 3."
        );
      }
    });
    it("run virtual machine with println true > 1", () => {
      const source = "println true > 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GT between TYPE_BOOL and TYPE_NUMBER at 3."
        );
      }
    });
    it("run virtual machine with println 5 <= 4 println 2 <= 5 println 3 <= 3", () => {
      const source = "println 5 <= 4 println 2 <= 5 println 3 <= 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 14,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "true", "true"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" <= "b" println "aa" <= "aaa" println "bb" <= "bb" println "bbb" <= "BBB" println "B" <= "bb"', () => {
      const source = 'println "a" <= "b" println "aa" <= "aaa" println "bb" <= "bb" println "bbb" <= "BBB" println "B" <= "bb"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 22,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aa" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aaa" }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bbb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "BBB" }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "B" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "LE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "true", "true", "false", "true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 <= true", () => {
      const source = "println 1 <= true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LE between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println 1 <= "abc"', () => {
      const source = 'println 1 <= "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LE between TYPE_NUMBER and TYPE_STRING at 3."
        );
      }
    });
    it('run virtual machine with println true <= "abc"', () => {
      const source = 'println true <= "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LE between TYPE_BOOL and TYPE_STRING at 3."
        );
      }
    });
    it("run virtual machine with println true <= 1", () => {
      const source = "println true <= 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on LE between TYPE_BOOL and TYPE_NUMBER at 3."
        );
      }
    });
    it("run virtual machine with println 5 >= 4 println 2 >= 5 println 3 >= 3", () => {
      const source = "println 5 >= 4 println 2 >= 5 println 3 >= 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 14,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "false", "true"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" >= "b" println "aa" >= "aaa" println "bb" >= "bb" println "bbb" >= "BBB" println "B" >= "bb"', () => {
      const source = 'println "a" >= "b" println "aa" >= "aaa" println "bb" >= "bb" println "bbb" >= "BBB" println "B" >= "bb"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 22,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aa" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aaa" }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bbb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "BBB" }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "B" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "GE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "false", "true", "true", "false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 >= true", () => {
      const source = "println 1 >= true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GE between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println 1 >= "abc"', () => {
      const source = 'println 1 >= "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GE between TYPE_NUMBER and TYPE_STRING at 3."
        );
      }
    });
    it('run virtual machine with println true >= "abc"', () => {
      const source = 'println true >= "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GE between TYPE_BOOL and TYPE_STRING at 3."
        );
      }
    });
    it("run virtual machine with println true >= 1", () => {
      const source = "println true >= 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on GE between TYPE_BOOL and TYPE_NUMBER at 3."
        );
      }
    });
    it("run virtual machine with println 5 == 4 println 2 == 5 println 3 == 3", () => {
      const source = "println 5 == 4 println 2 == 5 println 3 == 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 14,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "false", "true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println true == true println true == false println false == true println false == false", () => {
      const source = "println true == true println true == false println false == true println false == false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 18,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "false", "false", "true"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" == "b" println "aa" == "aaa" println "bb" == "bb" println "bbb" == "BBB" println "B" == "bb"', () => {
      const source = 'println "a" == "b" println "aa" == "aaa" println "bb" == "bb" println "bbb" == "BBB" println "B" == "bb"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 22,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aa" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aaa" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bbb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "BBB" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "B" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "false", "true", "false", "false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 == true", () => {
      const source = "println 1 == true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on EQ between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println 1 == "abc"', () => {
      const source = 'println 1 == "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on EQ between TYPE_NUMBER and TYPE_STRING at 3."
        );
      }
    });
    it('run virtual machine with println true == "abc"', () => {
      const source = 'println true == "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on EQ between TYPE_BOOL and TYPE_STRING at 3."
        );
      }
    });
    it("run virtual machine with println true == 1", () => {
      const source = "println true == 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on EQ between TYPE_BOOL and TYPE_NUMBER at 3."
        );
      }
    });
    it("run virtual machine with println 5 ~= 4 println 2 ~= 5 println 3 ~= 3", () => {
      const source = "println 5 ~= 4 println 2 ~= 5 println 3 ~= 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 14,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "true", "false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println true ~= true println true ~= false println false ~= true println false ~= false", () => {
      const source = "println true ~= true println true ~= false println false ~= true println false ~= false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 18,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false", "true", "true", "false"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" ~= "b" println "aa" ~= "aaa" println "bb" ~= "bb" println "bbb" ~= "BBB" println "B" ~= "bb"', () => {
      const source = 'println "a" ~= "b" println "aa" ~= "aaa" println "bb" ~= "bb" println "bbb" ~= "BBB" println "B" ~= "bb"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 22,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aa" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "aaa" }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bbb" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "BBB" }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "B" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "bb" }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true", "true", "false", "true", "true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1 ~= true", () => {
      const source = "println 1 ~= true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on NE between TYPE_NUMBER and TYPE_BOOL at 3."
        );
      }
    });
    it('run virtual machine with println 1 ~= "abc"', () => {
      const source = 'println 1 ~= "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on NE between TYPE_NUMBER and TYPE_STRING at 3."
        );
      }
    });
    it('run virtual machine with println true ~= "abc"', () => {
      const source = 'println true ~= "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on NE between TYPE_BOOL and TYPE_STRING at 3."
        );
      }
    });
    it("run virtual machine with println true ~= 1", () => {
      const source = "println true ~= 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      try {
        const runVMOptions = createTestVMOptions({
          consoleOutput: CONSOLE_OUTPUT,
          enableLog: true
        });
        const result = runVM(vm, instructions, runVMOptions);
      } catch (error) {
        expect(error.message).toBe(
          "Error on NE between TYPE_BOOL and TYPE_NUMBER at 3."
        );
      }
    });
    it("run virtual machine with println (2+3) * 5 - 1", () => {
      const source = "println (2+3) * 5 - 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 10,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 5 }
          },
          { command: "MUL" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "SUB" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["24"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println true", () => {
      const source = "println true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 4,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 1==2", () => {
      const source = "println 1==2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 6,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println ~(3 > 2) or true", () => {
      const source = "println ~(3 > 2) or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 10,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "GT" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "XOR" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "OR" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println ~(3 > 2) or ~true", () => {
      const source = "println ~(3 > 2) or ~true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 12,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "GT" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "XOR" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "XOR" },
          { command: "OR" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with if else statements enter the consequence block", () => {
      const source = 'if 3 >=0 then\nprintln "Entered the consequence block."\nelse\nprintln "Entered the alternative block."\nend\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0, LBL1: 5, LBL2: 9, LBL3: 12 },
          programCounter: 16,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "GE" },
          {
            command: "JMPZ",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL1" }
          },
          {
            command: "PUSH",
            argument: {
              type: "TYPE_STRING",
              value: "Entered the consequence block."
            }
          },
          { command: "PRINTLN" },
          {
            command: "JMP",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "PUSH",
            argument: {
              type: "TYPE_STRING",
              value: "Entered the alternative block."
            }
          },
          { command: "PRINTLN" },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "Goodbye!" }
          },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["Entered the consequence block.", "Goodbye!"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with if else statements enter the alternative block", () => {
      const source = 'if 3 <=0 then\nprintln "Entered the consequence block."\nelse\nprintln "Entered the alternative block."\nend\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0, LBL1: 5, LBL2: 9, LBL3: 12 },
          programCounter: 16,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "LE" },
          {
            command: "JMPZ",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL1" }
          },
          {
            command: "PUSH",
            argument: {
              type: "TYPE_STRING",
              value: "Entered the consequence block."
            }
          },
          { command: "PRINTLN" },
          {
            command: "JMP",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "PUSH",
            argument: {
              type: "TYPE_STRING",
              value: "Entered the alternative block."
            }
          },
          { command: "PRINTLN" },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "Goodbye!" }
          },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["Entered the alternative block.", "Goodbye!"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println 3 > 2 ~= false", () => {
      const source = "println 3 > 2 ~= false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 8,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "GT" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: false }
          },
          { command: "NE" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "this" == "that"', () => {
      const source = 'println "this" == "that"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 6,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "this" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "that" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["false"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with println ~(-1>2)", () => {
      const source = "println ~(-1>2)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 9,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "NEG" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "GT" },
          {
            command: "PUSH",
            argument: { type: "TYPE_BOOL", value: true }
          },
          { command: "XOR" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true"]
      };
      expect(result).toBe(expected);
    });
    it('run virtual machine with println "a" + "b" == "ab"', () => {
      const source = 'println "a" + "b" == "ab"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          programCounter: 8,
          stackPointer: 0,
          isRunning: false,
          globals: {}
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "a" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "b" }
          },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "ab" }
          },
          { command: "EQ" },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["true"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with global variables", () => {
      const source = "x := 100\ny := 200\nz := 300\nprintln (x)\nprintln (y)\nprintln (z)\na := x + 1\nprintln (a)\n";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0 },
          globals: {
            0: { type: "TYPE_NUMBER", value: 100 },
            1: { type: "TYPE_NUMBER", value: 200 },
            2: { type: "TYPE_NUMBER", value: 300 },
            3: { type: "TYPE_NUMBER", value: 101 }
          },
          programCounter: 20,
          stackPointer: 0,
          isRunning: false
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 100 }
          },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 200 }
          },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 1 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 300 }
          },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 2 }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          { command: "PRINTLN" },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 1 }
          },
          { command: "PRINTLN" },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 2 }
          },
          { command: "PRINTLN" },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "ADD" },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 3 }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 3 }
          },
          { command: "PRINTLN" },
          { command: "HALT" }
        ],
        log: ["100", "200", "300", "101"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with local variables 1", () => {
      const source = "x := 100\ny := 200\nif x > 0 then\na := 10\nb := 20\nif x > 1 then\nc := 3\na := c + 2\nprintln(a)\nprintln(c)\nif x > 2 then\nd := 2 + b + a\nprintln(d)\nelse\nc := 0\ne := 1 + c - 4 + (a - 2)\nend\nend\nend\n";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const result = runVM(vm, instructions, runVMOptions);
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: {
            START: 0,
            LBL1: 9,
            LBL4: 18,
            LBL7: 33,
            LBL8: 44,
            LBL9: 58,
            LBL5: 61,
            LBL6: 62,
            LBL2: 66,
            LBL3: 67
          },
          globals: {
            0: { type: "TYPE_NUMBER", value: 100 },
            1: { type: "TYPE_NUMBER", value: 200 }
          },
          programCounter: 69,
          stackPointer: 0,
          isRunning: false
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 100 }
          },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 200 }
          },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 1 }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          { command: "GT" },
          {
            command: "JMPZ",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL1" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 10 }
          },
          {
            command: "SET_SLOT",
            argument: { type: "TYPE_STACK_SLOT", value: "0 (a)" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 20 }
          },
          {
            command: "SET_SLOT",
            argument: { type: "TYPE_STACK_SLOT", value: "1 (b)" }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "GT" },
          {
            command: "JMPZ",
            argument: { type: "TYPE_LABEL", value: "LBL5" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL4" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 3 }
          },
          {
            command: "SET_SLOT",
            argument: { type: "TYPE_STACK_SLOT", value: "2 (c)" }
          },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "ADD" },
          {
            command: "STORE_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 0 }
          },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 0 }
          },
          { command: "PRINTLN" },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 2 }
          },
          { command: "PRINTLN" },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "GT" },
          {
            command: "JMPZ",
            argument: { type: "TYPE_LABEL", value: "LBL8" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL7" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 1 }
          },
          { command: "ADD" },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 0 }
          },
          { command: "ADD" },
          {
            command: "SET_SLOT",
            argument: { type: "TYPE_STACK_SLOT", value: "3 (d)" }
          },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 3 }
          },
          { command: "PRINTLN" },
          { command: "POP" },
          {
            command: "JMP",
            argument: { type: "TYPE_LABEL", value: "LBL9" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL8" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 0 }
          },
          {
            command: "STORE_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 2 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 2 }
          },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 4 }
          },
          { command: "SUB" },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          { command: "SUB" },
          { command: "ADD" },
          {
            command: "SET_SLOT",
            argument: { type: "TYPE_STACK_SLOT", value: "3 (e)" }
          },
          { command: "POP" },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL9" }
          },
          { command: "POP" },
          {
            command: "JMP",
            argument: { type: "TYPE_LABEL", value: "LBL6" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL5" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL6" }
          },
          { command: "POP" },
          { command: "POP" },
          {
            command: "JMP",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          { command: "HALT" }
        ],
        log: ["5", "3", "27"]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with a while loop", () => {
      const source = 'i := 1\nwhile i <= 10 do\nres := 2 * i\nprintln("2*" + i + " = " + res)\ni := i + 1\nend\n';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const result = runVM(vm, instructions, runVMOptions);
      const expected = {
        vm: {
          stack: [],
          frames: [],
          labels: { START: 0, LBL1: 3, LBL2: 8, LBL3: 27 },
          globals: { 0: { type: "TYPE_NUMBER", value: 11 } },
          programCounter: 29,
          stackPointer: 0,
          isRunning: false
        },
        instructions: [
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "START" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL1" }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 10 }
          },
          { command: "LE" },
          {
            command: "JMPZ",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL2" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 2 }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          { command: "MUL" },
          {
            command: "SET_SLOT",
            argument: { type: "TYPE_STACK_SLOT", value: "0 (res)" }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: "2*" }
          },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          { command: "ADD" },
          {
            command: "PUSH",
            argument: { type: "TYPE_STRING", value: " = " }
          },
          { command: "ADD" },
          {
            command: "LOAD_LOCAL",
            argument: { type: "TYPE_STACK_SLOT", value: 0 }
          },
          { command: "ADD" },
          { command: "PRINTLN" },
          {
            command: "LOAD_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 1 }
          },
          { command: "ADD" },
          {
            command: "STORE_GLOBAL",
            argument: { type: "TYPE_SYMBOL", value: 0 }
          },
          { command: "POP" },
          {
            command: "JMP",
            argument: { type: "TYPE_LABEL", value: "LBL1" }
          },
          {
            command: "LABEL",
            argument: { type: "TYPE_LABEL", value: "LBL3" }
          },
          { command: "HALT" }
        ],
        log: [
          "2*1 = 2",
          "2*2 = 4",
          "2*3 = 6",
          "2*4 = 8",
          "2*5 = 10",
          "2*6 = 12",
          "2*7 = 14",
          "2*8 = 16",
          "2*9 = 18",
          "2*10 = 20"
        ]
      };
      expect(result).toBe(expected);
    });
    it("run virtual machine with a procedure say", () => {
      const source = 'x := 0\nfunc say()\nprintln "Hello!"\nend\nsay()';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const result = runVM(vm, instructions, runVMOptions).log;
      const expected = ["Hello!"];
      expect(result).toBe(expected);
    });
    it("run virtual machine with a procedure", () => {
      const source = 'x := 0\nfunc say()\nprintln "Hello1!"\nprintln "Hello2!"\nprintln "Hello3!"\nend\nsay()\nprintln "After the call"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const result = runVM(vm, instructions, runVMOptions).log;
      const expected = ["Hello1!", "Hello2!", "Hello3!", "After the call"];
      expect(result).toBe(expected);
    });
    it("run virtual machine with 3 procedures with arguments", () => {
      const source = 'x := 5\nfunc func_3(x, y)\n  result := x * y\n  println result\nend\nfunc func_2(x, y)\n  result := x + y\n  func_3(7, 9 + y)\n  println result\nend\nfunc func_1(a, b, c)\n  println a\n  println b\n  func_2(2, 3)\n  println c\nend\nfunc_1(1 + 2, 2 + 3, 3 + x)\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const instructions = generateCode(compiler, ast);
      const vm = new VirtualMachine();
      const runVMOptions = createTestVMOptions({
        consoleOutput: CONSOLE_OUTPUT,
        enableLog: true
      });
      const interpretationResult = RUN_INTERPRETER ? interpretAST(ast) : void 0;
      const result = runVM(vm, instructions, runVMOptions).log;
      const expected = ["3", "5", "84", "5", "8", "Goodbye!"];
      expect(result).toBe(expected);
    });
  });
};

// tests/virtualMachine/runCode.test.js
var runCode_test_exports = {};
__export(runCode_test_exports, {
  runCode_test: () => runCode_test
});
var runCode_test = () => {
  describe("run code", () => {
  });
};

// tests/virtualMachine/createLabelTable.test.js
var createLabelTable_test_exports = {};
__export(createLabelTable_test_exports, {
  create_label_table_test: () => create_label_table_test
});
var create_label_table_test = () => {
  describe("create label table", () => {
    it("create label table START", () => {
      const vm = new VirtualMachine();
      const instructions = [
        {
          command: "LABEL",
          argument: { type: "LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "GT" },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "XOR" },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "XOR" },
        { command: "OR" },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      const result = createLabelTable(vm, instructions);
      const expected = {
        stack: [],
        frames: [],
        labels: { START: 0 },
        programCounter: 0,
        stackPointer: 0,
        isRunning: false,
        globals: {}
      };
      expect(result).toBe(expected);
    });
    it("create label table START", () => {
      const vm = new VirtualMachine();
      const instructions = [
        {
          command: "LABEL",
          argument: { type: "LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        { command: "GE" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: {
            type: "TYPE_STRING",
            value: "Entered the consequence block."
          }
        },
        { command: "PRINTLN" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "PUSH",
          argument: {
            type: "TYPE_STRING",
            value: "Entered the alternative block."
          }
        },
        { command: "PRINTLN" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Goodbye!" }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      const result = createLabelTable(vm, instructions);
      const expected = {
        stack: [],
        frames: [],
        labels: { START: 0, LBL1: 5, LBL2: 9, LBL3: 12 },
        programCounter: 0,
        stackPointer: 0,
        isRunning: false,
        globals: {}
      };
      expect(result).toBe(expected);
    });
    it("create label table START", () => {
      const vm = new VirtualMachine();
      const instructions = [
        {
          command: "LABEL",
          argument: { type: "LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        { command: "GE" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: {
            type: "TYPE_STRING",
            value: "Entered the consequence block."
          }
        },
        { command: "PRINTLN" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL" }
        },
        {
          command: "PUSH",
          argument: {
            type: "TYPE_STRING",
            value: "Entered the alternative block."
          }
        },
        { command: "PRINTLN" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Goodbye!" }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      try {
        createLabelTable(vm, instructions);
      } catch (error) {
        const expected = "Missing the LABEL value when creating labels table at 9 instruction.";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/utils/sum.test.js
var sum_test_exports = {};
__export(sum_test_exports, {
  sum_test: () => sum_test
});

// src/utils/sum.js
function sum(a, b) {
  return a + b;
}

// tests/utils/sum.test.js
var sum_test = () => {
  describe("sum", () => {
    it("sum 1+2", () => {
      const result = sum(1, 2);
      const expected = 3;
      expect(result).toBe(expected);
    });
  });
};

// tests/utils/reverse.test.js
var reverse_test_exports = {};
__export(reverse_test_exports, {
  reverse_test: () => reverse_test
});
var reverse_test = () => {
  describe("reverse array", () => {
    it("reverse array of numbers", () => {
      const array = [4, 5, 6];
      const result = reverse(array);
      const expected = [6, 5, 4];
      expect(result).toBe(expected);
    });
    it("reverse array of numbers and strings", () => {
      const array = ["a", 4, 5, 6, "b"];
      const result = reverse(array);
      const expected = ["b", 6, 5, 4, "a"];
      expect(result).toBe(expected);
    });
  });
};

// tests/utils/prettifyVMCode.test.js
var prettifyVMCode_test_exports = {};
__export(prettifyVMCode_test_exports, {
  prettify_VM_code_test: () => prettify_VM_code_test
});
var prettify_VM_code_test = () => {
  describe("prettify virtual machine code", () => {
  });
};

// tests/utils/prefixInRange.test.js
var prefixInRange_test_exports = {};
__export(prefixInRange_test_exports, {
  prefix_in_range_test: () => prefix_in_range_test
});
var prefix_in_range_test = () => {
  describe("prefix in range", () => {
    it("prefix in range 00000001", () => {
      const result = prefixInRange("0", 1, 8);
      const expected = "00000001";
      expect(result).toBe(expected);
    });
    it("prefix in range 0000000", () => {
      const result = prefixInRange("0", 4321, 8);
      const expected = "00004321";
      expect(result).toBe(expected);
    });
  });
};

// tests/utils/enumerate.test.js
var enumerate_test_exports = {};
__export(enumerate_test_exports, {
  reverse_test: () => reverse_test2
});
var reverse_test2 = () => {
  describe("enumerate array", () => {
    it("enumerate array of numbers", () => {
      const array = [4, 5, 6];
      const result = enumerate(array);
      const expected = [
        { element: 4, index: 0 },
        { element: 5, index: 1 },
        { element: 6, index: 2 }
      ];
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/whileStatement.test.js
var whileStatement_test_exports = {};
__export(whileStatement_test_exports, {
  while_statement_test: () => while_statement_test
});
var while_statement_test = () => {
  describe("while statement", () => {
    it("while statement", () => {
      const source = 'while i <= 10 do\nprintln("i = " + i)\ni := i + 1\nend';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = whileStatement(current, tokens.tokens);
      const expected = {
        node: {
          test: {
            operator: {
              tokenType: "TOK_LE",
              lexeme: "<=",
              line: 1
            },
            left: { name: "i", line: 1 },
            right: { value: 10, line: 1 },
            line: 1
          },
          bodyStatements: {
            statements: [
              {
                value: {
                  value: {
                    operator: {
                      tokenType: "TOK_PLUS",
                      lexeme: "+",
                      line: 2
                    },
                    left: { value: "i = ", line: 2 },
                    right: { name: "i", line: 2 },
                    line: 2
                  },
                  line: 2
                },
                line: 2
              },
              {
                left: { name: "i", line: 3 },
                right: {
                  operator: {
                    tokenType: "TOK_PLUS",
                    lexeme: "+",
                    line: 3
                  },
                  left: { name: "i", line: 3 },
                  right: { value: 1, line: 3 },
                  line: 3
                },
                line: 3
              }
            ],
            line: 2
          },
          line: 1
        },
        current: 17,
        tokens: [
          { tokenType: "TOK_WHILE", lexeme: "while", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 1 },
          { tokenType: "TOK_LE", lexeme: "<=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 },
          { tokenType: "TOK_DO", lexeme: "do", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 2 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 2 },
          { tokenType: "TOK_STRING", lexeme: '"i = "', line: 2 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 2 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 3 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 3 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_END", lexeme: "end", line: 4 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/unary.test.js
var unary_test_exports = {};
__export(unary_test_exports, {
  unary_test: () => unary_test
});
var unary_test = () => {
  describe("unary", () => {
    it("unary -1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_MINUS, "-", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = unary(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          operand: { value: 1, line: 1 },
          line: 1
        },
        current: 2,
        tokens: [
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("unary ~1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_NOT, "~", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = unary(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          operand: { value: 1, line: 1 },
          line: 1
        },
        current: 2,
        tokens: [
          { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("unary +1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = unary(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          operand: { value: 1, line: 1 },
          line: 1
        },
        current: 2,
        tokens: [
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("unary ~~1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_NOT, "~", 1),
        new Token(TOKENS.TOK_NOT, "~", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = unary(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          operand: {
            operator: {
              tokenType: "TOK_NOT",
              lexeme: "~",
              line: 1
            },
            operand: { value: 1, line: 1 },
            line: 1
          },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("unary ~(-1)", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_NOT, "~", 1),
        new Token(TOKENS.TOK_LPAREN, "(", 1),
        new Token(TOKENS.TOK_MINUS, "-", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = unary(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          operand: {
            value: {
              operator: {
                tokenType: "TOK_MINUS",
                lexeme: "-",
                line: 1
              },
              operand: { value: 1, line: 1 },
              line: 1
            },
            line: 1
          },
          line: 1
        },
        current: 5,
        tokens: [
          { tokenType: "TOK_NOT", lexeme: "~", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/returnStatement.test.js
var returnStatement_test_exports = {};
__export(returnStatement_test_exports, {
  return_statement_test: () => return_statement_test
});
var return_statement_test = () => {
  describe("return statement", () => {
    it("ret 10", () => {
      const source = "ret 10";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = returnStatement(current, tokens.tokens);
      const expected = {
        node: { value: { value: 10, line: 1 }, line: 1 },
        current: 2,
        tokens: [
          { tokenType: "TOK_RET", lexeme: "ret", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/primary.test.js
var primary_test_exports = {};
__export(primary_test_exports, {
  primary_test: () => primary_test
});
var primary_test = () => {
  describe("primary", () => {
    it("primary integer", () => {
      const current = 0;
      const tokens = [
        { tokenType: TOKENS.TOK_INTEGER, lexeme: "34", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { value: 34, line: 1 },
        current: 1,
        tokens: [{ tokenType: "TOK_INTEGER", lexeme: "34", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("primary float", () => {
      const current = 0;
      const tokens = [
        { tokenType: TOKENS.TOK_FLOAT, lexeme: "123.456", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { value: 123.456, line: 1 },
        current: 1,
        tokens: [
          { tokenType: "TOK_FLOAT", lexeme: "123.456", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("primary (34)", () => {
      const current = 0;
      const tokens = [
        { tokenType: TOKENS.TOK_LPAREN, lexeme: "(", line: 1 },
        { tokenType: TOKENS.TOK_INTEGER, lexeme: "34", line: 1 },
        { tokenType: TOKENS.TOK_RPAREN, lexeme: ")", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { value: { value: 34, line: 1 }, line: 1 },
        current: 3,
        tokens: [
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "34", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("primary (34", () => {
      const current = 0;
      const tokens = [
        { tokenType: TOKENS.TOK_LPAREN, lexeme: "(", line: 1 },
        { tokenType: TOKENS.TOK_INTEGER, lexeme: "34", line: 1 }
      ];
      try {
        primary(current, tokens);
      } catch (error) {
        const expected = "Line 1 Error: ')' expected.";
        expect(error.message).toBe(expected);
      }
    });
    it("primary identifier x", () => {
      const current = 0;
      const tokens = [
        { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { name: "x", line: 1 },
        current: 1,
        tokens: [{ tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("primary identifier xyz", () => {
      const current = 0;
      const tokens = [
        { tokenType: "TOK_IDENTIFIER", lexeme: "xyz", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { name: "xyz", line: 1 },
        current: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "xyz", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("primary identifier _", () => {
      const current = 0;
      const tokens = [
        { tokenType: "TOK_IDENTIFIER", lexeme: "_", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { name: "_", line: 1 },
        current: 1,
        tokens: [{ tokenType: "TOK_IDENTIFIER", lexeme: "_", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("primary identifier _0", () => {
      const current = 0;
      const tokens = [
        { tokenType: "TOK_IDENTIFIER", lexeme: "_0", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { name: "_0", line: 1 },
        current: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "_0", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("primary identifier _0_xyz", () => {
      const current = 0;
      const tokens = [
        { tokenType: "TOK_IDENTIFIER", lexeme: "_0_xyz", line: 1 }
      ];
      const result = primary(current, tokens);
      const expected = {
        node: { name: "_0_xyz", line: 1 },
        current: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "_0_xyz", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("function call some_func(10)", () => {
      const current = 0;
      const source = "some_func(10)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = primary(current, tokens.tokens);
      const expected = {
        node: {
          name: "some_func",
          args: [{ value: 10, line: 1 }],
          line: 1
        },
        current: 4,
        tokens: [
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "some_func",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("function call some_func(10, 20)", () => {
      const current = 0;
      const source = "some_func(10, 20)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = primary(current, tokens.tokens);
      const expected = {
        node: {
          name: "some_func",
          args: [
            { value: 10, line: 1 },
            { value: 20, line: 1 }
          ],
          line: 1
        },
        current: 6,
        tokens: [
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "some_func",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "20", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('function call some_func("a", "b")', () => {
      const current = 0;
      const source = 'some_func("a", "b")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = primary(current, tokens.tokens);
      const expected = {
        node: {
          name: "some_func",
          args: [
            { value: "a", line: 1 },
            { value: "b", line: 1 }
          ],
          line: 1
        },
        current: 6,
        tokens: [
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "some_func",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"a"', line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"b"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/parseStatements.test.js
var parseStatements_test_exports = {};
__export(parseStatements_test_exports, {
  parse_statements_test: () => parse_statements_test
});
var parse_statements_test = () => {
  describe("parse statements", () => {
    it("parse statement print 1 + 2", () => {
      const current = 0;
      const source = "print 1 + 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              value: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { value: 1, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 4,
        tokens: [
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement print 1 + 2 print 3", () => {
      const current = 0;
      const source = `print 1 + 2 print 3`;
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              value: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { value: 1, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              line: 1
            },
            { value: { value: 3, line: 1 }, line: 1 }
          ],
          line: 1
        },
        current: 6,
        tokens: [
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('parse statement print 1 + 2 print 3 * 2^2 print("test")', () => {
      const current = 0;
      const source = `print 1 + 2 print 3 * 2^2 print("test")`;
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              value: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { value: 1, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              line: 1
            },
            {
              value: {
                operator: {
                  tokenType: "TOK_STAR",
                  lexeme: "*",
                  line: 1
                },
                left: { value: 3, line: 1 },
                right: {
                  operator: {
                    tokenType: "TOK_CARET",
                    lexeme: "^",
                    line: 1
                  },
                  left: { value: 2, line: 1 },
                  right: { value: 2, line: 1 },
                  line: 1
                },
                line: 1
              },
              line: 1
            },
            {
              value: {
                value: { value: "test", line: 1 },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 14,
        tokens: [
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"test"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('parse statement print "\n" print 1 + 2 print "\n" print 3 * 2^2 print "\n" print("test")', () => {
      const current = 0;
      const source = 'print "\n" print 1 + 2 print "\n" print 3 * 2^2 print "\n" print("test")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            { value: { value: "\n", line: 1 }, line: 1 },
            {
              value: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { value: 1, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              line: 1
            },
            { value: { value: "\n", line: 1 }, line: 1 },
            {
              value: {
                operator: {
                  tokenType: "TOK_STAR",
                  lexeme: "*",
                  line: 1
                },
                left: { value: 3, line: 1 },
                right: {
                  operator: {
                    tokenType: "TOK_CARET",
                    lexeme: "^",
                    line: 1
                  },
                  left: { value: 2, line: 1 },
                  right: { value: 2, line: 1 },
                  line: 1
                },
                line: 1
              },
              line: 1
            },
            { value: { value: "\n", line: 1 }, line: 1 },
            {
              value: {
                value: { value: "test", line: 1 },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 20,
        tokens: [
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"\n"', line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"\n"', line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"\n"', line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"test"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('parse statement print "\n" print 1 + 2 println 3 * 2^2 println("test") print("This is a test of break\nline.\n")', () => {
      const current = 0;
      const source = 'print "\n" print 1 + 2 println 3 * 2^2 println("test") print("This is a test of break\nline.\n")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            { value: { value: "\n", line: 1 }, line: 1 },
            {
              value: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { value: 1, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              line: 1
            },
            {
              value: {
                operator: {
                  tokenType: "TOK_STAR",
                  lexeme: "*",
                  line: 1
                },
                left: { value: 3, line: 1 },
                right: {
                  operator: {
                    tokenType: "TOK_CARET",
                    lexeme: "^",
                    line: 1
                  },
                  left: { value: 2, line: 1 },
                  right: { value: 2, line: 1 },
                  line: 1
                },
                line: 1
              },
              line: 1
            },
            {
              value: {
                value: { value: "test", line: 1 },
                line: 1
              },
              line: 1
            },
            {
              value: {
                value: {
                  value: "This is a test of break\nline.\n",
                  line: 1
                },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 20,
        tokens: [
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"\n"', line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"test"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          {
            tokenType: "TOK_STRING",
            lexeme: '"This is a test of break\nline.\n"',
            line: 1
          },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement x := 10", () => {
      const current = 0;
      const source = "x := 10";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "x", line: 1 },
              right: { value: 10, line: 1 },
              line: 1
            }
          ],
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('parse statement _xyz10 := "abc"', () => {
      const current = 0;
      const source = '_xyz10 := "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "_xyz10", line: 1 },
              right: { value: "abc", line: 1 },
              line: 1
            }
          ],
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "_xyz10", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"abc"', line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement x := 0 x := x + 1", () => {
      const current = 0;
      const source = "x := 0 x := x + 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "x", line: 1 },
              right: { value: 0, line: 1 },
              line: 1
            },
            {
              left: { name: "x", line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { name: "x", line: 1 },
                right: { value: 1, line: 1 },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 8,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "0", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('parse statement print 1 + 2 x := 0 x := x + 1 if 5~=2 then println "True!" end', () => {
      const current = 0;
      const source = 'print 1 + 2 x := 0 x := x + 1 if 5~=2 then println "True!" end';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              value: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { value: 1, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              line: 1
            },
            {
              left: { name: "x", line: 1 },
              right: { value: 0, line: 1 },
              line: 1
            },
            {
              left: { name: "x", line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: { name: "x", line: 1 },
                right: { value: 1, line: 1 },
                line: 1
              },
              line: 1
            },
            {
              test: {
                operator: {
                  tokenType: "TOK_NE",
                  lexeme: "~=",
                  line: 1
                },
                left: { value: 5, line: 1 },
                right: { value: 2, line: 1 },
                line: 1
              },
              thenStatements: {
                statements: [
                  {
                    value: { value: "True!", line: 1 },
                    line: 1
                  }
                ],
                line: 1
              },
              elseStatements: void 0,
              line: 1
            }
          ],
          line: 1
        },
        current: 20,
        tokens: [
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "0", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_IF", lexeme: "if", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_NE", lexeme: "~=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_THEN", lexeme: "then", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"True!"', line: 1 },
          { tokenType: "TOK_END", lexeme: "end", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse while statement", () => {
      const source = 'i := 0\nwhile i <= 10 do\nprintln("i = " + i)\ni := i + 1\nend';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "i", line: 1 },
              right: { value: 0, line: 1 },
              line: 1
            },
            {
              test: {
                operator: {
                  tokenType: "TOK_LE",
                  lexeme: "<=",
                  line: 2
                },
                left: { name: "i", line: 2 },
                right: { value: 10, line: 2 },
                line: 2
              },
              bodyStatements: {
                statements: [
                  {
                    value: {
                      value: {
                        operator: {
                          tokenType: "TOK_PLUS",
                          lexeme: "+",
                          line: 3
                        },
                        left: {
                          value: "i = ",
                          line: 3
                        },
                        right: { name: "i", line: 3 },
                        line: 3
                      },
                      line: 3
                    },
                    line: 3
                  },
                  {
                    left: { name: "i", line: 4 },
                    right: {
                      operator: {
                        tokenType: "TOK_PLUS",
                        lexeme: "+",
                        line: 4
                      },
                      left: { name: "i", line: 4 },
                      right: { value: 1, line: 4 },
                      line: 4
                    },
                    line: 4
                  }
                ],
                line: 3
              },
              line: 2
            }
          ],
          line: 1
        },
        current: 20,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "0", line: 1 },
          { tokenType: "TOK_WHILE", lexeme: "while", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 2 },
          { tokenType: "TOK_LE", lexeme: "<=", line: 2 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 2 },
          { tokenType: "TOK_DO", lexeme: "do", line: 2 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 3 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 3 },
          { tokenType: "TOK_STRING", lexeme: '"i = "', line: 3 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 3 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 4 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 4 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 4 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 4 },
          { tokenType: "TOK_END", lexeme: "end", line: 5 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement x := x + y + factorial(5)", () => {
      const current = 0;
      const source = "x := y + z + factorial(5)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "x", line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: {
                  operator: {
                    tokenType: "TOK_PLUS",
                    lexeme: "+",
                    line: 1
                  },
                  left: { name: "y", line: 1 },
                  right: { name: "z", line: 1 },
                  line: 1
                },
                right: {
                  name: "factorial",
                  args: [{ value: 5, line: 1 }],
                  line: 1
                },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 10,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "y", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "z", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('parse statement x := x + y + concat("a", "b", "c")', () => {
      const current = 0;
      const source = 'x := x + y + concat("a", "b", "c")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "x", line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: {
                  operator: {
                    tokenType: "TOK_PLUS",
                    lexeme: "+",
                    line: 1
                  },
                  left: { name: "x", line: 1 },
                  right: { name: "y", line: 1 },
                  line: 1
                },
                right: {
                  name: "concat",
                  args: [
                    { value: "a", line: 1 },
                    { value: "b", line: 1 },
                    { value: "c", line: 1 }
                  ],
                  line: 1
                },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 14,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "y", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "concat", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"a"', line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"b"', line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"c"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement x := y + factorial(5, 7, 6) + z", () => {
      const current = 0;
      const source = "x := y + factorial(5, 7, 6) + z";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              left: { name: "x", line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_PLUS",
                  lexeme: "+",
                  line: 1
                },
                left: {
                  operator: {
                    tokenType: "TOK_PLUS",
                    lexeme: "+",
                    line: 1
                  },
                  left: { name: "y", line: 1 },
                  right: {
                    name: "factorial",
                    args: [
                      { value: 5, line: 1 },
                      { value: 7, line: 1 },
                      { value: 6, line: 1 }
                    ],
                    line: 1
                  },
                  line: 1
                },
                right: { name: "z", line: 1 },
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 14,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "y", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "7", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "6", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "z", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement factorial declaration and call", () => {
      const current = 0;
      const source = 'func factorial(n)\nmul := 1\nfor i := 1, n, 1 do\nmul := mul * i\nend\nprintln("The factorial of " + n + " is " + mul)\nend\nfactorial(5)';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              name: "factorial",
              parameters: [{ name: "n", line: 1 }],
              bodyStatements: {
                statements: [
                  {
                    left: { name: "mul", line: 2 },
                    right: { value: 1, line: 2 },
                    line: 2
                  },
                  {
                    identifier: { name: "i", line: 3 },
                    start: { value: 1, line: 3 },
                    end: { name: "n", line: 3 },
                    step: { value: 1, line: 3 },
                    bodyStatements: {
                      statements: [
                        {
                          left: {
                            name: "mul",
                            line: 4
                          },
                          right: {
                            operator: {
                              tokenType: "TOK_STAR",
                              lexeme: "*",
                              line: 4
                            },
                            left: {
                              name: "mul",
                              line: 4
                            },
                            right: {
                              name: "i",
                              line: 4
                            },
                            line: 4
                          },
                          line: 4
                        }
                      ],
                      line: 4
                    },
                    line: 3
                  },
                  {
                    value: {
                      value: {
                        operator: {
                          tokenType: "TOK_PLUS",
                          lexeme: "+",
                          line: 6
                        },
                        left: {
                          operator: {
                            tokenType: "TOK_PLUS",
                            lexeme: "+",
                            line: 6
                          },
                          left: {
                            operator: {
                              tokenType: "TOK_PLUS",
                              lexeme: "+",
                              line: 6
                            },
                            left: {
                              value: "The factorial of ",
                              line: 6
                            },
                            right: {
                              name: "n",
                              line: 6
                            },
                            line: 6
                          },
                          right: {
                            value: " is ",
                            line: 6
                          },
                          line: 6
                        },
                        right: { name: "mul", line: 6 },
                        line: 6
                      },
                      line: 6
                    },
                    line: 6
                  }
                ],
                line: 2
              },
              line: 1
            },
            {
              expression: {
                name: "factorial",
                args: [{ value: 5, line: 8 }],
                line: 8
              },
              line: 8
            }
          ],
          line: 1
        },
        current: 38,
        tokens: [
          { tokenType: "TOK_FUNC", lexeme: "func", line: 1 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 2 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 2 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 2 },
          { tokenType: "TOK_FOR", lexeme: "for", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 3 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 3 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_DO", lexeme: "do", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 4 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 4 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 4 },
          { tokenType: "TOK_END", lexeme: "end", line: 5 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 6 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 6 },
          {
            tokenType: "TOK_STRING",
            lexeme: '"The factorial of "',
            line: 6
          },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 6 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 6 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 6 },
          { tokenType: "TOK_STRING", lexeme: '" is "', line: 6 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 6 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 6 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 6 },
          { tokenType: "TOK_END", lexeme: "end", line: 7 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 8
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 8 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 8 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 8 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse statement factorial(5, 7, 6)", () => {
      const current = 0;
      const source = "factorial(5, 7, 6)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              expression: {
                name: "factorial",
                args: [
                  { value: 5, line: 1 },
                  { value: 7, line: 1 },
                  { value: 6, line: 1 }
                ],
                line: 1
              },
              line: 1
            }
          ],
          line: 1
        },
        current: 8,
        tokens: [
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "7", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "6", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse function with return statement", () => {
      const current = 0;
      const source = "func factorial(n)\nmul := 1\nfor i := 1, n, 1 do\nmul := mul * i\nend\nret mul\nend\nprintln factorial(5)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parseStatements(current, tokens.tokens);
      const expected = {
        node: {
          statements: [
            {
              name: "factorial",
              parameters: [{ name: "n", line: 1 }],
              bodyStatements: {
                statements: [
                  {
                    left: { name: "mul", line: 2 },
                    right: { value: 1, line: 2 },
                    line: 2
                  },
                  {
                    identifier: { name: "i", line: 3 },
                    start: { value: 1, line: 3 },
                    end: { name: "n", line: 3 },
                    step: { value: 1, line: 3 },
                    bodyStatements: {
                      statements: [
                        {
                          left: {
                            name: "mul",
                            line: 4
                          },
                          right: {
                            operator: {
                              tokenType: "TOK_STAR",
                              lexeme: "*",
                              line: 4
                            },
                            left: {
                              name: "mul",
                              line: 4
                            },
                            right: {
                              name: "i",
                              line: 4
                            },
                            line: 4
                          },
                          line: 4
                        }
                      ],
                      line: 4
                    },
                    line: 3
                  },
                  {
                    value: { name: "mul", line: 6 },
                    line: 6
                  }
                ],
                line: 2
              },
              line: 1
            },
            {
              value: {
                name: "factorial",
                args: [{ value: 5, line: 8 }],
                line: 8
              },
              line: 8
            }
          ],
          line: 1
        },
        current: 31,
        tokens: [
          { tokenType: "TOK_FUNC", lexeme: "func", line: 1 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 2 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 2 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 2 },
          { tokenType: "TOK_FOR", lexeme: "for", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 3 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 3 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_DO", lexeme: "do", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 4 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 4 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 4 },
          { tokenType: "TOK_END", lexeme: "end", line: 5 },
          { tokenType: "TOK_RET", lexeme: "ret", line: 6 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 6 },
          { tokenType: "TOK_END", lexeme: "end", line: 7 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 8 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 8
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 8 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 8 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 8 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/parseError.test.js
var parseError_test_exports = {};
__export(parseError_test_exports, {
  parse_error: () => parse_error
});
var parse_error = () => {
  describe("parse error", () => {
    it("parse error", () => {
      try {
        parseError("Some error", 1);
      } catch (error) {
        const result = error.message;
        const expected = "Line 1 Some error";
        expect(result).toBe(expected);
      }
    });
  });
};

// tests/parser/parse.test.js
var parse_test_exports = {};
__export(parse_test_exports, {
  parse_test: () => parse_test
});

// src/parser/parse.js
function parse(current, tokens) {
  const ast = expression(current, tokens);
  return ast;
}

// tests/parser/parse.test.js
var parse_test = () => {
  describe("parse", () => {
    it("parse 2+42*2+(47*-21)", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "42", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_LPAREN, "(", 1),
        new Token(TOKENS.TOK_INTEGER, "47", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_MINUS, "-", 1),
        new Token(TOKENS.TOK_INTEGER, "21", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = parse(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: {
            operator: {
              tokenType: "TOK_PLUS",
              lexeme: "+",
              line: 1
            },
            left: { value: 2, line: 1 },
            right: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 42, line: 1 },
              right: { value: 2, line: 1 },
              line: 1
            },
            line: 1
          },
          right: {
            value: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 47, line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_MINUS",
                  lexeme: "-",
                  line: 1
                },
                operand: { value: 21, line: 1 },
                line: 1
              },
              line: 1
            },
            line: 1
          },
          line: 1
        },
        current: 12,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "47", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "21", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse tokenized 2+42*2+(47*-21)", () => {
      const current = 0;
      const source = "2+42*2+(47*-21)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parse(current, tokens.tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: {
            operator: {
              tokenType: "TOK_PLUS",
              lexeme: "+",
              line: 1
            },
            left: { value: 2, line: 1 },
            right: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 42, line: 1 },
              right: { value: 2, line: 1 },
              line: 1
            },
            line: 1
          },
          right: {
            value: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 47, line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_MINUS",
                  lexeme: "-",
                  line: 1
                },
                operand: { value: 21, line: 1 },
                line: 1
              },
              line: 1
            },
            line: 1
          },
          line: 1
        },
        current: 12,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "47", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "21", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse 2+42*2+(47*-21", () => {
      const current = 0;
      const source = "2+42*2+(47*-21";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      try {
        parse(current, tokens.tokens);
      } catch (error) {
        const expected = "Line 1 Error: ')' expected.";
        expect(error.message).toBe(expected);
      }
    });
    it("parse 2+42*2$(47*-21)", () => {
      const current = 0;
      const source = "2+42*2$(47*-21)";
      try {
        const tokens = tokenize({
          source,
          current: 0,
          start: 0,
          line: 1,
          tokens: []
        });
        parse(current, tokens.tokens);
      } catch (error) {
        const expected = "Line 1. Error at 6: Unexpected character '$'.";
        expect(error.message).toBe(expected);
      }
    });
    it("parse tokenized true and true", () => {
      const current = 0;
      const source = "true and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parse(current, tokens.tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: true, line: 1 },
          right: { value: true, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse tokenized false and true", () => {
      const current = 0;
      const source = "false and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parse(current, tokens.tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: false, line: 1 },
          right: { value: true, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse tokenized true and false", () => {
      const current = 0;
      const source = "true and false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parse(current, tokens.tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: true, line: 1 },
          right: { value: false, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parse tokenized false and false", () => {
      const current = 0;
      const source = "false and false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const result = parse(current, tokens.tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: false, line: 1 },
          right: { value: false, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/parameters.test.js
var parameters_test_exports = {};
__export(parameters_test_exports, {
  parameters_test: () => parameters_test
});
var parameters_test = () => {
  describe("parameters", () => {
    it("parameter x", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_IDENTIFIER, "x", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = parameters(current, tokens);
      const expected = {
        node: [{ name: "x", line: 1 }],
        current: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("parameters x, y", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_IDENTIFIER, "x", 1),
        new Token(TOKENS.TOK_COMMA, ",", 1),
        new Token(TOKENS.TOK_IDENTIFIER, "y", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = parameters(current, tokens);
      const expected = {
        node: [
          { name: "x", line: 1 },
          { name: "y", line: 1 }
        ],
        current: 3,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "y", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/multiplication.test.js
var multiplication_test_exports = {};
__export(multiplication_test_exports, {
  multiplication_test: () => multiplication_test
});
var multiplication_test = () => {
  describe("multiplication", () => {
    it("multiplication 2*3", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1)
      ];
      const result = multiplication(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 3, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("multiplication 2*3*5", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "5", 1)
      ];
      const result = multiplication(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          left: {
            operator: {
              tokenType: "TOK_STAR",
              lexeme: "*",
              line: 1
            },
            left: { value: 2, line: 1 },
            right: { value: 3, line: 1 },
            line: 1
          },
          right: { value: 5, line: 1 },
          line: 1
        },
        current: 5,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("multiplication 2/10", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_SLASH, "/", 1),
        new Token(TOKENS.TOK_INTEGER, "10", 1)
      ];
      const result = multiplication(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_SLASH", lexeme: "/", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 10, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_SLASH", lexeme: "/", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("multiplication 3*(10*5)", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "3", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_LPAREN, "(", 1),
        new Token(TOKENS.TOK_INTEGER, "10", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "5", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = multiplication(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          left: { value: 3, line: 1 },
          right: {
            value: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 10, line: 1 },
              right: { value: 5, line: 1 },
              line: 1
            },
            line: 1
          },
          line: 1
        },
        current: 7,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/modulo.test.js
var modulo_test_exports = {};
__export(modulo_test_exports, {
  modulo_test: () => modulo_test
});
var modulo_test = () => {
  describe("modulo", () => {
    it("modulo 4%3", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "4", 1),
        new Token(TOKENS.TOK_MOD, "%", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1)
      ];
      const result = modulo(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_MOD", lexeme: "%", line: 1 },
          left: { value: 4, line: 1 },
          right: { value: 3, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "4", line: 1 },
          { tokenType: "TOK_MOD", lexeme: "%", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/logicalOr.test.js
var logicalOr_test_exports = {};
__export(logicalOr_test_exports, {
  logical_or_test: () => logical_or_test
});
var logical_or_test = () => {
  describe("logical or", () => {
    it("logical or true or true", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_TRUE, "true", 1),
        new Token(TOKENS.TOK_OR, "or", 1),
        new Token(TOKENS.TOK_TRUE, "true", 1)
      ];
      const result = logicalOr(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          left: { value: true, line: 1 },
          right: { value: true, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("logical or false or true", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_FALSE, "false", 1),
        new Token(TOKENS.TOK_OR, "or", 1),
        new Token(TOKENS.TOK_TRUE, "true", 1)
      ];
      const result = logicalOr(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          left: { value: false, line: 1 },
          right: { value: true, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 },
          { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("logical or true or false", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_TRUE, "true", 1),
        new Token(TOKENS.TOK_OR, "or", 1),
        new Token(TOKENS.TOK_FALSE, "false", 1)
      ];
      const result = logicalOr(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          left: { value: true, line: 1 },
          right: { value: false, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("logical or false or false", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_FALSE, "false", 1),
        new Token(TOKENS.TOK_OR, "or", 1),
        new Token(TOKENS.TOK_FALSE, "false", 1)
      ];
      const result = logicalOr(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          left: { value: false, line: 1 },
          right: { value: false, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 },
          { tokenType: "TOK_OR", lexeme: "or", line: 1 },
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/logicalAnd.test.js
var logicalAnd_test_exports = {};
__export(logicalAnd_test_exports, {
  logical_and_test: () => logical_and_test
});
var logical_and_test = () => {
  describe("logical and", () => {
    it("logical and true and true", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_TRUE, "true", 1),
        new Token(TOKENS.TOK_AND, "and", 1),
        new Token(TOKENS.TOK_TRUE, "true", 1)
      ];
      const result = logicalAnd(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: true, line: 1 },
          right: { value: true, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("logical and false and true", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_FALSE, "false", 1),
        new Token(TOKENS.TOK_AND, "and", 1),
        new Token(TOKENS.TOK_TRUE, "true", 1)
      ];
      const result = logicalAnd(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: false, line: 1 },
          right: { value: true, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("logical and true and false", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_TRUE, "true", 1),
        new Token(TOKENS.TOK_AND, "and", 1),
        new Token(TOKENS.TOK_FALSE, "false", 1)
      ];
      const result = logicalAnd(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: true, line: 1 },
          right: { value: false, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("logical and false and false", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_FALSE, "false", 1),
        new Token(TOKENS.TOK_AND, "and", 1),
        new Token(TOKENS.TOK_FALSE, "false", 1)
      ];
      const result = logicalAnd(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          left: { value: false, line: 1 },
          right: { value: false, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 },
          { tokenType: "TOK_AND", lexeme: "and", line: 1 },
          { tokenType: "TOK_FALSE", lexeme: "false", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/ifStatement.test.js
var ifStatement_test_exports = {};
__export(ifStatement_test_exports, {
  if_statement_test: () => if_statement_test
});
var if_statement_test = () => {
  describe("if statement", () => {
    it("if true then print 1 end", () => {
      const source = "if true then print 1 end";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = ifStatement(current, tokens.tokens);
      const expected = {
        node: {
          test: { value: true, line: 1 },
          thenStatements: {
            statements: [{ value: { value: 1, line: 1 }, line: 1 }],
            line: 1
          },
          elseStatements: void 0,
          line: 1
        },
        current: 6,
        tokens: [
          { tokenType: "TOK_IF", lexeme: "if", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_THEN", lexeme: "then", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_END", lexeme: "end", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("if true then print 1 else print 2 end", () => {
      const source = "if true then print 1 else print 2 end";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = ifStatement(current, tokens.tokens);
      const expected = {
        node: {
          test: { value: true, line: 1 },
          thenStatements: {
            statements: [{ value: { value: 1, line: 1 }, line: 1 }],
            line: 1
          },
          elseStatements: {
            statements: [{ value: { value: 2, line: 1 }, line: 1 }],
            line: 1
          },
          line: 1
        },
        current: 9,
        tokens: [
          { tokenType: "TOK_IF", lexeme: "if", line: 1 },
          { tokenType: "TOK_TRUE", lexeme: "true", line: 1 },
          { tokenType: "TOK_THEN", lexeme: "then", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_ELSE", lexeme: "else", line: 1 },
          { tokenType: "TOK_PRINT", lexeme: "print", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_END", lexeme: "end", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('if 5 > 2 then println("a") else println("b") end', () => {
      const source = 'if 5 > 2 then println("a") else println("b") end';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = ifStatement(current, tokens.tokens);
      const expected = {
        node: {
          test: {
            operator: { tokenType: "TOK_GT", lexeme: ">", line: 1 },
            left: { value: 5, line: 1 },
            right: { value: 2, line: 1 },
            line: 1
          },
          thenStatements: {
            statements: [
              {
                value: {
                  value: { value: "a", line: 1 },
                  line: 1
                },
                line: 1
              }
            ],
            line: 1
          },
          elseStatements: {
            statements: [
              {
                value: {
                  value: { value: "b", line: 1 },
                  line: 1
                },
                line: 1
              }
            ],
            line: 1
          },
          line: 1
        },
        current: 15,
        tokens: [
          { tokenType: "TOK_IF", lexeme: "if", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_GT", lexeme: ">", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_THEN", lexeme: "then", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"a"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_ELSE", lexeme: "else", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"b"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_END", lexeme: "end", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('if 5 > 2 println("a")', () => {
      const source = 'if 5 > 2 println("a")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      try {
        ifStatement(current, tokens.tokens);
      } catch (error) {
        const expected = "Line 1 expected TOK_THEN, found TOK_PRINTLN";
        expect(error.message).toBe(expected);
      }
    });
    it('if 5 > 2 then println("a") else println("b")', () => {
      const source = 'if 5 > 2 then println("a") else println("b")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      try {
        ifStatement(current, tokens.tokens);
      } catch (error) {
        const expected = "Tried to parse out of token bounds in else statements";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/parser/functionDeclaration.test.js
var functionDeclaration_test_exports = {};
__export(functionDeclaration_test_exports, {
  function_declaration_test: () => function_declaration_test
});
var function_declaration_test = () => {
  describe("function declaration", () => {
    it("factorial", () => {
      const source = 'func factorial(n)\nmul := 1\nfor i := 1, n, 1 do\nmul := mul * i\nend\nprintln("The factorial of " + n + " is " + mul)\nend';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = functionDeclaration(current, tokens.tokens);
      const expected = {
        node: {
          name: "factorial",
          parameters: [{ name: "n", line: 1 }],
          bodyStatements: {
            statements: [
              {
                left: { name: "mul", line: 2 },
                right: { value: 1, line: 2 },
                line: 2
              },
              {
                identifier: { name: "i", line: 3 },
                start: { value: 1, line: 3 },
                end: { name: "n", line: 3 },
                step: { value: 1, line: 3 },
                bodyStatements: {
                  statements: [
                    {
                      left: { name: "mul", line: 4 },
                      right: {
                        operator: {
                          tokenType: "TOK_STAR",
                          lexeme: "*",
                          line: 4
                        },
                        left: { name: "mul", line: 4 },
                        right: { name: "i", line: 4 },
                        line: 4
                      },
                      line: 4
                    }
                  ],
                  line: 4
                },
                line: 3
              },
              {
                value: {
                  value: {
                    operator: {
                      tokenType: "TOK_PLUS",
                      lexeme: "+",
                      line: 6
                    },
                    left: {
                      operator: {
                        tokenType: "TOK_PLUS",
                        lexeme: "+",
                        line: 6
                      },
                      left: {
                        operator: {
                          tokenType: "TOK_PLUS",
                          lexeme: "+",
                          line: 6
                        },
                        left: {
                          value: "The factorial of ",
                          line: 6
                        },
                        right: { name: "n", line: 6 },
                        line: 6
                      },
                      right: { value: " is ", line: 6 },
                      line: 6
                    },
                    right: { name: "mul", line: 6 },
                    line: 6
                  },
                  line: 6
                },
                line: 6
              }
            ],
            line: 2
          },
          line: 1
        },
        current: 34,
        tokens: [
          { tokenType: "TOK_FUNC", lexeme: "func", line: 1 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "factorial",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 2 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 2 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 2 },
          { tokenType: "TOK_FOR", lexeme: "for", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 3 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 3 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 3 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 3 },
          { tokenType: "TOK_DO", lexeme: "do", line: 3 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 4 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 4 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 4 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "i", line: 4 },
          { tokenType: "TOK_END", lexeme: "end", line: 5 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 6 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 6 },
          {
            tokenType: "TOK_STRING",
            lexeme: '"The factorial of "',
            line: 6
          },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 6 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "n", line: 6 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 6 },
          { tokenType: "TOK_STRING", lexeme: '" is "', line: 6 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 6 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "mul", line: 6 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 6 },
          { tokenType: "TOK_END", lexeme: "end", line: 7 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("3 parameters a b c", () => {
      const source = "func print_abc(a, b, c)\nprintln(a + b + c)\nend";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = functionDeclaration(current, tokens.tokens);
      const expected = {
        node: {
          name: "print_abc",
          parameters: [
            { name: "a", line: 1 },
            { name: "b", line: 1 },
            { name: "c", line: 1 }
          ],
          bodyStatements: {
            statements: [
              {
                value: {
                  value: {
                    operator: {
                      tokenType: "TOK_PLUS",
                      lexeme: "+",
                      line: 2
                    },
                    left: {
                      operator: {
                        tokenType: "TOK_PLUS",
                        lexeme: "+",
                        line: 2
                      },
                      left: { name: "a", line: 2 },
                      right: { name: "b", line: 2 },
                      line: 2
                    },
                    right: { name: "c", line: 2 },
                    line: 2
                  },
                  line: 2
                },
                line: 2
              }
            ],
            line: 2
          },
          line: 1
        },
        current: 18,
        tokens: [
          { tokenType: "TOK_FUNC", lexeme: "func", line: 1 },
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "print_abc",
            line: 1
          },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "a", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "b", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "c", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 2 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "a", line: 2 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "b", line: 2 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "c", line: 2 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 2 },
          { tokenType: "TOK_END", lexeme: "end", line: 3 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/forStatement.test.js
var forStatement_test_exports = {};
__export(forStatement_test_exports, {
  for_statement_test: () => for_statement_test
});
var for_statement_test = () => {
  describe("for statement", () => {
    it("for statement with step 2", () => {
      const source = 'for num := 1, 30, 2 do\nprintln("num = " + num)\nend';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = forStatement(current, tokens.tokens);
      const expected = {
        node: {
          identifier: { name: "num", line: 1 },
          start: { value: 1, line: 1 },
          end: { value: 30, line: 1 },
          step: { value: 2, line: 1 },
          bodyStatements: {
            statements: [
              {
                value: {
                  value: {
                    operator: {
                      tokenType: "TOK_PLUS",
                      lexeme: "+",
                      line: 2
                    },
                    left: { value: "num = ", line: 2 },
                    right: { name: "num", line: 2 },
                    line: 2
                  },
                  line: 2
                },
                line: 2
              }
            ],
            line: 2
          },
          line: 1
        },
        current: 16,
        tokens: [
          { tokenType: "TOK_FOR", lexeme: "for", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "num", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "30", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_DO", lexeme: "do", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 2 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 2 },
          { tokenType: "TOK_STRING", lexeme: '"num = "', line: 2 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "num", line: 2 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 2 },
          { tokenType: "TOK_END", lexeme: "end", line: 3 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("for statement without step", () => {
      const source = 'for num := 1, 30 do\nprintln("num = " + num)\nend';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const result = forStatement(current, tokens.tokens);
      const expected = {
        node: {
          identifier: { name: "num", line: 1 },
          start: { value: 1, line: 1 },
          end: { value: 30, line: 1 },
          step: void 0,
          bodyStatements: {
            statements: [
              {
                value: {
                  value: {
                    operator: {
                      tokenType: "TOK_PLUS",
                      lexeme: "+",
                      line: 2
                    },
                    left: { value: "num = ", line: 2 },
                    right: { name: "num", line: 2 },
                    line: 2
                  },
                  line: 2
                },
                line: 2
              }
            ],
            line: 2
          },
          line: 1
        },
        current: 14,
        tokens: [
          { tokenType: "TOK_FOR", lexeme: "for", line: 1 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "num", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "30", line: 1 },
          { tokenType: "TOK_DO", lexeme: "do", line: 1 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 2 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 2 },
          { tokenType: "TOK_STRING", lexeme: '"num = "', line: 2 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "num", line: 2 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 2 },
          { tokenType: "TOK_END", lexeme: "end", line: 3 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/expression.test.js
var expression_test_exports = {};
__export(expression_test_exports, {
  expression_test: () => expression_test
});
var expression_test = () => {
  describe("expression", () => {
    it("expression 2*3", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 3, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2+3", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 3, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2+42", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "42", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 42, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2+42*5", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "42", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "5", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: { value: 2, line: 1 },
          right: {
            operator: {
              tokenType: "TOK_STAR",
              lexeme: "*",
              line: 1
            },
            left: { value: 42, line: 1 },
            right: { value: 5, line: 1 },
            line: 1
          },
          line: 1
        },
        current: 5,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2+42+5", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "42", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "5", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: {
            operator: {
              tokenType: "TOK_PLUS",
              lexeme: "+",
              line: 1
            },
            left: { value: 2, line: 1 },
            right: { value: 42, line: 1 },
            line: 1
          },
          right: { value: 5, line: 1 },
          line: 1
        },
        current: 5,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2+42*5*7", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "42", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "5", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "7", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: { value: 2, line: 1 },
          right: {
            operator: {
              tokenType: "TOK_STAR",
              lexeme: "*",
              line: 1
            },
            left: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 42, line: 1 },
              right: { value: 5, line: 1 },
              line: 1
            },
            right: { value: 7, line: 1 },
            line: 1
          },
          line: 1
        },
        current: 7,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "5", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "7", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2+42*2+(47*-21)", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_INTEGER, "42", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_LPAREN, "(", 1),
        new Token(TOKENS.TOK_INTEGER, "47", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_MINUS, "-", 1),
        new Token(TOKENS.TOK_INTEGER, "21", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: {
            operator: {
              tokenType: "TOK_PLUS",
              lexeme: "+",
              line: 1
            },
            left: { value: 2, line: 1 },
            right: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 42, line: 1 },
              right: { value: 2, line: 1 },
              line: 1
            },
            line: 1
          },
          right: {
            value: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 47, line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_MINUS",
                  lexeme: "-",
                  line: 1
                },
                operand: { value: 21, line: 1 },
                line: 1
              },
              line: 1
            },
            line: 1
          },
          line: 1
        },
        current: 12,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "47", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "21", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("expression 2/42.22*2+(47*-21)", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_SLASH, "/", 1),
        new Token(TOKENS.TOK_FLOAT, "42.22", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_PLUS, "+", 1),
        new Token(TOKENS.TOK_LPAREN, "(", 1),
        new Token(TOKENS.TOK_INTEGER, "47", 1),
        new Token(TOKENS.TOK_STAR, "*", 1),
        new Token(TOKENS.TOK_MINUS, "-", 1),
        new Token(TOKENS.TOK_INTEGER, "21", 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = expression(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          left: {
            operator: {
              tokenType: "TOK_STAR",
              lexeme: "*",
              line: 1
            },
            left: {
              operator: {
                tokenType: "TOK_SLASH",
                lexeme: "/",
                line: 1
              },
              left: { value: 2, line: 1 },
              right: { value: 42.22, line: 1 },
              line: 1
            },
            right: { value: 2, line: 1 },
            line: 1
          },
          right: {
            value: {
              operator: {
                tokenType: "TOK_STAR",
                lexeme: "*",
                line: 1
              },
              left: { value: 47, line: 1 },
              right: {
                operator: {
                  tokenType: "TOK_MINUS",
                  lexeme: "-",
                  line: 1
                },
                operand: { value: 21, line: 1 },
                line: 1
              },
              line: 1
            },
            line: 1
          },
          line: 1
        },
        current: 12,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_SLASH", lexeme: "/", line: 1 },
          { tokenType: "TOK_FLOAT", lexeme: "42.22", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "47", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "21", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/exponent.test.js
var exponent_test_exports = {};
__export(exponent_test_exports, {
  exponent_test: () => exponent_test
});
var exponent_test = () => {
  describe("exponent", () => {
    it("exponent 2^3", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_CARET, "^", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1)
      ];
      const result = exponent(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 3, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("multiplication 2^3^4", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_CARET, "^", 1),
        new Token(TOKENS.TOK_INTEGER, "3", 1),
        new Token(TOKENS.TOK_CARET, "^", 1),
        new Token(TOKENS.TOK_INTEGER, "4", 1)
      ];
      const result = multiplication(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          left: { value: 2, line: 1 },
          right: {
            operator: {
              tokenType: "TOK_CARET",
              lexeme: "^",
              line: 1
            },
            left: { value: 3, line: 1 },
            right: { value: 4, line: 1 },
            line: 1
          },
          line: 1
        },
        current: 5,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "3", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "4", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/equality.test.js
var equality_test_exports = {};
__export(equality_test_exports, {
  equality_test: () => equality_test
});
var equality_test = () => {
  describe("equality", () => {
    it("equality 2==2", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_EQEQ, "==", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = equality(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_EQEQ", lexeme: "==", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 1, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_EQEQ", lexeme: "==", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("equality 2~=2", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_NE, "~=", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = equality(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_NE", lexeme: "~=", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 1, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_NE", lexeme: "~=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/comparison.test.js
var comparison_test_exports = {};
__export(comparison_test_exports, {
  comparison_test: () => comparison_test
});
var comparison_test = () => {
  describe("comparison", () => {
    it("comparison 2>1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_GT, ">", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = comparison(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_GT", lexeme: ">", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 1, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_GT", lexeme: ">", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("comparison 2>=2", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_GE, ">=", 1),
        new Token(TOKENS.TOK_INTEGER, "2", 1)
      ];
      const result = comparison(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_GE", lexeme: ">=", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 2, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_GE", lexeme: ">=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("comparison 2<1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_LT, "<", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = comparison(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_LT", lexeme: "<", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 1, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_LT", lexeme: "<", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("comparison 2<=1", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, "2", 1),
        new Token(TOKENS.TOK_LE, "<=", 1),
        new Token(TOKENS.TOK_INTEGER, "1", 1)
      ];
      const result = comparison(current, tokens);
      const expected = {
        node: {
          operator: { tokenType: "TOK_LE", lexeme: "<=", line: 1 },
          left: { value: 2, line: 1 },
          right: { value: 1, line: 1 },
          line: 1
        },
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_LE", lexeme: "<=", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "1", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/args.test.js
var args_test_exports = {};
__export(args_test_exports, {
  args_test: () => args_test
});
var args_test = () => {
  describe("args", () => {
    it("arg 10", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, 10, 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = args(current, tokens);
      const expected = {
        node: [{ value: 10, line: 1 }],
        current: 1,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: 10, line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("args 10, 20", () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_INTEGER, 10, 1),
        new Token(TOKENS.TOK_COMMA, ",", 1),
        new Token(TOKENS.TOK_INTEGER, 20, 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = args(current, tokens);
      const expected = {
        node: [
          { value: 10, line: 1 },
          { value: 20, line: 1 }
        ],
        current: 3,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: 10, line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: 20, line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('args "a", "b"', () => {
      const current = 0;
      const tokens = [
        new Token(TOKENS.TOK_STRING, '"a"', 1),
        new Token(TOKENS.TOK_COMMA, ",", 1),
        new Token(TOKENS.TOK_STRING, '"b"', 1),
        new Token(TOKENS.TOK_RPAREN, ")", 1)
      ];
      const result = args(current, tokens);
      const expected = {
        node: [
          { value: "a", line: 1 },
          { value: "b", line: 1 }
        ],
        current: 3,
        tokens: [
          { tokenType: "TOK_STRING", lexeme: '"a"', line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"b"', line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/tokenizeNumber.test.js
var tokenizeNumber_test_exports = {};
__export(tokenizeNumber_test_exports, {
  tokenizeNumber_test: () => tokenizeNumber_test
});
var tokenizeNumber_test = () => {
  describe("tokenize number", () => {
    it("tokenize number 1", () => {
      const source = "1";
      const cursor = 0;
      const result = tokenizeNumber(cursor, source);
      const expected = { cursor: 1, tokenType: "TOK_INTEGER" };
      expect(result).toBe(expected);
    });
    it("tokenize number 23361", () => {
      const source = "23361";
      const cursor = 0;
      const result = tokenizeNumber(cursor, source);
      const expected = { cursor: 5, tokenType: "TOK_INTEGER" };
      expect(result).toBe(expected);
    });
    it("tokenize number 729.281", () => {
      const source = "729.281";
      const cursor = 0;
      const result = tokenizeNumber(cursor, source);
      const expected = { cursor: 7, tokenType: "TOK_FLOAT" };
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/tokenize.test.js
var tokenize_test_exports = {};
__export(tokenize_test_exports, {
  tokenize_test: () => tokenize_test
});
var tokenize_test = () => {
  describe("tokenize", () => {
    it("tokenize +", () => {
      const source = "+";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "+",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_PLUS", lexeme: "+", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize ++", () => {
      const source = "++";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "++",
        current: 2,
        start: 2,
        line: 1,
        tokens: [
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize comment --", () => {
      const source = "--";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "--",
        current: 3,
        start: 3,
        line: 1,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize +-+-", () => {
      const source = "+-+-";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "+-+-",
        current: 4,
        start: 4,
        line: 1,
        tokens: [
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize *+-*", () => {
      const source = "*+-*";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "*+-*",
        current: 4,
        start: 4,
        line: 1,
        tokens: [
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize new line", () => {
      const source = "\n";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "\n",
        current: 1,
        start: 1,
        line: 2,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize empty space", () => {
      const source = " ";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: " ",
        current: 1,
        start: 1,
        line: 1,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize multiple spaces", () => {
      const source = "   ";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "   ",
        current: 3,
        start: 3,
        line: 1,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize tab character", () => {
      const source = "	";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "	",
        current: 1,
        start: 1,
        line: 1,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize carriage return character", () => {
      const source = "\r";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "\r",
        current: 1,
        start: 1,
        line: 1,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize ignore comment line", () => {
      const source = "-- This is a comment\n+";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "-- This is a comment\n+",
        current: 22,
        start: 22,
        line: 2,
        tokens: [{ tokenType: "TOK_PLUS", lexeme: "+", line: 2 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize =", () => {
      const source = "=";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "=",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_EQ", lexeme: "=", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize ==", () => {
      const source = "==";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "==",
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_EQEQ", lexeme: "==", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize == ==", () => {
      const source = "== ==";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "== ==",
        current: 5,
        start: 5,
        line: 1,
        tokens: [
          { tokenType: "TOK_EQEQ", lexeme: "==", line: 1 },
          { tokenType: "TOK_EQEQ", lexeme: "==", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize ~", () => {
      const source = "~";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "~",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_NOT", lexeme: "~", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize ~=", () => {
      const source = "~=";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "~=",
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_NE", lexeme: "~=", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize <", () => {
      const source = "<";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "<",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_LT", lexeme: "<", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize <=", () => {
      const source = "<=";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "<=",
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_LE", lexeme: "<=", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize >", () => {
      const source = ">";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: ">",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_GT", lexeme: ">", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize :", () => {
      const source = ":";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: ":",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_COLON", lexeme: ":", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize :=", () => {
      const source = ":=";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: ":=",
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize >=", () => {
      const source = ">=";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: ">=",
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_GE", lexeme: ">=", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize *, ; ++<=", () => {
      const source = " *, ; ++<=";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: " *, ; ++<=",
        current: 10,
        start: 10,
        line: 1,
        tokens: [
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_COMMA", lexeme: ",", line: 1 },
          { tokenType: "TOK_SEMICOLON", lexeme: ";", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_LE", lexeme: "<=", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 0", () => {
      const source = "0";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "0",
        current: 1,
        start: 1,
        line: 1,
        tokens: [{ tokenType: "TOK_INTEGER", lexeme: "0", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 10", () => {
      const source = "10";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "10",
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_INTEGER", lexeme: "10", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 102", () => {
      const source = "102";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "102",
        current: 3,
        start: 3,
        line: 1,
        tokens: [{ tokenType: "TOK_INTEGER", lexeme: "102", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 9985  456    11245", () => {
      const source = "9985  456    11245";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "9985  456    11245",
        current: 18,
        start: 18,
        line: 1,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "9985", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "456", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "11245", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 34 + 102 * 76", () => {
      const source = "34 + 102 * 76";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "34 + 102 * 76",
        current: 13,
        start: 13,
        line: 1,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "34", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "102", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "76", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 86.92", () => {
      const source = "86.92";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "86.92",
        current: 5,
        start: 5,
        line: 1,
        tokens: [{ tokenType: "TOK_FLOAT", lexeme: "86.92", line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 71^38", () => {
      const source = "71^38";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "71^38",
        current: 5,
        start: 5,
        line: 1,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "71", line: 1 },
          { tokenType: "TOK_CARET", lexeme: "^", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "38", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('tokenize ""', () => {
      const source = '""';
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: '""',
        current: 2,
        start: 2,
        line: 1,
        tokens: [{ tokenType: "TOK_STRING", lexeme: '""', line: 1 }]
      };
      expect(result).toBe(expected);
    });
    it('tokenize "76hgs28!aj"', () => {
      const source = '"76hgs28!aj"';
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: '"76hgs28!aj"',
        current: 12,
        start: 12,
        line: 1,
        tokens: [
          {
            tokenType: "TOK_STRING",
            lexeme: '"76hgs28!aj"',
            line: 1
          }
        ]
      };
      expect(result).toBe(expected);
    });
    it('tokenize "aaa""bbb"', () => {
      const source = '"aaa""bbb"';
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: '"aaa""bbb"',
        current: 10,
        start: 10,
        line: 1,
        tokens: [
          { tokenType: "TOK_STRING", lexeme: '"aaa"', line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"bbb"', line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it('tokenize "aaa"10"bbb"', () => {
      const source = '"aaa"10"bbb"';
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: '"aaa"10"bbb"',
        current: 12,
        start: 12,
        line: 1,
        tokens: [
          { tokenType: "TOK_STRING", lexeme: '"aaa"', line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 },
          { tokenType: "TOK_STRING", lexeme: '"bbb"', line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 'aaa'10'bbb'", () => {
      const source = "'aaa'10'bbb'";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "'aaa'10'bbb'",
        current: 12,
        start: 12,
        line: 1,
        tokens: [
          { tokenType: "TOK_STRING", lexeme: "'aaa'", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "10", line: 1 },
          { tokenType: "TOK_STRING", lexeme: "'bbb'", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize _kNp0l21__001_a8", () => {
      const source = "_kNp0l21__001_a8";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "_kNp0l21__001_a8",
        current: 16,
        start: 16,
        line: 1,
        tokens: [
          {
            tokenType: "TOK_IDENTIFIER",
            lexeme: "_kNp0l21__001_a8",
            line: 1
          }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize pi := 3.141592", () => {
      const source = "pi := 3.141592";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "pi := 3.141592",
        current: 14,
        start: 14,
        line: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "pi", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_FLOAT", lexeme: "3.141592", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize x := 8.23", () => {
      const source = "x := 8.23";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "x := 8.23",
        current: 9,
        start: 9,
        line: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_FLOAT", lexeme: "8.23", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it(`tokenize 
        if x >= 0 then
            println("x is positive")
        else
            println("x is negative")
        end
        `, () => {
      const source = '\nif x >= 0 then\n    println("x is positive")\nelse\n    println("x is negative")\nend';
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: '\nif x >= 0 then\n    println("x is positive")\nelse\n    println("x is negative")\nend',
        current: 82,
        start: 82,
        line: 6,
        tokens: [
          { tokenType: "TOK_IF", lexeme: "if", line: 2 },
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 2 },
          { tokenType: "TOK_GE", lexeme: ">=", line: 2 },
          { tokenType: "TOK_INTEGER", lexeme: "0", line: 2 },
          { tokenType: "TOK_THEN", lexeme: "then", line: 2 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 3 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 3 },
          {
            tokenType: "TOK_STRING",
            lexeme: '"x is positive"',
            line: 3
          },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 3 },
          { tokenType: "TOK_ELSE", lexeme: "else", line: 4 },
          { tokenType: "TOK_PRINTLN", lexeme: "println", line: 5 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 5 },
          {
            tokenType: "TOK_STRING",
            lexeme: '"x is negative"',
            line: 5
          },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 5 },
          { tokenType: "TOK_END", lexeme: "end", line: 6 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize x := 8.23 - -3.5", () => {
      const source = "x := 8.23 - -3.5";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "x := 8.23 - -3.5",
        current: 16,
        start: 16,
        line: 1,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 1 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 1 },
          { tokenType: "TOK_FLOAT", lexeme: "8.23", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_FLOAT", lexeme: "3.5", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize --This is a comment", () => {
      const source = "--This is a comment";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "--This is a comment",
        current: 20,
        start: 20,
        line: 1,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize \n--------\n-- This is a comment\n--------", () => {
      const source = "--------\n-- This is a comment\n--------";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "--------\n-- This is a comment\n--------",
        current: 39,
        start: 39,
        line: 3,
        tokens: []
      };
      expect(result).toBe(expected);
    });
    it("tokenize \n--------\n-- Comment\n--------\nx:=55.2", () => {
      const source = "\n--------\n-- Comment\n--------\nx:=55.2";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "\n--------\n-- Comment\n--------\nx:=55.2",
        current: 37,
        start: 37,
        line: 5,
        tokens: [
          { tokenType: "TOK_IDENTIFIER", lexeme: "x", line: 5 },
          { tokenType: "TOK_ASSIGN", lexeme: ":=", line: 5 },
          { tokenType: "TOK_FLOAT", lexeme: "55.2", line: 5 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 2 + 42 * 2 + (47 * -21)", () => {
      const source = "2 + 42 * 2 + (47 * -21)";
      const result = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const expected = {
        source: "2 + 42 * 2 + (47 * -21)",
        current: 23,
        start: 23,
        line: 1,
        tokens: [
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "42", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "2", line: 1 },
          { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
          { tokenType: "TOK_LPAREN", lexeme: "(", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "47", line: 1 },
          { tokenType: "TOK_STAR", lexeme: "*", line: 1 },
          { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
          { tokenType: "TOK_INTEGER", lexeme: "21", line: 1 },
          { tokenType: "TOK_RPAREN", lexeme: ")", line: 1 }
        ]
      };
      expect(result).toBe(expected);
    });
    it("tokenize 234$567", () => {
      const source = "234$567";
      try {
        tokenize({
          source,
          current: 0,
          start: 0,
          line: 1,
          tokens: []
        });
      } catch (error) {
        const expected = "Line 1. Error at 3: Unexpected character '$'.";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/lexer/peek.test.js
var peek_test_exports = {};
__export(peek_test_exports, {
  peek_test: () => peek_test
});
var peek_test = () => {
  describe("peek", () => {
    it("peek", () => {
      const array = [5];
      const peekIndex = 0;
      const result = peek(peekIndex, array);
      const expected = 5;
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/match.test.js
var match_test_exports = {};
__export(match_test_exports, {
  match_test: () => match_test
});
var match_test = () => {
  describe("match", () => {
    it("value match", () => {
      const array = [5, 6, 2, 9, 4, 1];
      const currentIndex = 1;
      const expectedValue = 6;
      const result = match(expectedValue, currentIndex, array);
      const expected = true;
      expect(result).toBe(expected);
    });
    it("value does not match", () => {
      const array = ["a", "k", "g", "r", "q"];
      const currentIndex = 2;
      const expectedValue = "q";
      const result = match(expectedValue, currentIndex, array);
      const expected = false;
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/lookahead.test.js
var lookahead_test_exports = {};
__export(lookahead_test_exports, {
  lookahead_test: () => lookahead_test
});
var lookahead_test = () => {
  describe("lookahead", () => {
    it("lookahead", () => {
      const array = [5, 7, 1, 2, 4];
      const currentIndex = 1;
      const plusCharsAhead = 2;
      const result = lookahead(currentIndex, plusCharsAhead, array);
      const expected = 2;
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/isLetter.test.js
var isLetter_test_exports = {};
__export(isLetter_test_exports, {
  isLetter_test: () => isLetter_test
});
var isLetter_test = () => {
  describe("is letter", () => {
    it("is letter true", () => {
      const char = "a";
      const result = isLetter(char);
      const expected = true;
      expect(result).toBe(expected);
    });
    it("is letter false", () => {
      const char = "%";
      const result = isLetter(char);
      const expected = false;
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/isCharInteger.test.js
var isCharInteger_test_exports = {};
__export(isCharInteger_test_exports, {
  isCharInteger_test: () => isCharInteger_test
});
var isCharInteger_test = () => {
  describe("is char integer", () => {
    it("is char integer true", () => {
      const index = 1;
      const array = ["5", "7", "1", "2", "4"];
      const result = isCharInteger(index, array);
      const expected = true;
      expect(result).toBe(expected);
    });
    it("is char integer false", () => {
      const index = 1;
      const array = ["5", "a", "1", "2", "4"];
      const result = isCharInteger(index, array);
      const expected = false;
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/createToken.test.js
var createToken_test_exports = {};
__export(createToken_test_exports, {
  createToken_test: () => createToken_test
});
var createToken_test = () => {
  describe("create token", () => {
    it("create token +", () => {
      const result = createToken({
        tokenType: TOKENS.TOK_PLUS,
        source: "+",
        lexemeStart: 0,
        cursor: 1,
        line: 1
      });
      const expected = { tokenType: "TOK_PLUS", lexeme: "+", line: 1 };
      expect(result).toBe(expected);
    });
  });
};

// tests/lexer/consumeString.test.js
var consumeString_test_exports = {};
__export(consumeString_test_exports, {
  consumeString_test: () => consumeString_test
});
var consumeString_test = () => {
  describe("consume string", () => {
    const line = 1;
    it('consume string ""', () => {
      const source = '""';
      const startQuote = '"';
      const cursor = 1;
      const result = consumeString(startQuote, cursor, line, source);
      const expected = 2;
      expect(result).toBe(expected);
    });
    it('consume string "a"', () => {
      const source = '"a"';
      const startQuote = '"';
      const cursor = 1;
      const result = consumeString(startQuote, cursor, line, source);
      const expected = 3;
      expect(result).toBe(expected);
    });
    it('consume string "abc"', () => {
      const source = '"abc"';
      const startQuote = '"';
      const cursor = 1;
      const result = consumeString(startQuote, cursor, line, source);
      const expected = 5;
      expect(result).toBe(expected);
    });
    it('consume string "a1b2c48"', () => {
      const source = '"a1b2c48"';
      const startQuote = '"';
      const cursor = 1;
      const result = consumeString(startQuote, cursor, line, source);
      const expected = 9;
      expect(result).toBe(expected);
    });
    it("consume string 'n99x7hg5'", () => {
      const source = "'n99x7hg5'";
      const startQuote = "'";
      const cursor = 1;
      const result = consumeString(startQuote, cursor, line, source);
      const expected = 10;
      expect(result).toBe(expected);
    });
    it("consume string 'Unterminated string", () => {
      const source = "'Unterminated string";
      const startQuote = "'";
      const cursor = 1;
      try {
        consumeString(startQuote, cursor, line, source);
      } catch (error) {
        expect(error.message).toBe("Line 1 Unterminated string.");
      }
    });
  });
};

// tests/lexer/consumeIdentifier.test.js
var consumeIdentifier_test_exports = {};
__export(consumeIdentifier_test_exports, {
  consumeIdentifier_test: () => consumeIdentifier_test
});
var consumeIdentifier_test = () => {
  describe("consume identifier", () => {
    it("consume identifier _", () => {
      const source = "_";
      const cursor = 0;
      const result = consumeIdentifier(cursor, source);
      const expected = 1;
      expect(result).toBe(expected);
    });
    it("consume identifier ___", () => {
      const source = "___";
      const cursor = 0;
      const result = consumeIdentifier(cursor, source);
      const expected = 3;
      expect(result).toBe(expected);
    });
    it("consume identifier _0", () => {
      const source = "_0";
      const cursor = 0;
      const result = consumeIdentifier(cursor, source);
      const expected = 2;
      expect(result).toBe(expected);
    });
    it("consume identifier _a", () => {
      const source = "_a";
      const cursor = 0;
      const result = consumeIdentifier(cursor, source);
      const expected = 2;
      expect(result).toBe(expected);
    });
    it("consume identifier _a1b2_c99", () => {
      const source = "_a1b2_c99";
      const cursor = 0;
      const result = consumeIdentifier(cursor, source);
      const expected = 9;
      expect(result).toBe(expected);
    });
    it("consume identifier g67_3fv", () => {
      const source = "g67_3fv";
      const cursor = 0;
      const result = consumeIdentifier(cursor, source);
      const expected = 7;
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/unaryOperatorTypeError.test.js
var unaryOperatorTypeError_test_exports = {};
__export(unaryOperatorTypeError_test_exports, {
  unary_operator_type_error_test: () => unary_operator_type_error_test
});
var unary_operator_type_error_test = () => {
  describe("binary operator type error", () => {
    it("binary operator type error", () => {
      try {
        const operator = "+";
        const operandType = TYPES.TYPE_STRING;
        const line = 1;
        unaryOperatorTypeError(operator, operandType, line);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '+' with TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
  });
};

// tests/interpreter/interpretStatements.test.js
var interpretStatements_test_exports = {};
__export(interpretStatements_test_exports, {
  interpret_statements_test: () => interpret_statements_test
});
var interpret_statements_test = () => {
  describe("interpret statements", () => {
  });
};

// tests/interpreter/interpretAST.test.js
var interpretAST_test_exports = {};
__export(interpretAST_test_exports, {
  interpret_AST_test: () => interpret_AST_test
});
var interpret_AST_test = () => {
  describe("interpret AST", () => {
  });
};

// tests/interpreter/interpret.test.js
var interpret_test_exports = {};
__export(interpret_test_exports, {
  interpret_test: () => interpret_test
});
var interpret_test = () => {
  describe("interpret", () => {
    it("interpret 10", () => {
      const value = 10;
      const line = 1;
      const node = new Integer(value, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 10 };
      expect(result).toBe(expected);
    });
    it("interpret 35.864", () => {
      const value = 35.864;
      const line = 1;
      const node = new Float(value, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 35.864 };
      expect(result).toBe(expected);
    });
    it("interpret 7.7", () => {
      const value = 7.7;
      const line = 1;
      const node = new Float(value, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 7.7 };
      expect(result).toBe(expected);
    });
    it("interpret false", () => {
      const value = false;
      const line = 1;
      const node = new Boolean(value, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret (229.118)", () => {
      const value = 229.118;
      const line = 1;
      const node = new Grouping(new Float(value, line), line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 229.118 };
      expect(result).toBe(expected);
    });
    it("interpret 2+2", () => {
      const line = 1;
      const plus = new Token(TOKENS.TOK_PLUS, "+", line);
      const left = new Integer(2, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(plus, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 4 };
      expect(result).toBe(expected);
    });
    it("interpret 2+3", () => {
      const line = 1;
      const plus = new Token(TOKENS.TOK_PLUS, "+", line);
      const left = new Integer(2, line);
      const right = new Integer(3, line);
      const node = new BinaryOperation(plus, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 5 };
      expect(result).toBe(expected);
    });
    it("interpret false+4", () => {
      const line = 1;
      const plus = new Token(TOKENS.TOK_PLUS, "+", line);
      const left = new Boolean(false, line);
      const right = new Integer(4, line);
      const node = new BinaryOperation(plus, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '+' between TYPE_BOOL and TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 27.872-5", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_MINUS, "-", line);
      const left = new Float(27.872, line);
      const right = new Integer(5, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 22.872 };
      expect(result).toBe(expected);
    });
    it("interpret 27.872-true", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_MINUS, "-", line);
      const left = new Float(27.872, line);
      const right = new Boolean(true, line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '-' between TYPE_NUMBER and TYPE_BOOL in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 27.872-abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_MINUS, "-", line);
      const left = new Float(27.872, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '-' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret abc-275.114", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_MINUS, "-", line);
      const left = new String_("abc", line);
      const right = new Float(275.114, line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '-' between TYPE_STRING and TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 5*3", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_STAR, "*", line);
      const left = new Integer(5, line);
      const right = new Integer(3, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 15 };
      expect(result).toBe(expected);
    });
    it("interpret 2*9", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_STAR, "*", line);
      const left = new Integer(2, line);
      const right = new Integer(9, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 18 };
      expect(result).toBe(expected);
    });
    it("interpret a*3", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_STAR, "*", line);
      const left = new String_("a", line);
      const right = new Integer(3, line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '*' between TYPE_STRING and TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 8/abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_SLASH, "/", line);
      const left = new Integer(8, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '/' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 8/4", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_SLASH, "/", line);
      const left = new Integer(8, line);
      const right = new Integer(4, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 2 };
      expect(result).toBe(expected);
    });
    it("interpret 9/2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_SLASH, "/", line);
      const left = new Integer(9, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 4.5 };
      expect(result).toBe(expected);
    });
    it("interpret 9/0", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_SLASH, "/", line);
      const left = new Integer(9, line);
      const right = new Integer(0, line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Division by zero in line 1";
        expect(result).toBe(expected);
      }
    });
    it("interpret abc%11", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_MOD, "%", line);
      const left = new String_("abc", line);
      const right = new Integer(11, line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '%' between TYPE_STRING and TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 8%4", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_MOD, "%", line);
      const left = new Integer(8, line);
      const right = new Integer(4, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 0 };
      expect(result).toBe(expected);
    });
    it("interpret 2^4", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_CARET, "^", line);
      const left = new Integer(2, line);
      const right = new Integer(4, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 16 };
      expect(result).toBe(expected);
    });
    it("interpret 2^false", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_CARET, "^", line);
      const left = new Integer(2, line);
      const right = new Boolean(false, line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '^' between TYPE_NUMBER and TYPE_BOOL in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret +8", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_PLUS, "+", line);
      const operand = new Integer(8, line);
      const node = new UnaryOperation(operator, operand, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: 8 };
      expect(result).toBe(expected);
    });
    it("interpret +abcd", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_PLUS, "+", line);
      const operand = new String_("abcd", line);
      const node = new UnaryOperation(operator, operand, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '+' with TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret -abcd", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_MINUS, "-", line);
      const operand = new String_("abcd", line);
      const node = new UnaryOperation(operator, operand, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '-' with TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret ~abcd", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_NOT, "~", line);
      const operand = new String_("abcd", line);
      const node = new UnaryOperation(operator, operand, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '~' with TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret ~118", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_NOT, "~", line);
      const operand = new Integer(118, line);
      const node = new UnaryOperation(operator, operand, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '~' with TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret ~true", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_NOT, "~", line);
      const operand = new Boolean(true, line);
      const node = new UnaryOperation(operator, operand, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret -10", () => {
      const line = 1;
      const operator = new Token(TOKENS.TOK_MINUS, "-", line);
      const operand = new Integer(10, line);
      const node = new UnaryOperation(operator, operand, line);
      const result = interpret(node);
      const expected = { type: "TYPE_NUMBER", value: -10 };
      expect(result).toBe(expected);
    });
    it("interpret 2+42*2+(47*-21)", () => {
      const source = "2+42*2+(47*-21)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: -901 };
      expect(result).toBe(expected);
    });
    it("interpret 2 * 9 + 13", () => {
      const source = "2 * 9 + 13";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 31 };
      expect(result).toBe(expected);
    });
    it("interpret 2 * 9 - -5", () => {
      const source = "2 * 9 - -5";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 23 };
      expect(result).toBe(expected);
    });
    it("interpret 2^3^3 - 1", () => {
      const source = "2^3^3 - 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 134217727 };
      expect(result).toBe(expected);
    });
    it("interpret (2^3^3-1) % 2", () => {
      const source = "(2^3^3-1) % 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 1 };
      expect(result).toBe(expected);
    });
    it("interpret 2 * (9 + 13) / 2", () => {
      const source = "2 * (9 + 13) / 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 22 };
      expect(result).toBe(expected);
    });
    it("interpret 2 * (9 + 13) + 2^2 + (((3 * 3) - 3) + 3.324) / 2.1", () => {
      const source = "2 * (9 + 13) + 2^2 + (((3 * 3) - 3) + 3.324) / 2.1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 52.44 };
      expect(result).toBe(expected);
    });
    it("interpret 24 / (12 / 2) / 2", () => {
      const source = "24 / (12 / 2) / 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 2 };
      expect(result).toBe(expected);
    });
    it('interpret 2+42*2+(47*-21) -- " cm"', () => {
      const source = '2+42*2+(47*-21) -- " cm"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: -901 };
      expect(result).toBe(expected);
    });
    it('interpret 2+42*2+(47*-21)+" cm"', () => {
      const source = '2+42*2+(47*-21)+" cm"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_STRING", value: "-901 cm" };
      expect(result).toBe(expected);
    });
    it('interpret 2+42*2+((47*-21)+" cm")', () => {
      const source = '2+42*2+((47*-21)+" cm")';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_STRING", value: "86-987 cm" };
      expect(result).toBe(expected);
    });
    it('interpret 10+" cm"', () => {
      const source = '10+" cm"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_STRING", value: "10 cm" };
      expect(result).toBe(expected);
    });
    it("interpret a+b", () => {
      const line = 1;
      const plus = new Token(TOKENS.TOK_PLUS, "+", line);
      const left = new String_("a", line);
      const right = new String_("b", line);
      const node = new BinaryOperation(plus, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_STRING", value: "ab" };
      expect(result).toBe(expected);
    });
    it('interpret 10+" cm"', () => {
      const line = 1;
      const plus = new Token(TOKENS.TOK_PLUS, "+", line);
      const left = new Integer(10, line);
      const right = new String_(" cm", line);
      const node = new BinaryOperation(plus, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_STRING", value: "10 cm" };
      expect(result).toBe(expected);
    });
    it("interpret 2>1", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_GT, ">", line);
      const left = new Integer(2, line);
      const right = new Integer(1, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 3>4.56", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_GT, ">", line);
      const left = new Integer(3, line);
      const right = new Float(4.56, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 2>abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_GT, ">", line);
      const left = new Integer(2, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '>' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 2>=1", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_GE, ">=", line);
      const left = new Integer(2, line);
      const right = new Integer(1, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 3>=4.56", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_GE, ">=", line);
      const left = new Integer(3, line);
      const right = new Float(4.56, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 2>=abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_GE, ">=", line);
      const left = new Integer(2, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '>=' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 1<2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LT, "<", line);
      const left = new Integer(1, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 3<4.56", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LT, "<", line);
      const left = new Integer(3, line);
      const right = new Float(4.56, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2<abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LT, "<", line);
      const left = new Integer(2, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '<' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 1<=2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LE, "<=", line);
      const left = new Integer(1, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2<=2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LE, "<=", line);
      const left = new Integer(2, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 30000<=4.56", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LE, "<=", line);
      const left = new Integer(3e4, line);
      const right = new Float(4.56, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 2<=abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_LE, "<=", line);
      const left = new Integer(2, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '<=' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 2==2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_EQEQ, "==", line);
      const left = new Integer(2, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 1==2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_EQEQ, "==", line);
      const left = new Integer(1, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 10==4.56", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_EQEQ, "==", line);
      const left = new Integer(10, line);
      const right = new Float(4.56, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 2==abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_EQEQ, "==", line);
      const left = new Integer(2, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '==' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 2~=2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_NE, "~=", line);
      const left = new Integer(2, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 1~=2", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_NE, "~=", line);
      const left = new Integer(1, line);
      const right = new Integer(2, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 10~=4.56", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_NE, "~=", line);
      const left = new Integer(10, line);
      const right = new Float(4.56, line);
      const node = new BinaryOperation(operation, left, right, line);
      const result = interpret(node);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2~=abc", () => {
      const line = 1;
      const operation = new Token(TOKENS.TOK_NE, "~=", line);
      const left = new Integer(2, line);
      const right = new String_("abc", line);
      const node = new BinaryOperation(operation, left, right, line);
      try {
        interpret(node);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '~=' between TYPE_NUMBER and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 2^3", () => {
      const source = "2^3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 8 };
      expect(result).toBe(expected);
    });
    it("interpret 2^3*2", () => {
      const source = "2^3*2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 16 };
      expect(result).toBe(expected);
    });
    it("interpret 2^3^2", () => {
      const source = "2^3^2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 512 };
      expect(result).toBe(expected);
    });
    it("interpret 4%3", () => {
      const source = "4%3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 1 };
      expect(result).toBe(expected);
    });
    it("interpret 7%2*3", () => {
      const source = "7%2*3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 3 };
      expect(result).toBe(expected);
    });
    it("interpret 7%2+3", () => {
      const source = "7%2+3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 4 };
      expect(result).toBe(expected);
    });
    it("interpret 4>3", () => {
      const source = "4>3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 4>=3.14", () => {
      const source = "4>=3.14";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 3.14>=3.14", () => {
      const source = "3.14>=3.14";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 3.14<=3.14", () => {
      const source = "3.14<=3.14";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 1+2<=3.14", () => {
      const source = "1+2<=3.14";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 1+2+0.14<=3.14", () => {
      const source = "1+2+0.14<=3.14";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 1+2+0.14+0.01<=3.14", () => {
      const source = "1+2+0.14+0.01<=3.14";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 3==3", () => {
      const source = "3==3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 3~=3", () => {
      const source = "3~=3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 1.1+1.9+2==5", () => {
      const source = "1.1+1.9+2==5";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2^3 == 2*2*2", () => {
      const source = "2^3 == 2*2*2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret (22 + 1) % 3", () => {
      const source = "(22 + 1) % 3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 2 };
      expect(result).toBe(expected);
    });
    it("interpret 4>=3", () => {
      const source = "4>=3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 4==2", () => {
      const source = "4==2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 4~=2", () => {
      const source = "4~=2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret ~(3 < 1 + -6)", () => {
      const source = "~(3 < 1 + -6)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true==true", () => {
      const source = "true==true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true~=false", () => {
      const source = "true~=false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret (2.5 > 0) == false", () => {
      const source = "(2.5 > 0) == false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 12^3>=0", () => {
      const source = "12^3>=0";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret (12*3)==35", () => {
      const source = "(12*3)==35";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret (3 == 2 + 1)", () => {
      const source = "(3 == 2 + 1)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret ~true==false", () => {
      const source = "~true==false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret ~(12 > 4) ~= false", () => {
      const source = "~(12 > 4) ~= false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret true and true", () => {
      const source = "true and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true and false", () => {
      const source = "true and false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret false and true", () => {
      const source = "false and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret false and false", () => {
      const source = "false and false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret false and 1", () => {
      const source = "false and 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret true and 1", () => {
      const source = "true and 10";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 10 };
      expect(result).toBe(expected);
    });
    it("interpret 0 and 1", () => {
      const source = "0 and 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_NUMBER", value: 0 };
      expect(result).toBe(expected);
    });
    it('interpret true and "abc"', () => {
      const source = 'true and "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      try {
        interpret(ast);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported usage of logical operator 'and' with right TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it('interpret false and "abc"', () => {
      const source = 'false and "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it('interpret "abc" and true', () => {
      const source = '"abc" and true';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      try {
        interpret(ast);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported usage of logical operator 'and' with left TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret true or true", () => {
      const source = "true or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true or false", () => {
      const source = "true or false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret false or true", () => {
      const source = "false or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret false or false", () => {
      const source = "false or false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret true or 1", () => {
      const source = "true or 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret false or 1", () => {
      const source = "false or 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      try {
        interpret(ast);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported usage of logical operator 'or' with right TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret 0 or 1", () => {
      const source = "0 or 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      try {
        interpret(ast);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported usage of logical operator 'or' with left TYPE_NUMBER in line 1.";
        expect(result).toBe(expected);
      }
    });
    it('interpret false or "abc"', () => {
      const source = 'false or "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      try {
        interpret(ast);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported usage of logical operator 'or' with right TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
    it("interpret true and true and true", () => {
      const source = "true and true and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true and true and false", () => {
      const source = "true and true and false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret true and true or true", () => {
      const source = "true and true or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true or true or true", () => {
      const source = "true or true or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true and true or false", () => {
      const source = "true and true or false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret true and false or true", () => {
      const source = "true and false or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret false and true or true", () => {
      const source = "false and true or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret false and true or false", () => {
      const source = "false and true or false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret false and false or true", () => {
      const source = "false and false or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret false and true or ~false", () => {
      const source = "false and true or ~false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret ~(false and true or false)", () => {
      const source = "~(false and true or false)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2 > 1 and 5 > 4", () => {
      const source = "2 > 1 and 5 > 4";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2 == 3 and 5 > 4", () => {
      const source = "2 == 3 and 5 > 4";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret 2 > 1 or 5 > 4", () => {
      const source = "2 > 1 or 5 > 4";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret 2 > 1 and 4 > 6 or 7 + 3 >= 6 and 5 == 2", () => {
      const source = "2 > 1 and 4 > 6 or 7 + 3 >= 6 and 5 == 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret (44 >= 2) or false and 1 > 0", () => {
      const source = "(44 >= 2) or false and 1 > 0";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: true };
      expect(result).toBe(expected);
    });
    it("interpret ~(44 >= 2)", () => {
      const source = "~(44 >= 2)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
    it("interpret ~(3 ~= 2)", () => {
      const source = "~(3 ~= 2)";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parse(current, tokens.tokens);
      const ast = parsed.node;
      const result = interpret(ast);
      const expected = { type: "TYPE_BOOL", value: false };
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/binaryOperatorTypeError.test.js
var binaryOperatorTypeError_test_exports = {};
__export(binaryOperatorTypeError_test_exports, {
  binary_operator_type_error_test: () => binary_operator_type_error_test
});
var binary_operator_type_error_test = () => {
  describe("binary operator type error", () => {
    it("binary operator type error", () => {
      try {
        const operator = "+";
        const leftType = TYPES.TYPE_BOOL;
        const rightType = TYPES.TYPE_STRING;
        const line = 1;
        binaryOperatorTypeError(operator, leftType, rightType, line);
      } catch (error) {
        const result = error.message;
        const expected = "Unsupported operator '+' between TYPE_BOOL and TYPE_STRING in line 1.";
        expect(result).toBe(expected);
      }
    });
  });
};

// tests/compiler/makeLabel.test.js
var makeLabel_test_exports = {};
__export(makeLabel_test_exports, {
  make_label_test: () => make_label_test
});
var make_label_test = () => {
  describe("make label", () => {
    it("make label", () => {
      const compiler = new Compiler();
      const result = makeLabel(compiler, "LBL");
      const expected = "LBL1";
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/getSymbol.test.js
var getSymbol_test_exports = {};
__export(getSymbol_test_exports, {
  get_symbol_test: () => get_symbol_test
});
var get_symbol_test = () => {
  describe("get symbol", () => {
    it("get symbol a", () => {
      const name = "a";
      const a = new Symbol2(name);
      const compiler = new Compiler();
      addSymbol(compiler, a);
      const result = getSymbol(compiler, name);
      const expected = {
        symbol: {
          name: "a",
          depth: 0,
          symbolType: "SYM_VAR",
          arity: 0
        },
        index: 0
      };
      expect(result).toBe(expected);
    });
    it("get unexisting symbol b", () => {
      const name = "a";
      const a = new Symbol2(name);
      const compiler = new Compiler();
      addSymbol(compiler, a);
      const result = getSymbol(compiler, "b");
      const expected = void 0;
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/getFunctionSymbol.test.js
var getFunctionSymbol_test_exports = {};
__export(getFunctionSymbol_test_exports, {
  get_function_symbol_test: () => get_function_symbol_test
});
var get_function_symbol_test = () => {
  describe("get function symbol", () => {
    it("get function symbol add", () => {
      const name = "add";
      const add = new Symbol2(name, 0, SYMBOL_TYPES.FUNCTION);
      const compiler = new Compiler();
      addFunctionSymbol(compiler, add);
      const result = getFunctionSymbol(compiler, name);
      const expected = {
        name: "add",
        depth: 0,
        symbolType: "SYM_FUNC",
        arity: 0
      };
      expect(result).toBe(expected);
    });
    it("get unexisting function symbol b", () => {
      const compiler = new Compiler();
      const result = getFunctionSymbol(compiler, "b");
      const expected = void 0;
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/generateCode.test.js
var generateCode_test_exports = {};
__export(generateCode_test_exports, {
  generate_code_test: () => generate_code_test
});
var generate_code_test = () => {
  describe("generate code", () => {
    it("generate code for print 2", () => {
      const source = "print 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 100", () => {
      const source = "println 100";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 100 }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 28.16", () => {
      const source = "println 28.16";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 28.16 }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 28.16 + 99", () => {
      const source = "println 28.16 + 99";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 28.16 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 99 }
        },
        { command: "ADD" },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 132 - 0.96", () => {
      const source = "println 132 - 0.96";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 132 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0.96 }
        },
        { command: "SUB" },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 2 + 3 - 1", () => {
      const source = "print 2 + 3 - 1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "SUB" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print true", () => {
      const source = "print true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print false", () => {
      const source = "print false";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: false }
        },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 55 * 89.047", () => {
      const source = "print 55 * 89.047";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 55 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 89.047 }
        },
        { command: "MUL" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 101 / 76.99", () => {
      const source = "print 101 / 76.99";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 101 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 76.99 }
        },
        { command: "DIV" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 ^ 2", () => {
      const source = "print 3 ^ 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "EXP" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 % 2", () => {
      const source = "print 3 % 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "MOD" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 < 2", () => {
      const source = "print 3 < 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "LT" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 > 2", () => {
      const source = "print 3 > 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "GT" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 <= 2", () => {
      const source = "print 3 <= 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "LE" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 >= 2", () => {
      const source = "print 3 >= 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "GE" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 == 2", () => {
      const source = "print 3 == 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "EQ" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print 3 ~= 2", () => {
      const source = "print 3 ~= 2";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "NE" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it('generate code for print "abc"', () => {
      const source = 'print "abc"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "abc" }
        },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it('generate code for print "abc" + "defgh"', () => {
      const source = 'print "abc" + "defgh"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "abc" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "defgh" }
        },
        { command: "ADD" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 2 + 3 * 4.45 - 2.8 - 1 println true", () => {
      const source = "println 2 + 3 * 4.45 - 2.8 - 1 \n println true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 4.45 }
        },
        { command: "MUL" },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2.8 }
        },
        { command: "SUB" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "SUB" },
        { command: "PRINTLN" },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print -1", () => {
      const source = "print -1";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "NEG" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print ~true", () => {
      const source = "print ~true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "XOR" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print true and true", () => {
      const source = "print true and true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "AND" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for print false or true", () => {
      const source = "print false or true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: false }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "OR" },
        { command: "PRINT" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 3 + 5 - 6 * 2 println ~true", () => {
      const source = "println 3 + 5 - 6 * 2 \n println ~true";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 5 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 6 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "MUL" },
        { command: "SUB" },
        { command: "PRINTLN" },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_BOOL", value: true }
        },
        { command: "XOR" },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for println 3 + 5 - 6 * 2 - -3", () => {
      const source = "println 3 + 5 - 6 * 2 - -3";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 5 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 6 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "MUL" },
        { command: "SUB" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        { command: "NEG" },
        { command: "SUB" },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for if else statements if 3 >=0", () => {
      const source = 'if 3 >=0 then\nprintln "Entered the consequence block."\nelse\nprintln "Entered the alternative block."\nend\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        { command: "GE" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: {
            type: "TYPE_STRING",
            value: "Entered the consequence block."
          }
        },
        { command: "PRINTLN" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "PUSH",
          argument: {
            type: "TYPE_STRING",
            value: "Entered the alternative block."
          }
        },
        { command: "PRINTLN" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Goodbye!" }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for global variables", () => {
      const source = "x := 100\ny := 200\nz := 300\nprintln (x)\nprintln (y)\nprintln (z)\na := x + 1\nprintln (a)\n";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 100 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 200 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 1 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 300 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 2 }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 1 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 2 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "ADD" },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 3 }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 3 }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for local variables 0", () => {
      const source = "x := 100\ny := 200\nif x > 0 then\na := 10\nb := 20\nif x > 1 then\nc := 3\nif x > 2 then\nd := 2 + 3 + 4\nprintln(d)\nelse\ne := 1 + 2 - 4 + (3 - 2)\nend\nend\nend\n";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 100 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 200 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 1 }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        { command: "GT" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 10 }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (a)" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 20 }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "1 (b)" }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "GT" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL5" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL4" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "2 (c)" }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "GT" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL8" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL7" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 4 }
        },
        { command: "ADD" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "3 (d)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 3 }
        },
        { command: "PRINTLN" },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL9" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL8" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 4 }
        },
        { command: "SUB" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "SUB" },
        { command: "ADD" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "3 (e)" }
        },
        { command: "POP" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL9" }
        },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL6" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL5" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL6" }
        },
        { command: "POP" },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for local variables 1", () => {
      const source = "x := 100\ny := 200\nif x > 0 then\na := 10\nb := 20\nif x > 1 then\nc := 3\na := c + 2\nprintln(a)\nprintln(c)\nif x > 2 then\nd := 2 + b + a\nprintln(d)\nelse\nc := 0\ne := 1 + c - 4 + (a - 2)\nend\nend\nend\n";
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 100 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 200 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 1 }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        { command: "GT" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 10 }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (a)" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 20 }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "1 (b)" }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "GT" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL5" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL4" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "2 (c)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "ADD" },
        {
          command: "STORE_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "GT" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL8" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL7" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 1 }
        },
        { command: "ADD" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        { command: "ADD" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "3 (d)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 3 }
        },
        { command: "PRINTLN" },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL9" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL8" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        {
          command: "STORE_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 4 }
        },
        { command: "SUB" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "SUB" },
        { command: "ADD" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "3 (e)" }
        },
        { command: "POP" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL9" }
        },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL6" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL5" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL6" }
        },
        { command: "POP" },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for a while loop", () => {
      const source = 'i := 1\nwhile i <= 10 do\nres := 2 * i\nprintln("2*" + i + " = " + res)\ni := i + 1\nend\n';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 10 }
        },
        { command: "LE" },
        {
          command: "JMPZ",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        { command: "MUL" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (res)" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "2*" }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: " = " }
        },
        { command: "ADD" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        { command: "ADD" },
        { command: "PRINTLN" },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        { command: "ADD" },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        { command: "POP" },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for a procedure 0", () => {
      const source = 'x := 0\nfunc say()\nprintln "Hello!"\nend\nsay()';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "say" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Hello!" }
        },
        { command: "PRINTLN" },
        { command: "RTS" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        {
          command: "JSR",
          argument: { type: "TYPE_LABEL", value: "say" }
        },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for a procedure 1", () => {
      const source = 'x := 0\nfunc say()\nprintln "Hello1!"\nprintln "Hello2!"\nprintln "Hello3!"\nend\nsay()\nprintln "After the call"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "say" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Hello1!" }
        },
        { command: "PRINTLN" },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Hello2!" }
        },
        { command: "PRINTLN" },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Hello3!" }
        },
        { command: "PRINTLN" },
        { command: "RTS" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 0 }
        },
        {
          command: "JSR",
          argument: { type: "TYPE_LABEL", value: "say" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "After the call" }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("generate code for a procedure with arguments 0", () => {
      const source = 'x := 5\nfunc say(a, b, c)\nprintln a\nprintln b\nprintln c\nend\nsay("a", "b", 1 + 2 + x)\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 5 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "say" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (a)" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "1 (b)" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "2 (c)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 1 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        { command: "PRINTLN" },
        { command: "POP" },
        { command: "POP" },
        { command: "POP" },
        { command: "RTS" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "a" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "b" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "ADD" },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "JSR",
          argument: { type: "TYPE_LABEL", value: "say" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Goodbye!" }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      expect(result).toBe(expected);
    });
    it("fail to call a procedure with 2 arguments instead of 3", () => {
      const source = 'x := 5\nfunc say(a, b, c)\nprintln a\nprintln b\nprintln c\nend\nsay("a", "b")\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      try {
        const result = generateCode(compiler, ast);
      } catch (error) {
        const result = error.message;
        const expected = "Function say was expecting 3 arguments but 2 arguments were passed in line 7.";
        expect(result).toBe(expected);
      }
    });
    it("fail to call a undeclared procedure", () => {
      const source = 'x := 5\nfunc say(a, b, c)\nprintln a\nprintln b\nprintln c\nend\nsay1("a", "b")\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      try {
        const result = generateCode(compiler, ast);
      } catch (error) {
        const result = error.message;
        const expected = "Function declaration with the name say1 was not found in line 7.";
        expect(result).toBe(expected);
      }
    });
    it("generate code for 3 procedures with arguments", () => {
      const source = 'x := 5\nfunc func_3(x, y)\n  result := x * y\n  println result\nend\nfunc func_2(x, y)\n  result := x + y\n  func_3(7, 9 + y)\n  println result\nend\nfunc func_1(a, b, c)\n  println a\n  println b\n  func_2(2, 3)\n  println c\nend\nfunc_1(1 + 2, 2 + 3, 3 + x)\nprintln "Goodbye!"';
      const tokens = tokenize({
        source,
        current: 0,
        start: 0,
        line: 1,
        tokens: []
      });
      const current = 0;
      const parsed = parseStatements(current, tokens.tokens);
      const ast = parsed.node;
      const compiler = new Compiler();
      const result = generateCode(compiler, ast);
      const expected = [
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "START" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 5 }
        },
        {
          command: "STORE_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "func_3" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (x)" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "1 (y)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 1 }
        },
        { command: "MUL" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "2 (result)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        { command: "PRINTLN" },
        { command: "POP" },
        { command: "POP" },
        { command: "POP" },
        { command: "RTS" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL1" }
        },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "func_2" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (x)" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "1 (y)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 1 }
        },
        { command: "ADD" },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "2 (result)" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 7 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 9 }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 1 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "JSR",
          argument: { type: "TYPE_LABEL", value: "func_3" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        { command: "PRINTLN" },
        { command: "POP" },
        { command: "POP" },
        { command: "POP" },
        { command: "RTS" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL2" }
        },
        {
          command: "JMP",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "func_1" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "0 (a)" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "1 (b)" }
        },
        {
          command: "SET_SLOT",
          argument: { type: "TYPE_STACK_SLOT", value: "2 (c)" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 0 }
        },
        { command: "PRINTLN" },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 1 }
        },
        { command: "PRINTLN" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "JSR",
          argument: { type: "TYPE_LABEL", value: "func_2" }
        },
        {
          command: "LOAD_LOCAL",
          argument: { type: "TYPE_STACK_SLOT", value: 2 }
        },
        { command: "PRINTLN" },
        { command: "POP" },
        { command: "POP" },
        { command: "POP" },
        { command: "RTS" },
        {
          command: "LABEL",
          argument: { type: "TYPE_LABEL", value: "LBL3" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 1 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 2 }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "LOAD_GLOBAL",
          argument: { type: "TYPE_SYMBOL", value: 0 }
        },
        { command: "ADD" },
        {
          command: "PUSH",
          argument: { type: "TYPE_NUMBER", value: 3 }
        },
        {
          command: "JSR",
          argument: { type: "TYPE_LABEL", value: "func_1" }
        },
        {
          command: "PUSH",
          argument: { type: "TYPE_STRING", value: "Goodbye!" }
        },
        { command: "PRINTLN" },
        { command: "HALT" }
      ];
      prettifyVMCode(console.log, result);
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/endBlock.test.js
var endBlock_test_exports = {};
__export(endBlock_test_exports, {
  end_block_test: () => end_block_test
});
var end_block_test = () => {
  describe("end block", () => {
    it("end block decrement scope 1 time from 0 depth scope", () => {
      let compiler = new Compiler();
      try {
        endBlock(compiler);
      } catch (error) {
        const result = error.message;
        const expected = "Scope depth cannot be decreased to less than 0.";
        expect(result).toBe(expected);
      }
    });
    it("begin block decrement scope 1 time", () => {
      let compiler = new Compiler();
      beginBlock(compiler);
      const result = endBlock(compiler).scopeDepth;
      const expected = 0;
      expect(result).toBe(expected);
    });
    it("begin block decrement scope 3 times", () => {
      let compiler = new Compiler();
      beginBlock(compiler);
      beginBlock(compiler);
      beginBlock(compiler);
      endBlock(compiler);
      endBlock(compiler);
      const result = endBlock(compiler).scopeDepth;
      const expected = 0;
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/emit.test.js
var emit_test_exports = {};
__export(emit_test_exports, {
  emit_test: () => emit_test
});
var emit_test = () => {
  describe("emit", () => {
    it("emit", () => {
      let compiler = new Compiler();
      const line = 1;
      const instruction = {
        command: "PUSH",
        argument: {
          type: "TYPE_NUMBER",
          value: parseFloat(27.872)
        }
      };
      const result = emit(compiler, instruction);
      const expected = {
        code: [
          {
            command: "PUSH",
            argument: { type: "TYPE_NUMBER", value: 27.872 }
          }
        ],
        locals: [],
        globals: [],
        functions: [],
        scopeDepth: 0,
        labelCounter: 0
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/compile.test.js
var compile_test_exports = {};
__export(compile_test_exports, {
  compile_test: () => compile_test
});
var compile_test = () => {
  describe("compile", () => {
  });
};

// tests/compiler/beginBlock.test.js
var beginBlock_test_exports = {};
__export(beginBlock_test_exports, {
  begin_block_test: () => begin_block_test
});
var begin_block_test = () => {
  describe("begin block", () => {
    it("begin block increment scope 1 time", () => {
      let compiler = new Compiler();
      const result = beginBlock(compiler).scopeDepth;
      const expected = 1;
      expect(result).toBe(expected);
    });
    it("begin block increment scope 3 times", () => {
      let compiler = new Compiler();
      beginBlock(compiler);
      beginBlock(compiler);
      const result = beginBlock(compiler).scopeDepth;
      const expected = 3;
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/addSymbol.test.js
var addSymbol_test_exports = {};
__export(addSymbol_test_exports, {
  add_symbol_test: () => add_symbol_test
});
var add_symbol_test = () => {
  describe("add symbol", () => {
    it("add symbol", () => {
      const a = new Symbol2("a");
      const compiler = new Compiler();
      const result = addSymbol(compiler, a).globals;
      const expected = [
        { name: "a", depth: 0, symbolType: "SYM_VAR", arity: 0 }
      ];
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/addLocalSymbol.test.js
var addLocalSymbol_test_exports = {};
__export(addLocalSymbol_test_exports, {
  add_local_symbol_test: () => add_local_symbol_test
});
var add_local_symbol_test = () => {
  describe("add local symbol", () => {
    it("add local symbol", () => {
      const a = new Symbol2("a");
      const compiler = new Compiler();
      const result = addLocalSymbol(compiler, a).locals;
      const expected = [
        { name: "a", depth: 0, symbolType: "SYM_VAR", arity: 0 }
      ];
      expect(result).toBe(expected);
    });
  });
};

// tests/compiler/addFunctionSymbol.test.js
var addFunctionSymbol_test_exports = {};
__export(addFunctionSymbol_test_exports, {
  add_function_symbol_test: () => add_function_symbol_test
});
var add_function_symbol_test = () => {
  describe("add function symbol", () => {
    it("add function symbol", () => {
      const add = new Symbol2("add", 0, SYMBOL_TYPES.FUNCTION);
      const compiler = new Compiler();
      const result = addFunctionSymbol(compiler, add).functions;
      const expected = [
        { name: "add", depth: 0, symbolType: "SYM_FUNC", arity: 0 }
      ];
      expect(result).toBe(expected);
    });
  });
};

// tests/virtualMachine/setup/createTestVMOptions.test.js
var createTestVMOptions_test_exports = {};
__export(createTestVMOptions_test_exports, {
  create_test_vm_options_test: () => create_test_vm_options_test
});
var create_test_vm_options_test = () => {
  describe("create test vm options", () => {
  });
};

// tests/virtualMachine/classes/VirtualMachine.test.js
var VirtualMachine_test_exports = {};
__export(VirtualMachine_test_exports, {
  VirtualMachine_test: () => VirtualMachine_test
});
var VirtualMachine_test = () => {
  describe("virtual machine", () => {
    it("create new VirtualMachine class", () => {
      const result = new VirtualMachine();
      const expected = {
        stack: [],
        frames: [],
        labels: {},
        globals: {},
        programCounter: 0,
        stackPointer: 0,
        isRunning: false
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/virtualMachine/classes/Frame.test.js
var Frame_test_exports = {};
__export(Frame_test_exports, {
  Frame_test: () => Frame_test
});
var Frame_test = () => {
  describe("frame", () => {
    it("create new Frame class", () => {
      const result = new Frame("functionName", 100, 1);
      const expected = {
        name: "functionName",
        returnProgramCounter: 100,
        framePointer: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/pinkyPrograms/maxFactorial/maxFactorial.test.js
var maxFactorial_test_exports = {};
__export(maxFactorial_test_exports, {
  max_factorial_test: () => max_factorial_test
});
var max_factorial_test = () => {
  describe("max factorial", () => {
  });
};

// tests/pinkyPrograms/mandelbrot/mandelbrot.test.js
var mandelbrot_test_exports = {};
__export(mandelbrot_test_exports, {
  mandelbrot_test: () => mandelbrot_test
});
var mandelbrot_test = () => {
  describe("mandelbrot", () => {
  });
};

// tests/pinkyPrograms/localVariablesShadowing/localVariablesShadowing.test.js
var localVariablesShadowing_test_exports = {};
__export(localVariablesShadowing_test_exports, {
  local_variables_shadowing_test: () => local_variables_shadowing_test
});
var local_variables_shadowing_test = () => {
};

// tests/pinkyPrograms/fizzBuzz/fizzBuzz.test.js
var fizzBuzz_test_exports = {};
__export(fizzBuzz_test_exports, {
  max_factorial_test: () => max_factorial_test2
});
var max_factorial_test2 = () => {
  describe("max factorial", () => {
  });
};

// tests/pinkyPrograms/dragonCurveOptimized/dragonCurveOptimized.test.js
var dragonCurveOptimized_test_exports = {};
__export(dragonCurveOptimized_test_exports, {
  dragon_curve_optimized_test: () => dragon_curve_optimized_test
});
var dragon_curve_optimized_test = () => {
  describe("dragon curve optimized", () => {
  });
};

// tests/pinkyPrograms/dragonCurve/dragonCurve.test.js
var dragonCurve_test_exports = {};
__export(dragonCurve_test_exports, {
  dragon_curve_test: () => dragon_curve_test
});
var dragon_curve_test = () => {
  describe("dragon curve", () => {
  });
};

// tests/parser/utils/matchTokenType.test.js
var matchTokenType_test_exports = {};
__export(matchTokenType_test_exports, {
  matchTokenType_test: () => matchTokenType_test
});
var matchTokenType_test = () => {
  describe("match token type", () => {
    it("match token type", () => {
      const tokenType = TOKENS.TOK_PLUS;
      const expectedType = TOKENS.TOK_PLUS;
      const result = matchTokenType(tokenType, expectedType);
      const expected = true;
      expect(result).toBe(expected);
    });
    it("don`t match token type", () => {
      const tokenType = TOKENS.TOK_PLUS;
      const expectedType = TOKENS.TOK_MINUS;
      const result = matchTokenType(tokenType, expectedType);
      const expected = false;
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/utils/expectToken.test.js
var expectToken_test_exports = {};
__export(expectToken_test_exports, {
  expect_token_test: () => expect_token_test
});
var expect_token_test = () => {
  describe("expect token", () => {
    it("expected token match", () => {
      const tokenType = TOKENS.TOK_PLUS;
      const expectedType = TOKENS.TOK_PLUS;
      const lineNumber = 1;
      const result = expectToken(tokenType, expectedType, lineNumber);
      const expected = true;
      expect(result).toBe(expected);
    });
    it("expected token don`t match", () => {
      const tokenType = TOKENS.TOK_PLUS;
      const expectedType = TOKENS.TOK_MINUS;
      const lineNumber = 1;
      try {
        expectToken(tokenType, expectedType, lineNumber);
      } catch (error) {
        const expected = "Line 1 expected TOK_MINUS, found TOK_PLUS";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/parser/statement/WhileStatement.test.js
var WhileStatement_test_exports = {};
__export(WhileStatement_test_exports, {
  WhileStatement_test: () => WhileStatement_test
});
var WhileStatement_test = () => {
  describe("while statement", () => {
    it("create new WhileStatement class true println 10", () => {
      const line = 1;
      const test = new Boolean(true, line);
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Integer(10, 1), line)],
        line
      );
      const result = new WhileStatement(test, bodyStatements, line);
      const expected = {
        test: { value: true, line: 1 },
        bodyStatements: {
          statements: [{ value: { value: 10, line: 1 }, line: 1 }],
          line: 1
        },
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/statement/Parameter.test.js
var Parameter_test_exports = {};
__export(Parameter_test_exports, {
  Parameter_test: () => Parameter_test
});
var Parameter_test = () => {
  describe("parameter statement", () => {
    it('create new Parameter class from "a"', () => {
      const line = 1;
      const result = new Parameter("a", line);
      const expected = { name: "a", line: 1 };
      expect(result).toBe(expected);
    });
    it("fail to create new Parameter class from 1", () => {
      const line = 1;
      let result = void 0;
      try {
        result = new Parameter(1, line);
      } catch (error) {
        const expected = "Constructor parameter 'name' of a Parameter class instance with a value of 1 of the Number type is not of the expected string type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
  });
};

// tests/parser/statement/IfStatement.test.js
var IfStatement_test_exports = {};
__export(IfStatement_test_exports, {
  IfStatement_test: () => IfStatement_test
});
var IfStatement_test = () => {
  describe("if statement", () => {
    it("create new IfStatement class true 10 5", () => {
      const line = 1;
      const test = new Boolean(true, line);
      const thenStatements = new Statements(
        [new PrintLineStatement(new Integer(10, 1), line)],
        line
      );
      const elseStatements = new Statements(
        [new PrintLineStatement(new Integer(5, 1), line)],
        line
      );
      const result = new IfStatement(
        test,
        thenStatements,
        elseStatements,
        line
      );
      const expected = {
        test: { value: true, line: 1 },
        thenStatements: {
          statements: [{ value: { value: 10, line: 1 }, line: 1 }],
          line: 1
        },
        elseStatements: {
          statements: [{ value: { value: 5, line: 1 }, line: 1 }],
          line: 1
        },
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/statement/FunctionDeclaration.test.js
var FunctionDeclaration_test_exports = {};
__export(FunctionDeclaration_test_exports, {
  FunctionDecalration_test: () => FunctionDecalration_test
});
var FunctionDecalration_test = () => {
  describe("function declaration", () => {
    it("create new FunctionDecalration class with a single parameter and a body statement", () => {
      const line = 1;
      const name = "custom_print";
      const parameters2 = [new Parameter("x", 1)];
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      const result = new FunctionDeclaration(
        name,
        parameters2,
        bodyStatements,
        line
      );
      const expected = {
        name: "custom_print",
        parameters: [{ name: "x", line: 1 }],
        bodyStatements: {
          statements: [{ value: { name: "x", line: 1 }, line: 1 }],
          line: 1
        },
        line: 1
      };
      expect(result).toBe(expected);
    });
    it("create new FunctionDecalration class with two parameters and a body statement", () => {
      const line = 1;
      const name = "custom_print";
      const parameters2 = [new Parameter("x", 1), new Parameter("y", 1)];
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      const result = new FunctionDeclaration(
        name,
        parameters2,
        bodyStatements,
        line
      );
      const expected = {
        name: "custom_print",
        parameters: [
          { name: "x", line: 1 },
          { name: "y", line: 1 }
        ],
        bodyStatements: {
          statements: [{ value: { name: "x", line: 1 }, line: 1 }],
          line: 1
        },
        line: 1
      };
      expect(result).toBe(expected);
    });
    it("fail to create new FunctionDecalration class with an undefined name", () => {
      const line = 1;
      let result = void 0;
      const name = void 0;
      const parameters2 = [new Parameter("x", 1)];
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      try {
        result = new FunctionDeclaration(
          name,
          parameters2,
          bodyStatements,
          line
        );
      } catch (error) {
        const expected = "Constructor parameter 'name' of a FunctionDeclaration class instance with a value of undefined of the undefined type is not of the expected string type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new FunctionDecalration class with a parameters not being an Array type", () => {
      const line = 1;
      let result = void 0;
      const name = "custom_print";
      const parameters2 = void 0;
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      try {
        result = new FunctionDeclaration(
          name,
          parameters2,
          bodyStatements,
          line
        );
      } catch (error) {
        const expected = "Constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of undefined of the undefined type is not of the expected Array type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new FunctionDecalration class with a parameter not being a Parameter type", () => {
      const line = 1;
      let result = void 0;
      const name = "custom_print";
      const parameters2 = [void 0];
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      try {
        result = new FunctionDeclaration(
          name,
          parameters2,
          bodyStatements,
          line
        );
      } catch (error) {
        const expected = "The value of the constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of undefined of the undefined type is not of the expected Parameter type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("create new FunctionDecalration class with undefined body statements", () => {
      const line = 1;
      const name = "custom_print";
      const parameters2 = [new Parameter("x", 1)];
      const bodyStatements = void 0;
      const result = new FunctionDeclaration(
        name,
        parameters2,
        bodyStatements,
        line
      );
      const expected = {
        name: "custom_print",
        parameters: [{ name: "x", line: 1 }],
        bodyStatements: void 0,
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/statement/ForStatement.test.js
var ForStatement_test_exports = {};
__export(ForStatement_test_exports, {
  ForStatement_test: () => ForStatement_test
});
var ForStatement_test = () => {
  describe("for statement", () => {
    it("fail to create new ForStatement class with a Boolean identifier", () => {
      const line = 1;
      const identifier = new Boolean(true, line);
      let result = void 0;
      try {
        result = new ForStatement(identifier);
      } catch (error) {
        const expected = `Constructor parameter 'identifier' with a value of {"value":true,"line":1} of the Boolean type in for statement is not of expected Identifier type.`;
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with an undefined identifier", () => {
      const line = 1;
      const identifier = void 0;
      let result = void 0;
      try {
        result = new ForStatement(identifier);
      } catch (error) {
        const expected = "Constructor parameter 'identifier' with a value of undefined of the undefined type in for statement is not of expected Identifier type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with a null identifier", () => {
      const line = 1;
      const identifier = null;
      let result = void 0;
      try {
        result = new ForStatement(identifier);
      } catch (error) {
        const expected = "Constructor parameter 'identifier' with a value of null of the undefined type in for statement is not of expected Identifier type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with identifier with value of 1", () => {
      const line = 1;
      const identifier = 1;
      let result = void 0;
      try {
        result = new ForStatement(identifier);
      } catch (error) {
        const expected = "Constructor parameter 'identifier' with a value of 1 of the Number type in for statement is not of expected Identifier type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with a start parameter not being an Expression object", () => {
      const line = 1;
      const identifier = new Identifier("x", line);
      const start = 1;
      let result = void 0;
      try {
        result = new ForStatement(identifier, start);
      } catch (error) {
        const expected = "Constructor parameter 'start' with a value of 1 of the Number type in for statement is not of expected Expression type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with an end parameter not being an Expression object", () => {
      const line = 1;
      const identifier = new Identifier("x", line);
      const start = new Integer(0, line);
      const end = 10;
      let result = void 0;
      try {
        result = new ForStatement(identifier, start, end);
      } catch (error) {
        const expected = "Constructor parameter 'end' with a value of 10 of the Number type in for statement is not of expected Expression type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with a step parameter not being an Expression object", () => {
      const line = 1;
      const identifier = new Identifier("x", line);
      const start = new Integer(0, line);
      const end = new Integer(10, line);
      const step = 1;
      let result = void 0;
      try {
        result = new ForStatement(identifier, start, end, step);
      } catch (error) {
        const expected = "Constructor parameter 'step' with a value of 1 of the Number type in for statement is not of expected undefined or Expression type.";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with a bodyStatements parameter not being a Statements object", () => {
      const line = 1;
      const identifier = new Identifier("x", line);
      const start = new Integer(0, line);
      const end = new Integer(10, line);
      const step = new Integer(2, line);
      const bodyStatements = 1;
      let result = void 0;
      try {
        result = new ForStatement(
          identifier,
          start,
          end,
          step,
          bodyStatements
        );
      } catch (error) {
        const expected = "Constructor parameter 'bodyStatements' with a value of 1 of the Number type in for statement is not of expected Statements type";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("fail to create new ForStatement class with a line parameter being a string", () => {
      const line = 1;
      const identifier = new Identifier("x", line);
      const start = new Integer(0, line);
      const end = new Integer(10, line);
      const step = new Integer(2, line);
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      const forLine = "1";
      let result = void 0;
      try {
        result = new ForStatement(
          identifier,
          start,
          end,
          step,
          bodyStatements,
          forLine
        );
      } catch (error) {
        const expected = `Constructor parameter 'line' with a value of "1" in for statement is not of expected Number type`;
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
    it("create new ForStatement class", () => {
      const line = 1;
      const identifier = new Identifier("x", line);
      const start = new Integer(0, line);
      const end = new Integer(10, line);
      const step = new Integer(2, line);
      const bodyStatements = new Statements(
        [new PrintLineStatement(new Identifier("x", line), line)],
        line
      );
      let result = new ForStatement(
        identifier,
        start,
        end,
        step,
        bodyStatements,
        line
      );
      const expected = {
        identifier: { name: "x", line: 1 },
        start: { value: 0, line: 1 },
        end: { value: 10, line: 1 },
        step: { value: 2, line: 1 },
        bodyStatements: {
          statements: [{ value: { name: "x", line: 1 }, line: 1 }],
          line: 1
        },
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/statement/Assignment.test.js
var Assignment_test_exports = {};
__export(Assignment_test_exports, {
  Assignment_test: () => Assignment_test
});
var Assignment_test = () => {
  describe("assignment statement", () => {
    it('create new Assignment class from print "a" := 10', () => {
      const line = 1;
      const left = new Identifier("a", 1);
      const right = new Integer(10, 1);
      const result = new Assignment(left, right, line);
      const expected = {
        left: { name: "a", line: 1 },
        right: { value: 10, line: 1 },
        line: 1
      };
      expect(result).toBe(expected);
    });
    it('create new Assignment class from print "xyz" := 10', () => {
      const line = 1;
      const left = new Identifier("xyz", 1);
      const right = new Integer(10, 1);
      const result = new Assignment(left, right, line);
      const expected = {
        left: { name: "xyz", line: 1 },
        right: { value: 10, line: 1 },
        line: 1
      };
      expect(result).toBe(expected);
    });
    it("fail create new Assignment class from print := 10", () => {
      const line = 1;
      const left = new PrintStatement(new String_("a", 1), 1);
      const right = new Integer(10, 1);
      let result = void 0;
      try {
        result = new Assignment(left, right, line);
      } catch (error) {
        const expected = "PrintStatement String_ a, line 1 is not of expected Identifier type";
        expect(error.message).toBe(expected);
      }
      expect(result).toBe(void 0);
    });
  });
};

// tests/parser/classes/UnaryOperation.test.js
var UnaryOperation_test_exports = {};
__export(UnaryOperation_test_exports, {
  UnaryOperation_test: () => UnaryOperation_test
});
var UnaryOperation_test = () => {
  describe("unary operation", () => {
    it("create new UnaryOperation class from -, 2", () => {
      const minus = new Token(TOKENS.TOK_MINUS, "-", 1);
      const line = 1;
      const operand = new Integer(2, line);
      const result = new UnaryOperation(minus, operand, line);
      const expected = {
        operator: { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
        operand: { value: 2, line: 1 },
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/classes/String.test.js
var String_test_exports = {};
__export(String_test_exports, {
  String_test: () => String_test
});
var String_test = () => {
  describe("String", () => {
    it('create new Stings class from value "abc"', () => {
      const line = 1;
      const result = new String_("abc", line);
      const expected = { value: "abc", line: 1 };
      expect(result).toBe(expected);
    });
    it("fail create new String class from value 1", () => {
      try {
        const line = 1;
        new String_(1, line);
      } catch (error) {
        const expected = "1 is not of expected string type";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/parser/classes/LogicalOperation.test.js
var LogicalOperation_test_exports = {};
__export(LogicalOperation_test_exports, {
  LogicalOperation_test: () => LogicalOperation_test
});
var LogicalOperation_test = () => {
  describe("LogicalOperation", () => {
    it("create new LogicalOperation class from and, true, true", () => {
      const line = 1;
      const and = new Token(TOKENS.TOK_AND, "and", line);
      const left = new Boolean(true, line);
      const right = new Boolean(true, line);
      const result = new LogicalOperation(and, left, right, line);
      const expected = {
        operator: { tokenType: "TOK_AND", lexeme: "and", line: 1 },
        left: { value: true, line: 1 },
        right: { value: true, line: 1 },
        line: 1
      };
      expect(result).toBe(expected);
    });
    it("create new LogicalOperation class from or, false, true", () => {
      const line = 1;
      const and = new Token(TOKENS.TOK_OR, "or", line);
      const left = new Boolean(false, line);
      const right = new Boolean(true, line);
      const result = new LogicalOperation(and, left, right, line);
      const expected = {
        operator: { tokenType: "TOK_OR", lexeme: "or", line: 1 },
        left: { value: false, line: 1 },
        right: { value: true, line: 1 },
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/parser/classes/Integer.test.js
var Integer_test_exports = {};
__export(Integer_test_exports, {
  Integer_test: () => Integer_test
});
var Integer_test = () => {
  describe("Integer", () => {
    it("create new Integer class from value 10", () => {
      const result = new Integer(10, 1);
      const expected = { value: 10, line: 1 };
      expect(result).toBe(expected);
    });
    it("create new Integer class from value 10.0", () => {
      const result = new Integer(10, 1);
      const expected = { value: 10, line: 1 };
      expect(result).toBe(expected);
    });
    it("fail create new Integer class from value 10.6", () => {
      try {
        new Integer(10.6);
      } catch (error) {
        const expected = "AssertionError";
        expect(error.name).toBe(expected);
      }
    });
    it('fail create new Integer class from value "a"', () => {
      try {
        new Integer("a");
      } catch (error) {
        const expected = "AssertionError";
        expect(error.name).toBe(expected);
      }
    });
  });
};

// tests/parser/classes/Identifier.test.js
var Identifier_test_exports = {};
__export(Identifier_test_exports, {
  Identifier_test: () => Identifier_test
});
var Identifier_test = () => {
  describe("Identifier", () => {
    it("create new Identifier class from name x", () => {
      const line = 1;
      const result = new Identifier("x", line);
      const expected = { name: "x", line: 1 };
      expect(result).toBe(expected);
    });
    it("create new Identifier class from name xyz", () => {
      const line = 1;
      const result = new Identifier("xyz", line);
      const expected = { name: "xyz", line: 1 };
      expect(result).toBe(expected);
    });
    it("fail create new Identifier class from name 0", () => {
      try {
        const line = 1;
        new Identifier(0, line);
      } catch (error) {
        const expected = "0 is not of expected string type";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/parser/classes/Float.test.js
var Float_test_exports = {};
__export(Float_test_exports, {
  Float_test: () => Float_test
});
var Float_test = () => {
  describe("Float", () => {
    it("create new Float class from value 10.1", () => {
      const result = new Float(10.1, 1);
      const expected = { value: 10.1, line: 1 };
      expect(result).toBe(expected);
    });
    it("fail create new Float class from value 10.0", () => {
      try {
        new Float(10, 1);
      } catch (error) {
        const expected = "AssertionError";
        expect(error.name).toBe(expected);
      }
    });
    it('fail create new Float class from value "abc"', () => {
      try {
        new Float("abc");
      } catch (error) {
        const expected = "AssertionError";
        expect(error.name).toBe(expected);
      }
    });
  });
};

// tests/parser/classes/Boolean.test.js
var Boolean_test_exports = {};
__export(Boolean_test_exports, {
  Boolean_test: () => Boolean_test
});
var Boolean_test = () => {
  describe("Boolean", () => {
    it("create new Boolean class from value true", () => {
      const line = 1;
      const result = new Boolean(true, line);
      const expected = { value: true, line: 1 };
      expect(result).toBe(expected);
    });
    it("create new Boolean class from value false", () => {
      const line = 1;
      const result = new Boolean(false, line);
      const expected = { value: false, line: 1 };
      expect(result).toBe(expected);
    });
    it("fail create new Boolean class from value 0", () => {
      try {
        const line = 1;
        new Boolean(0, line);
      } catch (error) {
        const expected = "0 is not of expected boolean type";
        expect(error.message).toBe(expected);
      }
    });
  });
};

// tests/parser/classes/BinaryOperation.test.js
var BinaryOperation_test_exports = {};
__export(BinaryOperation_test_exports, {
  BinaryOperation_test: () => BinaryOperation_test
});
var BinaryOperation_test = () => {
  describe("binary operation", () => {
    it("create new BinaryOperation class from +, 2, 3", () => {
      const line = 1;
      const plus = new Token(TOKENS.TOK_PLUS, "+", line);
      const left = new Integer(2, line);
      const right = new Integer(3, line);
      const result = new BinaryOperation(plus, left, right, line);
      const expected = {
        operator: { tokenType: "TOK_PLUS", lexeme: "+", line: 1 },
        left: { value: 2, line: 1 },
        right: { value: 3, line: 1 },
        line: 1
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/environment/setVariable.test.js
var setVariable_test_exports = {};
__export(setVariable_test_exports, {
  set_variable_test: () => set_variable_test
});
var set_variable_test = () => {
  describe("set variable", () => {
    it("set variable in current environment", () => {
      let environment = new Environment();
      setVariable("a", 10, environment);
      const result = environment;
      const expected = {
        variables: { a: 10 },
        functions: {},
        parent: void 0
      };
      expect(result).toBe(expected);
    });
    it("throw error on wrong Environment object", () => {
      const environment = {};
      try {
        setVariable("a", 10, environment);
      } catch (error) {
        const expected = "{} is not of expected Environment type";
        expect(error.message).toBe(expected);
      }
    });
    it("set variable in parent environment", () => {
      let parentEnvironment = new Environment();
      let localEnvironment = new Environment(parentEnvironment);
      setVariable("a", 10, parentEnvironment);
      setVariable("a", 20, localEnvironment);
      const result = localEnvironment;
      const expected = {
        variables: {},
        functions: {},
        parent: {
          variables: { a: 20 },
          functions: {},
          parent: void 0
        }
      };
      expect(result).toBe(expected);
    });
    it("set variable in parent environment depth 1", () => {
      const globalEnvironment = new Environment();
      let environmentDepth1 = new Environment(globalEnvironment);
      let environmentDepth2 = new Environment(environmentDepth1);
      let environmentDepth3 = new Environment(environmentDepth2);
      setVariable("a", 10, environmentDepth1);
      setVariable("a", 20, environmentDepth3);
      const result = environmentDepth3;
      const expected = {
        variables: {},
        functions: {},
        parent: {
          variables: {},
          functions: {},
          parent: {
            variables: { a: 20 },
            functions: {},
            parent: {
              variables: {},
              functions: {},
              parent: void 0
            }
          }
        }
      };
      expect(result).toBe(expected);
    });
    it("set variable in current environment, bacause a variable was not found in parent environments ", () => {
      const globalEnvironment = new Environment();
      let environmentDepth1 = new Environment(globalEnvironment);
      let environmentDepth2 = new Environment(environmentDepth1);
      let environmentDepth3 = new Environment(environmentDepth2);
      setVariable("a", 10, environmentDepth3);
      const result = environmentDepth3;
      const expected = {
        variables: { a: 10 },
        functions: {},
        parent: {
          variables: {},
          functions: {},
          parent: {
            variables: {},
            functions: {},
            parent: {
              variables: {},
              functions: {},
              parent: void 0
            }
          }
        }
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/environment/setLocal.test.js
var setLocal_test_exports = {};
__export(setLocal_test_exports, {
  set_local_test: () => set_local_test
});
var set_local_test = () => {
  describe("set local", () => {
    it("set parameter as local variable in current environment", () => {
      let environment = new Environment();
      setLocal("a", 10, environment);
      const result = environment;
      const expected = {
        variables: { a: 10 },
        functions: {},
        parent: void 0
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/environment/newEnvironment.test.js
var newEnvironment_test_exports = {};
__export(newEnvironment_test_exports, {
  new_environment_test: () => new_environment_test
});
var new_environment_test = () => {
  describe("new environment", () => {
    it("new environment", () => {
      let environment = newEnvironment();
      const result = environment;
      const expected = { variables: {}, functions: {}, parent: void 0 };
      expect(result).toBe(expected);
    });
    it("throw error on wrong Environment object", () => {
      const environment = {};
      try {
        newEnvironment(environment);
      } catch (error) {
        const expected = "{} is not of expected Environment type";
        expect(error.message).toBe(expected);
      }
    });
    it("new environment with parent environment", () => {
      let parentEnvironment = newEnvironment();
      let localEnvironment = newEnvironment(parentEnvironment);
      setVariable("a", 10, parentEnvironment);
      setVariable("a", 20, localEnvironment);
      const result = localEnvironment;
      const expected = {
        variables: {},
        functions: {},
        parent: {
          variables: { a: 20 },
          functions: {},
          parent: void 0
        }
      };
      expect(result).toBe(expected);
    });
    it("new environments depth 3", () => {
      const globalEnvironment = newEnvironment();
      let environmentDepth1 = newEnvironment(globalEnvironment);
      let environmentDepth2 = newEnvironment(environmentDepth1);
      let environmentDepth3 = newEnvironment(environmentDepth2);
      setVariable("a", 10, environmentDepth1);
      setVariable("a", 20, environmentDepth3);
      const result = environmentDepth3;
      const expected = {
        variables: {},
        functions: {},
        parent: {
          variables: {},
          functions: {},
          parent: {
            variables: { a: 20 },
            functions: {},
            parent: {
              variables: {},
              functions: {},
              parent: void 0
            }
          }
        }
      };
      expect(result).toBe(expected);
    });
    it("new environments depth3, set variable in current environment, bacause a variable was nor found in parent environments ", () => {
      const globalEnvironment = newEnvironment();
      let environmentDepth1 = newEnvironment(globalEnvironment);
      let environmentDepth2 = newEnvironment(environmentDepth1);
      let environmentDepth3 = newEnvironment(environmentDepth2);
      setVariable("a", 10, environmentDepth3);
      const result = environmentDepth3;
      const expected = {
        variables: { a: 10 },
        functions: {},
        parent: {
          variables: {},
          functions: {},
          parent: {
            variables: {},
            functions: {},
            parent: {
              variables: {},
              functions: {},
              parent: void 0
            }
          }
        }
      };
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/environment/getVariable.test.js
var getVariable_test_exports = {};
__export(getVariable_test_exports, {
  get_variable_test: () => get_variable_test
});
var get_variable_test = () => {
  describe("get variable", () => {
    it("get undefined variable", () => {
      const environment = new Environment();
      const result = getVariable("a", environment);
      const expected = void 0;
      expect(result).toBe(expected);
    });
    it("throw error on wrong Environment object", () => {
      const environment = {};
      try {
        getVariable("a", environment);
      } catch (error) {
        const expected = "{} is not of expected Environment type";
        expect(error.message).toBe(expected);
      }
    });
    it("get variable from local environment", () => {
      const environment = new Environment();
      setVariable("a", 10, environment);
      const result = getVariable("a", environment);
      const expected = 10;
      expect(result).toBe(expected);
    });
    it("get variable from global environment", () => {
      const globalEnvironment = new Environment();
      setVariable("a", 10, globalEnvironment);
      const localEnvironment = new Environment(globalEnvironment);
      const result = getVariable("a", localEnvironment);
      const expected = 10;
      expect(result).toBe(expected);
    });
    it("get variable from global environment from depth 1", () => {
      const globalEnvironment = new Environment();
      setVariable("a", 10, globalEnvironment);
      const localEnvironmentDepth0 = new Environment(globalEnvironment);
      const localEnvironmentDepth1 = new Environment(
        localEnvironmentDepth0
      );
      const result = getVariable("a", localEnvironmentDepth1);
      const expected = 10;
      expect(result).toBe(expected);
    });
  });
};

// tests/interpreter/classes/Return.test.js
var Return_test_exports = {};
__export(Return_test_exports, {
  Return_test: () => Return_test
});
var Return_test = () => {
  describe("return", () => {
    it("throw new Return class", () => {
      try {
        throw new Return(10);
      } catch (error) {
        if (error instanceof Return) {
        }
        expect(error instanceof Return).toBe(true);
      }
    });
  });
};

// tests/interpreter/classes/Environment.test.js
var Environment_test_exports = {};

// tests/compiler/classes/Symbol.test.js
var Symbol_test_exports = {};
__export(Symbol_test_exports, {
  Symbol_test: () => Symbol_test
});
var Symbol_test = () => {
  describe("symbol", () => {
    it("create new Symbol class", () => {
      const name = "x";
      const result = new Symbol2(name);
      const expected = {
        name: "x",
        depth: 0,
        symbolType: "SYM_VAR",
        arity: 0
      };
      expect(result).toBe(expected);
    });
    it("fail to create new Symbol class from numer type", () => {
      const name = 1;
      try {
        const result = new Symbol2(name);
      } catch (error) {
        const result = error.message;
        const expected = "1 is not of expected String type";
        expect(result).toBe(expected);
      }
    });
  });
};

// tests/compiler/classes/Compiler.test.js
var Compiler_test_exports = {};
__export(Compiler_test_exports, {
  Compiler_test: () => Compiler_test
});
var Compiler_test = () => {
  describe("compiler", () => {
    it("create new Compiler class", () => {
      const result = new Compiler();
      const expected = {
        code: [],
        locals: [],
        globals: [],
        functions: [],
        scopeDepth: 0,
        labelCounter: 0
      };
      expect(result).toBe(expected);
    });
  });
};

// testsAutoImport.js
var tests = { ...runVM_test_exports, ...runCode_test_exports, ...createLabelTable_test_exports, ...sum_test_exports, ...reverse_test_exports, ...prettifyVMCode_test_exports, ...prefixInRange_test_exports, ...enumerate_test_exports, ...whileStatement_test_exports, ...unary_test_exports, ...returnStatement_test_exports, ...primary_test_exports, ...parseStatements_test_exports, ...parseError_test_exports, ...parse_test_exports, ...parameters_test_exports, ...multiplication_test_exports, ...modulo_test_exports, ...logicalOr_test_exports, ...logicalAnd_test_exports, ...ifStatement_test_exports, ...functionDeclaration_test_exports, ...forStatement_test_exports, ...expression_test_exports, ...exponent_test_exports, ...equality_test_exports, ...comparison_test_exports, ...args_test_exports, ...tokenizeNumber_test_exports, ...tokenize_test_exports, ...peek_test_exports, ...match_test_exports, ...lookahead_test_exports, ...isLetter_test_exports, ...isCharInteger_test_exports, ...createToken_test_exports, ...consumeString_test_exports, ...consumeIdentifier_test_exports, ...unaryOperatorTypeError_test_exports, ...interpretStatements_test_exports, ...interpretAST_test_exports, ...interpret_test_exports, ...binaryOperatorTypeError_test_exports, ...makeLabel_test_exports, ...getSymbol_test_exports, ...getFunctionSymbol_test_exports, ...generateCode_test_exports, ...endBlock_test_exports, ...emit_test_exports, ...compile_test_exports, ...beginBlock_test_exports, ...addSymbol_test_exports, ...addLocalSymbol_test_exports, ...addFunctionSymbol_test_exports, ...createTestVMOptions_test_exports, ...VirtualMachine_test_exports, ...Frame_test_exports, ...maxFactorial_test_exports, ...mandelbrot_test_exports, ...localVariablesShadowing_test_exports, ...fizzBuzz_test_exports, ...dragonCurveOptimized_test_exports, ...dragonCurve_test_exports, ...matchTokenType_test_exports, ...expectToken_test_exports, ...WhileStatement_test_exports, ...Parameter_test_exports, ...IfStatement_test_exports, ...FunctionDeclaration_test_exports, ...ForStatement_test_exports, ...Assignment_test_exports, ...UnaryOperation_test_exports, ...String_test_exports, ...LogicalOperation_test_exports, ...Integer_test_exports, ...Identifier_test_exports, ...Float_test_exports, ...Boolean_test_exports, ...BinaryOperation_test_exports, ...setVariable_test_exports, ...setLocal_test_exports, ...newEnvironment_test_exports, ...getVariable_test_exports, ...Return_test_exports, ...Environment_test_exports, ...Symbol_test_exports, ...Compiler_test_exports };
export {
  tests
};
