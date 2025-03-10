import { Environment } from './../classes/Environment'
export function newEnvironment(environment) {
    if (environment !== undefined) {
        if (!(environment instanceof Environment)) {
            throw new TypeError(
                `${JSON.stringify(
                    environment
                )} is not of expected Environment type`
            )
        }
    }
    return new Environment(environment)
}
