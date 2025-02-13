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

        it('interpret (229.118)', () => {
            const value = 229.118

            const line = 1
            const node = new Grouping(new Float(value, line), line)

            const result = interpret(node)

            const expected = { type: 'TYPE_NUMBER', value: 229.118 }

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
    })
}
