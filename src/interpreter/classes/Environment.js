export class Environment {
    constructor(parent = undefined) {
        this.variables = {}
        this.parent = parent
    }

    getVariable(name) {
        let currentEnvironment = this

        while (currentEnvironment !== undefined) {
            const value = this.variables[name]

            if (value !== undefined) {
                return value
            } else {
                currentEnvironment = this.parent
            }
        }
        return undefined
    }

    setVariable(name, value) {
        const originalEnvironment = this

        let currentEnvironment = this
        while (currentEnvironment !== undefined) {
            const existingKeysValues = Object.entries(this.variables)

            const isValueExists = existingKeysValues.find(
                ([existingKey, existingValue]) => existingKey === name
            )
            if (isValueExists) {
                this.variables[name] = value
                return value
            }
            currentEnvironment = this.parent
            originalEnvironment.variables[name] = value
        }
    }

    newEnvironment() {
        return new Environment(this)
    }
}
