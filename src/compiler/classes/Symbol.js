import assert from 'assert'
export class Symbol {
    constructor(name, depth = 0) {
        assert(
            typeof name === 'string',
            `${name} is not of expected String type`
        )
        this.name = name
        this.depth = depth
    }
}
