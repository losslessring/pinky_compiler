import { Environment } from './../classes/Environment'

export function setFunction(name, node, declarationEnvironment, environment) {
    environment.functions[name] = {
        functionDeclaration: node,
        declarationEnvironment,
    }
}
