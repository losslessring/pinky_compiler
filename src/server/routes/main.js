import express from 'express'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
import { tokenize } from './../../lexer/tokenize'
import { parse } from './../../parser/parse'
import { interpret } from './../../interpreter/interpret'
import { parseStatements } from './../../parser/parseStatements'

import { interpretAST } from './../../interpreter/interpretAST'
import { Compiler } from '../../compiler/classes/Compiler'
import { generateCode } from './../../compiler/generateCode'
import { VirtualMachine } from './../../virtualMachine/classes/VirtualMachine'
import { createTestVMOptions } from './../../virtualMachine/setup/createTestVMOptions'
import { runVM } from './../../virtualMachine/runVM'

export const app = express()
//const urlencodedParser = express.urlencoded({ extended: false })

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
})

app.post('/interpret', express.text(), function (request, response) {
    try {
        const code = request.body

        const tokens = tokenize({
            source: code,
            current: 0,
            start: 0,
            line: 1,
            tokens: [],
        })

        const current = 0

        const parsed = parseStatements(current, tokens.tokens)

        const ast = parsed.node

        const interpretationResult = interpretAST(ast)

        const compiler = new Compiler()
        const instructions = generateCode(compiler, ast)

        const vm = new VirtualMachine()

        const runVMOptions = createTestVMOptions({
            consoleOutput: true,
            enableLog: true,
        })

        const result = runVM(vm, instructions, runVMOptions).log.toString()
        console.log(result)
        response.send(result)
    } catch (error) {
        console.log(error.message)
        response.send(error.message)
    }
})
