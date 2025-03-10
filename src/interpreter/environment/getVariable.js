import { Environment } from './../classes/Environment'
export function getVariable(name, environment) {
    if (!(environment instanceof Environment)) {
        throw new TypeError(
            `${JSON.stringify(environment)} is not of expected Environment type`
        )
    }
    let currentEnvironment = environment

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
