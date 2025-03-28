import { Environment } from '../classes/Environment'
export function setLocal(name, value, environment) {
    if (!(environment instanceof Environment)) {
        throw new TypeError(
            `${JSON.stringify(environment)} is not of expected Environment type`
        )
    }
    environment.variables[name] = value
}
