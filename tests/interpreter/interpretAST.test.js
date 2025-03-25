import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { tokenize } from './../../src/lexer/tokenize'
import { interpretAST } from './../../src/interpreter/interpretAST'
import { parseStatements } from './../../src/parser/parseStatements'

export const interpret_AST_test = () => {
    // describe('interpret AST', () => {
    //     it('x := 0 x := x + 1 println("The value of the global x is " + x)', () => {
    //         const source =
    //             'x := 0 x := x + 1 println("The value of the global x is " + x)'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('global and local variables', () => {
    //         const source =
    //             'x := 0\n' +
    //             'x := x + 1\n' +
    //             'println("Global x is " + x)\n' +
    //             'if 5 ~= 2 then\n' +
    //             'y := x + 20\n' +
    //             'println("Local y is " + y)\n' +
    //             'println("Global x is " + x)\n' +
    //             'else\n' +
    //             'println("Error, no local variable y")\n' +
    //             'x := y\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('global and local variables, local variable error', () => {
    //         const source =
    //             'x := 0\n' +
    //             'x := x + 1\n' +
    //             'println("Global x is " + x)\n' +
    //             'if 5 == 2 then\n' +
    //             'y := x + 20\n' +
    //             'println("Local y is " + y)\n' +
    //             'println("Global x is " + x)\n' +
    //             'else\n' +
    //             'x := y\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         try {
    //             interpretAST(ast)
    //         } catch (error) {
    //             const expected = 'Undeclared identifier y in line 9.'
    //             expect(error.message).toBe(expected)
    //         }
    //     })
    //     it('global and local variables, while loop, println i from 1 to 10', () => {
    //         const source =
    //             'i := 1\n' +
    //             'while i <= 10 do\n' +
    //             'println("i = " + i)\n' +
    //             'i := i + 1\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('global and local variables, while loop, println i from 10 to 5', () => {
    //         const source =
    //             'i := 10\n' +
    //             'while i > 4 do\n' +
    //             'println("i = " + i)\n' +
    //             'i := i - 1\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println num from 1 to 30, step 2', () => {
    //         const source =
    //             'for num := 1, 30, 2 do\n' + 'println("num = " + num)\n' + 'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println num from 1 to 30, no step', () => {
    //         const source =
    //             'for num := 1, 30 do\n' + 'println("num = " + num)\n' + 'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println num from 30 to 1,  step 1', () => {
    //         const source =
    //             'for num := 30, 1 do\n' + 'println("num = " + num)\n' + 'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println num from 30 to 1,  step -2', () => {
    //         const source =
    //             'for num := 30, 1, -2 do\n' +
    //             'println("num = " + num)\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println num from 50 to 50', () => {
    //         const source =
    //             'for num := 50, 50 do\n' + 'println("num = " + num)\n' + 'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println num from 50 to 50, step -2', () => {
    //         const source =
    //             'for num := 50, 50, -2 do\n' +
    //             'println("num = " + num)\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println x from 20 + x to 5', () => {
    //         const source =
    //             'x := 0\n' +
    //             'x := x + 1\n' +
    //             'for num := 20 + x, 5 do\n' +
    //             'println("num = " + num)\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('for loop, println x from 20 + x to 5', () => {
    //         const source =
    //             'x := 0\n' +
    //             'x := x + 1\n' +
    //             'while x <= 10 do\n' +
    //             'println("x = " + x)\n' +
    //             'x := x + 1\n' +
    //             'end\n' +
    //             'println("x value Out of the loop = " + x)\n' +
    //             'for num := 20 + x, 5 do\n' +
    //             'println("num = " + num)\n' +
    //             'end'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const current = 0
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('factorial function declaration and call with an argument of 5', () => {
    //         const current = 0
    //         const source =
    //             'func factorial(n)\n' +
    //             'mul := 1\n' +
    //             'for i := 1, n, 1 do\n' +
    //             'mul := mul * i\n' +
    //             'end\n' +
    //             'println("The factorial of " + n + " is " + mul)\n' +
    //             'end\n' +
    //             'factorial(5)'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('factorial function declaration and call with an argument of 6', () => {
    //         const current = 0
    //         const source =
    //             'func factorial(n)\n' +
    //             'mul := 1\n' +
    //             'for i := 1, n, 1 do\n' +
    //             'mul := mul * i\n' +
    //             'end\n' +
    //             'println("The factorial of " + n + " is " + mul)\n' +
    //             'end\n' +
    //             'factorial(6)'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('fail calling factorial function with 2 arguments instead of 1', () => {
    //         const current = 0
    //         const source =
    //             'func factorial(n)\n' +
    //             'mul := 1\n' +
    //             'for i := 1, n, 1 do\n' +
    //             'mul := mul * i\n' +
    //             'end\n' +
    //             'println("The factorial of " + n + " is " + mul)\n' +
    //             'end\n' +
    //             'factorial(5,6)'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         let result = undefined
    //         try {
    //             result = interpretAST(ast)
    //         } catch (error) {
    //             const expected =
    //                 'Function factorial expected 1 parameters, but 2 arguments were passed, line 8.'
    //             expect(error.message).toBe(expected)
    //         }
    //         expect(result).toBe(undefined)
    //     })
    //     it('fail calling undeclared factorial1 function', () => {
    //         const current = 0
    //         const source =
    //             'func factorial(n)\n' +
    //             'mul := 1\n' +
    //             'for i := 1, n, 1 do\n' +
    //             'mul := mul * i\n' +
    //             'end\n' +
    //             'println("The factorial of " + n + " is " + mul)\n' +
    //             'end\n' +
    //             'factorial1(5)'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         let result = undefined
    //         try {
    //             result = interpretAST(ast)
    //         } catch (error) {
    //             const expected = 'Function factorial1 was not declared, line 8.'
    //             expect(error.message).toBe(expected)
    //         }
    //         expect(result).toBe(undefined)
    //     })
    //     it('factorial function declaration with return statement and call with an argument of 6', () => {
    //         const current = 0
    //         const source =
    //             'func factorial(n)\n' +
    //             'mul := 1\n' +
    //             'for i := 1, n, 1 do\n' +
    //             'mul := mul * i\n' +
    //             'end\n' +
    //             'ret mul\n' +
    //             'end\n' +
    //             'println factorial(6)'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    //     it('factorial function declaration with return statement and call with an argument of 7, save result to a variable', () => {
    //         const current = 0
    //         const source =
    //             'func factorial(n)\n' +
    //             'mul := 1\n' +
    //             'for i := 1, n, 1 do\n' +
    //             'mul := mul * i\n' +
    //             'end\n' +
    //             'ret mul\n' +
    //             'end\n' +
    //             'x := factorial(7)\n' +
    //             'println x'
    //         const tokens = tokenize({
    //             source,
    //             current: 0,
    //             start: 0,
    //             line: 1,
    //             tokens: [],
    //         })
    //         const parsed = parseStatements(current, tokens.tokens)
    //         const ast = parsed.node
    //         const result = interpretAST(ast)
    //         const expected = undefined
    //         expect(result).toBe(expected)
    //     })
    // })
}
