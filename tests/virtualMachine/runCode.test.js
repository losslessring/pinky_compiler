import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'
import { Compiler } from './../../src/compiler/classes/Compiler'
import { VirtualMachine } from './../../src/virtualMachine/classes/VirtualMachine'

export const runCode_test = () => {
    describe('run code', () => {
        // it('run code', () => {
        //     const source =
        //         'func factorial(n)\n' +
        //         'mul := 1\n' +
        //         'for i := 1, n, 1 do\n' +
        //         'mul := mul * i\n' +
        //         'end\n' +
        //         'ret mul\n' +
        //         'end\n' +
        //         'println factorial(5)'
        //     const tokens = tokenize({
        //         source,
        //         current: 0,
        //         start: 0,
        //         line: 1,
        //         tokens: [],
        //     })
        //     const current = 0
        //     const parsed = parseStatements(current, tokens.tokens)
        //     const ast = parsed.node
        //     const compiler = new Compiler()
        //     const result = new VirtualMachine()
        //     const expected = { stack: [], programCounter: 0 }
        //     expect(result).toBe(expected)
        // })
    })
}
