import { Environment } from './../classes/Environment'

export function getFunction(name, environment) {
    if (!(environment instanceof Environment)) {
        throw new TypeError(
            `${JSON.stringify(environment)} is not of expected Environment type`
        )
    }
    let currentEnvironment = environment

    while (currentEnvironment !== undefined) {
        const func = currentEnvironment.functions[name]

        if (func !== undefined) {
            return func
        } else {
            currentEnvironment = currentEnvironment.parent
        }
    }
    return undefined
}
