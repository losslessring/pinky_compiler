import { Environment } from './../classes/Environment'
export function setVariable(name, value, environment) {
    if (!(environment instanceof Environment)) {
        throw new TypeError(
            `${JSON.stringify(environment)} is not of expected Environment type`
        )
    }
    let originalEnvironment = environment

    let currentEnvironment = environment

    while (currentEnvironment !== undefined) {
        const existingKeysValues = Object.entries(currentEnvironment.variables)

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
