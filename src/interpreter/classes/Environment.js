export class Environment {
    constructor(parent = undefined) {
        this.variables = {}
        this.parent = parent
    }

    getVariable(name) {
        let currentEnvironment = this

        while (currentEnvironment !== undefined) {
            const value = currentEnvironment.variables[name]

            if (value !== undefined) {
                return value
            } else {
                currentEnvironment = currentEnvironment.parent
            }
        }
        return undefined
    }

    setVariable(name, value) {
        let originalEnvironment = this

        let currentEnvironment = this

        while (currentEnvironment !== undefined) {
            const existingKeysValues = Object.entries(
                currentEnvironment.variables
            )

            const isValueExists = existingKeysValues.find(
                ([existingKey, existingValue]) => existingKey === name
            )
            if (isValueExists) {
                currentEnvironment.variables[name] = value
                return value
            }
            currentEnvironment = currentEnvironment.parent
        }
        originalEnvironment.variables[name] = value
    }

    newEnvironment() {
        return new Environment(this)
    }
}
