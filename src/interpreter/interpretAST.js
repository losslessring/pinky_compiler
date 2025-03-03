import { interpret } from './interpret'
import { Environment } from './classes/Environment'

export function interpretAST(node) {
    let environment = new Environment()

    interpret(node, environment)
}
