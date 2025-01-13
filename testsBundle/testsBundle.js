var tests = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // testsAutoImport.js
  var testsAutoImport_exports = {};
  __export(testsAutoImport_exports, {
    tests: () => tests
  });

  // tests/utils/sum.test.js
  var sum_test_exports = {};
  __export(sum_test_exports, {
    sum_test: () => sum_test
  });

  // src/utils/sum.js
  function sum(a, b) {
    return a + b;
  }

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
  var LOG_LEVEL = "all";
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
      logFn(`${logColors.FgRed}${err.message}${logColors.Reset}`);
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
      throw new Error("Test run failed");
    }
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

  // tests/lexer/tokenizeNumber.test.js
  var tokenizeNumber_test_exports = {};
  __export(tokenizeNumber_test_exports, {
    tokenizeNumber_test: () => tokenizeNumber_test
  });

  // src/lexer/isCharInteger.js
  function isCharInteger(cursor, source) {
    return Number.isInteger(parseInt(source[cursor]));
  }

  // src/lexer/lookahead.js
  function lookahead(currentIndex, n, source) {
    return source[currentIndex + n];
  }

  // src/lexer/peek.js
  function peek(cursor, source) {
    return source[cursor];
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
    // Two-char tokens
    TOK_EQ: "TOK_EQ",
    // ==
    TOK_GE: "TOK_GE",
    TOK_LE: "TOK_LE",
    TOK_NE: "TOK_NE",
    // ~=
    TOK_EQEQ: "TOK_EQEQ",
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

  // tests/lexer/tokenizeNumber.test.js
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

  // src/lexer/match.js
  function match(expected, cursor, source) {
    if (source[cursor] !== expected) {
      return false;
    }
    return true;
  }

  // src/lexer/consumeString.js
  function consumeString(startQuote, cursor, source) {
    while (!match(startQuote, cursor, source)) {
      cursor++;
    }
    cursor++;
    return cursor;
  }

  // src/lexer/isLetter.js
  function isLetter(char) {
    return /^[A-Z]$/i.test(char);
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
      } else if (currentCharacter === "#") {
        while (peek(cursor, source) !== "\n") {
          cursor++;
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
          addMulticharToken(TOKENS.TOK_EQ);
        }
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
        cursor = consumeString(currentCharacter, cursor, source);
        addMulticharToken(TOKENS.TOK_STRING);
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

  // tests/lexer/tokenize.test.js
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
      it("tokenize --", () => {
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
          current: 2,
          start: 2,
          line: 1,
          tokens: [
            { tokenType: "TOK_MINUS", lexeme: "-", line: 1 },
            { tokenType: "TOK_MINUS", lexeme: "-", line: 1 }
          ]
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
        const source = "# This is a comment\n+";
        const result = tokenize({
          source,
          current: 0,
          start: 0,
          line: 1,
          tokens: []
        });
        const expected = {
          source: "# This is a comment\n+",
          current: 21,
          start: 21,
          line: 2,
          tokens: [{ tokenType: "TOK_PLUS", lexeme: "+", line: 2 }]
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
          tokens: [{ tokenType: "TOK_EQ", lexeme: "==", line: 1 }]
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
            { tokenType: "TOK_EQ", lexeme: "==", line: 1 },
            { tokenType: "TOK_EQ", lexeme: "==", line: 1 }
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
      it('consume string ""', () => {
        const source = '""';
        const startQuote = '"';
        const cursor = 1;
        const result = consumeString(startQuote, cursor, source);
        const expected = 2;
        expect(result).toBe(expected);
      });
      it('consume string "a"', () => {
        const source = '"a"';
        const startQuote = '"';
        const cursor = 1;
        const result = consumeString(startQuote, cursor, source);
        const expected = 3;
        expect(result).toBe(expected);
      });
      it('consume string "abc"', () => {
        const source = '"abc"';
        const startQuote = '"';
        const cursor = 1;
        const result = consumeString(startQuote, cursor, source);
        const expected = 5;
        expect(result).toBe(expected);
      });
      it('consume string "a1b2c48"', () => {
        const source = '"a1b2c48"';
        const startQuote = '"';
        const cursor = 1;
        const result = consumeString(startQuote, cursor, source);
        const expected = 9;
        expect(result).toBe(expected);
      });
      it("consume string 'n99x7hg5'", () => {
        const source = "'n99x7hg5'";
        const startQuote = "'";
        const cursor = 1;
        const result = consumeString(startQuote, cursor, source);
        const expected = 10;
        expect(result).toBe(expected);
      });
    });
  };

  // tests/lexer/consumeIdentifier.test.js
  var consumeIdentifier_test_exports = {};
  __export(consumeIdentifier_test_exports, {
    consumeIdentifier_test: () => consumeIdentifier_test
  });

  // src/lexer/consumeIdentifier.js
  function consumeIdentifier(cursor, source) {
    while (isLetter(peek(cursor, source)) || isCharInteger(cursor, source) || match("_", cursor, source)) {
      cursor++;
    }
    return cursor;
  }

  // tests/lexer/consumeIdentifier.test.js
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

  // testsAutoImport.js
  var tests = { ...sum_test_exports, ...tokenizeNumber_test_exports, ...tokenize_test_exports, ...peek_test_exports, ...match_test_exports, ...lookahead_test_exports, ...isLetter_test_exports, ...isCharInteger_test_exports, ...createToken_test_exports, ...consumeString_test_exports, ...consumeIdentifier_test_exports };
  return __toCommonJS(testsAutoImport_exports);
})();
