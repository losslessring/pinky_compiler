import assert from 'assert'
import { Declaration } from './Declaration'

export class Parameter extends Declaration {
    constructor(name, line) {
        super()

        assert(
            typeof name === 'string',
            `Constructor parameter 'name' of a Parameter class instance with a value of ${name} of the ${name?.constructor?.name} type is not of the expected string type.`
        )
        this.name = name
        this.line = line
    }

    toString() {
        return `Parameter ${this.name}`
    }
}
