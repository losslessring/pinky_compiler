import assert from 'assert'
export class Symbol {
    constructor(name) {
        assert(
            typeof name === 'string',
            `${name} is not of expected String type`
        )
        this.name = name
    }
}
