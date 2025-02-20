import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { interpret } from './../../src/interpreter/interpret'
import { Integer } from './../../src/parser/classes/expressions/Integer'
import { Float } from './../../src/parser/classes/expressions/Float'
import { Grouping } from './../../src/parser/classes/expressions/Grouping'
import { BinaryOperation } from './../../src/parser/classes/expressions/BinaryOperation'
import { Token } from './../../src/lexer/Token'
import { TOKENS } from './../../src/lexer/tokens'
import { UnaryOperation } from './../../src/parser/classes/expressions/UnaryOperation'
import { tokenize } from './../../src/lexer/tokenize'
import { parse } from './../../src/parser/parse'
import { String_ } from './../../src/parser/classes/expressions/String'
import { Boolean } from './../../src/parser/classes/expressions/Boolean'

export const interpret_test = () => {
    describe('interpret', () => {
        it('interpret 10', () => {
            const value = 10
            const line = 1
            const node = new Integer(value, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 10 }

            expect(result).toBe(expected)
        })

        it('interpret 35.864', () => {
            const value = 35.864
            const line = 1
            const node = new Float(value, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 35.864 }

            expect(result).toBe(expected)
        })

        it('interpret 7.7', () => {
            const value = 7.7
            const line = 1
            const node = new Float(value, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 7.7 }

            expect(result).toBe(expected)
        })

        it('interpret false', () => {
            const value = false
            const line = 1
            const node = new Boolean(value, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret (229.118)', () => {
            const value = 229.118

            const line = 1
            const node = new Grouping(new Float(value, line), line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 229.118 }

            expect(result).toBe(expected)
        })

        it('interpret 2+2', () => {
            const line = 1

            const plus = new Token(TOKENS.TOK_PLUS, '+', line)

            const left = new Integer(2, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(plus, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 4 }

            expect(result).toBe(expected)
        })

        it('interpret 2+3', () => {
            const line = 1

            const plus = new Token(TOKENS.TOK_PLUS, '+', line)

            const left = new Integer(2, line)
            const right = new Integer(3, line)

            const node = new BinaryOperation(plus, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 5 }

            expect(result).toBe(expected)
        })

        it('interpret false+4', () => {
            const line = 1

            const plus = new Token(TOKENS.TOK_PLUS, '+', line)

            const left = new Boolean(false, line)

            const right = new Integer(4, line)

            const node = new BinaryOperation(plus, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '+' between TYPE_BOOL and TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 27.872-5', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_MINUS, '-', line)

            const left = new Float(27.872, line)
            const right = new Integer(5, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 22.872 }

            expect(result).toBe(expected)
        })

        it('interpret 27.872-true', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_MINUS, '-', line)

            const left = new Float(27.872, line)
            const right = new Boolean(true, line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '-' between TYPE_NUMBER and TYPE_BOOL in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 27.872-abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_MINUS, '-', line)

            const left = new Float(27.872, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '-' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret abc-275.114', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_MINUS, '-', line)

            const left = new String_('abc', line)
            const right = new Float(275.114, line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '-' between TYPE_STRING and TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 5*3', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_STAR, '*', line)

            const left = new Integer(5, line)
            const right = new Integer(3, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 15 }

            expect(result).toBe(expected)
        })

        it('interpret 2*9', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_STAR, '*', line)

            const left = new Integer(2, line)
            const right = new Integer(9, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 18 }

            expect(result).toBe(expected)
        })

        it('interpret a*3', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_STAR, '*', line)

            const left = new String_('a', line)
            const right = new Integer(3, line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '*' between TYPE_STRING and TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 8/abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_SLASH, '/', line)

            const left = new Integer(8, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '/' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 8/4', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_SLASH, '/', line)

            const left = new Integer(8, line)
            const right = new Integer(4, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 2 }

            expect(result).toBe(expected)
        })

        it('interpret 9/2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_SLASH, '/', line)

            const left = new Integer(9, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 4.5 }

            expect(result).toBe(expected)
        })

        it('interpret 9/0', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_SLASH, '/', line)

            const left = new Integer(9, line)
            const right = new Integer(0, line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected = 'Division by zero in line 1'
                expect(result).toBe(expected)
            }
        })

        it('interpret abc%11', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_MOD, '%', line)

            const left = new String_('abc', line)
            const right = new Integer(11, line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '%' between TYPE_STRING and TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 8%4', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_MOD, '%', line)

            const left = new Integer(8, line)
            const right = new Integer(4, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 0 }

            expect(result).toBe(expected)
        })

        it('interpret 2^4', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_CARET, '^', line)

            const left = new Integer(2, line)
            const right = new Integer(4, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 16 }

            expect(result).toBe(expected)
        })

        it('interpret 2^false', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_CARET, '^', line)

            const left = new Integer(2, line)
            const right = new Boolean(false, line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '^' between TYPE_NUMBER and TYPE_BOOL in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret +8', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_PLUS, '+', line)

            const operand = new Integer(8, line)

            const node = new UnaryOperation(operator, operand, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 8 }

            expect(result).toBe(expected)
        })

        it('interpret +abcd', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_PLUS, '+', line)

            const operand = new String_('abcd', line)

            const node = new UnaryOperation(operator, operand, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '+' with TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret -abcd', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_MINUS, '-', line)

            const operand = new String_('abcd', line)

            const node = new UnaryOperation(operator, operand, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '-' with TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret ~abcd', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_NOT, '~', line)

            const operand = new String_('abcd', line)

            const node = new UnaryOperation(operator, operand, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '~' with TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret ~118', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_NOT, '~', line)

            const operand = new Integer(118, line)

            const node = new UnaryOperation(operator, operand, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '~' with TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret ~true', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_NOT, '~', line)

            const operand = new Boolean(true, line)

            const node = new UnaryOperation(operator, operand, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret -10', () => {
            const line = 1

            const operator = new Token(TOKENS.TOK_MINUS, '-', line)

            const operand = new Integer(10, line)

            const node = new UnaryOperation(operator, operand, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: -10 }

            expect(result).toBe(expected)
        })

        it('interpret 2+42*2+(47*-21)', () => {
            const source = '2+42*2+(47*-21)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: -901 }

            expect(result).toBe(expected)
        })

        it('interpret 2 * 9 + 13', () => {
            const source = '2 * 9 + 13'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 31 }

            expect(result).toBe(expected)
        })

        it('interpret 2 * 9 - -5', () => {
            const source = '2 * 9 - -5'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 23 }

            expect(result).toBe(expected)
        })

        it('interpret 2^3^3 - 1', () => {
            const source = '2^3^3 - 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 134217727 }

            expect(result).toBe(expected)
        })

        it('interpret (2^3^3-1) % 2', () => {
            const source = '(2^3^3-1) % 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 1 }

            expect(result).toBe(expected)
        })

        it('interpret 2 * (9 + 13) / 2', () => {
            const source = '2 * (9 + 13) / 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 22 }

            expect(result).toBe(expected)
        })

        it('interpret 2 * (9 + 13) + 2^2 + (((3 * 3) - 3) + 3.324) / 2.1', () => {
            const source = '2 * (9 + 13) + 2^2 + (((3 * 3) - 3) + 3.324) / 2.1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 52.44 }

            expect(result).toBe(expected)
        })

        it('interpret 24 / (12 / 2) / 2', () => {
            const source = '24 / (12 / 2) / 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 2 }

            expect(result).toBe(expected)
        })

        it('interpret 2+42*2+(47*-21) -- " cm"', () => {
            const source = '2+42*2+(47*-21) -- " cm"'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)
            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: -901 }

            expect(result).toBe(expected)
        })

        it('interpret 2+42*2+(47*-21)+" cm"', () => {
            const source = '2+42*2+(47*-21)+" cm"'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_STRING', value: '-901 cm' }

            expect(result).toBe(expected)
        })

        it('interpret 2+42*2+((47*-21)+" cm")', () => {
            const source = '2+42*2+((47*-21)+" cm")'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })
            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_STRING', value: '86-987 cm' }

            expect(result).toBe(expected)
        })

        it('interpret 10+" cm"', () => {
            const source = '10+" cm"'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_STRING', value: '10 cm' }

            expect(result).toBe(expected)
        })

        it('interpret a+b', () => {
            const line = 1

            const plus = new Token(TOKENS.TOK_PLUS, '+', line)

            const left = new String_('a', line)
            const right = new String_('b', line)

            const node = new BinaryOperation(plus, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_STRING', value: 'ab' }

            expect(result).toBe(expected)
        })

        it('interpret 10+" cm"', () => {
            const line = 1

            const plus = new Token(TOKENS.TOK_PLUS, '+', line)

            const left = new Integer(10, line)
            const right = new String_(' cm', line)

            const node = new BinaryOperation(plus, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_STRING', value: '10 cm' }

            expect(result).toBe(expected)
        })

        it('interpret 2>1', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_GT, '>', line)

            const left = new Integer(2, line)
            const right = new Integer(1, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 3>4.56', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_GT, '>', line)

            const left = new Integer(3, line)
            const right = new Float(4.56, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 2>abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_GT, '>', line)

            const left = new Integer(2, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '>' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 2>=1', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_GE, '>=', line)

            const left = new Integer(2, line)
            const right = new Integer(1, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 3>=4.56', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_GE, '>=', line)

            const left = new Integer(3, line)
            const right = new Float(4.56, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 2>=abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_GE, '>=', line)

            const left = new Integer(2, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '>=' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 1<2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LT, '<', line)

            const left = new Integer(1, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 3<4.56', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LT, '<', line)

            const left = new Integer(3, line)
            const right = new Float(4.56, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2<abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LT, '<', line)

            const left = new Integer(2, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '<' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 1<=2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LE, '<=', line)

            const left = new Integer(1, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2<=2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LE, '<=', line)

            const left = new Integer(2, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 30000<=4.56', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LE, '<=', line)

            const left = new Integer(30000, line)
            const right = new Float(4.56, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 2<=abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_LE, '<=', line)

            const left = new Integer(2, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '<=' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 2==2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_EQEQ, '==', line)

            const left = new Integer(2, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 1==2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_EQEQ, '==', line)

            const left = new Integer(1, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 10==4.56', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_EQEQ, '==', line)

            const left = new Integer(10, line)
            const right = new Float(4.56, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 2==abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_EQEQ, '==', line)

            const left = new Integer(2, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '==' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 2~=2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_NE, '~=', line)

            const left = new Integer(2, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 1~=2', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_NE, '~=', line)

            const left = new Integer(1, line)
            const right = new Integer(2, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 10~=4.56', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_NE, '~=', line)

            const left = new Integer(10, line)
            const right = new Float(4.56, line)

            const node = new BinaryOperation(operation, left, right, line)

            const result = interpret(node)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2~=abc', () => {
            const line = 1

            const operation = new Token(TOKENS.TOK_NE, '~=', line)

            const left = new Integer(2, line)
            const right = new String_('abc', line)

            const node = new BinaryOperation(operation, left, right, line)

            try {
                interpret(node)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported operator '~=' between TYPE_NUMBER and TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 2^3', () => {
            const source = '2^3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 8 }

            expect(result).toBe(expected)
        })

        it('interpret 2^3*2', () => {
            const source = '2^3*2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 16 }

            expect(result).toBe(expected)
        })

        it('interpret 2^3^2', () => {
            const source = '2^3^2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 512 }

            expect(result).toBe(expected)
        })

        it('interpret 4%3', () => {
            const source = '4%3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 1 }

            expect(result).toBe(expected)
        })

        it('interpret 7%2*3', () => {
            const source = '7%2*3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 3 }

            expect(result).toBe(expected)
        })

        it('interpret 7%2+3', () => {
            const source = '7%2+3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 4 }

            expect(result).toBe(expected)
        })

        it('interpret 4>3', () => {
            const source = '4>3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 4>=3.14', () => {
            const source = '4>=3.14'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 3.14>=3.14', () => {
            const source = '3.14>=3.14'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 3.14<=3.14', () => {
            const source = '3.14<=3.14'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 1+2<=3.14', () => {
            const source = '1+2<=3.14'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 1+2+0.14<=3.14', () => {
            const source = '1+2+0.14<=3.14'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 1+2+0.14+0.01<=3.14', () => {
            const source = '1+2+0.14+0.01<=3.14'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 3==3', () => {
            const source = '3==3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 3~=3', () => {
            const source = '3~=3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 1.1+1.9+2==5', () => {
            const source = '1.1+1.9+2==5'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2^3 == 2*2*2', () => {
            const source = '2^3 == 2*2*2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret (22 + 1) % 3', () => {
            const source = '(22 + 1) % 3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_NUMBER', value: 2 }

            expect(result).toBe(expected)
        })

        it('interpret 4>=3', () => {
            const source = '4>=3'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 4==2', () => {
            const source = '4==2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 4~=2', () => {
            const source = '4~=2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret ~(3 < 1 + -6)', () => {
            const source = '~(3 < 1 + -6)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true==true', () => {
            const source = 'true==true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true~=false', () => {
            const source = 'true~=false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret (2.5 > 0) == false', () => {
            const source = '(2.5 > 0) == false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 12^3>=0', () => {
            const source = '12^3>=0'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret (12*3)==35', () => {
            const source = '(12*3)==35'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret (3 == 2 + 1)', () => {
            const source = '(3 == 2 + 1)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret ~true==false', () => {
            const source = '~true==false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret ~(12 > 4) ~= false', () => {
            const source = '~(12 > 4) ~= false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret true and true', () => {
            const source = 'true and true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true and false', () => {
            const source = 'true and false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret false and true', () => {
            const source = 'false and true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret false and false', () => {
            const source = 'false and false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret false and 1', () => {
            const source = 'false and 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret true and 1', () => {
            const source = 'true and 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'and' with right TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 0 and 1', () => {
            const source = '0 and 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'and' with left TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret true and "abc"', () => {
            const source = 'true and "abc"'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'and' with right TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret false and "abc"', () => {
            const source = 'false and "abc"'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret "abc" and true', () => {
            const source = '"abc" and true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'and' with left TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret true or true', () => {
            const source = 'true or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true or false', () => {
            const source = 'true or false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret false or true', () => {
            const source = 'false or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret false or false', () => {
            const source = 'false or false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node

            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret true or 1', () => {
            const source = 'true or 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret false or 1', () => {
            const source = 'false or 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'or' with right TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret 0 or 1', () => {
            const source = '0 or 1'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'or' with left TYPE_NUMBER in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret false or "abc"', () => {
            const source = 'false or "abc"'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            try {
                interpret(ast)
            } catch (error) {
                const result = error.message
                const expected =
                    "Unsupported usage of logical operator 'or' with right TYPE_STRING in line 1."
                expect(result).toBe(expected)
            }
        })

        it('interpret true and true and true', () => {
            const source = 'true and true and true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true and true and false', () => {
            const source = 'true and true and false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret true and true or true', () => {
            const source = 'true and true or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true or true or true', () => {
            const source = 'true or true or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true and true or false', () => {
            const source = 'true and true or false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret true and false or true', () => {
            const source = 'true and false or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret false and true or true', () => {
            const source = 'false and true or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret false and true or false', () => {
            const source = 'false and true or false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret false and false or true', () => {
            const source = 'false and false or true'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret false and true or ~false', () => {
            const source = 'false and true or ~false'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret ~(false and true or false)', () => {
            const source = '~(false and true or false)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2 > 1 and 5 > 4', () => {
            const source = '2 > 1 and 5 > 4'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2 == 3 and 5 > 4', () => {
            const source = '2 == 3 and 5 > 4'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret 2 > 1 or 5 > 4', () => {
            const source = '2 > 1 or 5 > 4'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret 2 > 1 and 4 > 6 or 7 + 3 >= 6 and 5 == 2', () => {
            const source = '2 > 1 and 4 > 6 or 7 + 3 >= 6 and 5 == 2'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret (44 >= 2) or false and 1 > 0', () => {
            const source = '(44 >= 2) or false and 1 > 0'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: true }

            expect(result).toBe(expected)
        })

        it('interpret ~(44 >= 2)', () => {
            const source = '~(44 >= 2)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })

        it('interpret ~(3 ~= 2)', () => {
            const source = '~(3 ~= 2)'
            const tokens = tokenize({
                source,
                current: 0,
                start: 0,
                line: 1,
                tokens: [],
            })

            const current = 0
            const parsed = parse(current, tokens.tokens)

            const ast = parsed.node
            const result = interpret(ast)

            const expected = { type: 'TYPE_BOOL', value: false }

            expect(result).toBe(expected)
        })
    })
}
