import assert from 'assert'
import { SYMBOL_TYPES } from './../symbolTypes'
export class Symbol {
    constructor(
        name,
        depth = 0,
        symbolType = SYMBOL_TYPES.VARIABLE,
        arity = 0
    ) {
        assert(
            typeof name === 'string',
            `${name} is not of expected String type`
        )
        this.name = name
        this.depth = depth
        this.symbolType = symbolType
        this.arity = arity
    }
}
