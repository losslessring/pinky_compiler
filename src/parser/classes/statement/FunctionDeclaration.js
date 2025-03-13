import assert from 'assert'
import { Declaration } from './Declaration'
import { Parameter } from './Parameter'

export class FunctionDeclaration extends Declaration {
    constructor(name, parameters, bodyStatements, line) {
        super()

        assert(
            typeof name === 'string',
            `Constructor parameter 'name' of a FunctionDeclaration class instance with a value of ${name} of the ${name?.constructor?.name} type is not of the expected string type.`
        )

        assert(
            Array.isArray(parameters),
            `Constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of ${parameters} of the ${parameters?.constructor?.name} type is not of the expected Array type.`
        )

        parameters.forEach((parameter) => {
            assert(
                parameter instanceof Parameter,
                `The value of the constructor parameter 'parameters' of a FunctionDeclaration class instance with a value of ${parameter} of the ${parameter?.constructor?.name} type is not of the expected Parameter type.`
            )
        })

        this.name = name
        this.parameters = parameters
        this.bodyStatements = bodyStatements
        this.line = line
    }

    toString() {
        return `FunctionDeclaration ${this.name}, ${this.parameters}, ${this.bodyStatements}, line ${this.line}.`
    }
}
