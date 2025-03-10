import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { getVariable } from './../../../src/interpreter/environment/getVariable'
import { Environment } from './../../../src/interpreter/classes/Environment'
import { setVariable } from './../../../src/interpreter/environment/setVariable'

export const get_variable_test = () => {
    describe('get variable', () => {
        it('get undefined variable', () => {
            const environment = new Environment()

            const result = getVariable('a', environment)
            const expected = undefined

            expect(result).toBe(expected)
        })

        it('throw error on wrong Environment object', () => {
            const environment = {}

            try {
                getVariable('a', environment)
            } catch (error) {
                const expected = '{} is not of expected Environment type'

                expect(error.message).toBe(expected)
            }
        })

        it('get variable from local environment', () => {
            const environment = new Environment()
            setVariable('a', 10, environment)
            const result = getVariable('a', environment)
            const expected = 10

            expect(result).toBe(expected)
        })

        it('get variable from global environment', () => {
            const globalEnvironment = new Environment()

            setVariable('a', 10, globalEnvironment)

            const localEnvironment = new Environment(globalEnvironment)
            const result = getVariable('a', localEnvironment)
            const expected = 10

            expect(result).toBe(expected)
        })

        it('get variable from global environment from depth 1', () => {
            const globalEnvironment = new Environment()

            setVariable('a', 10, globalEnvironment)

            const localEnvironmentDepth0 = new Environment(globalEnvironment)
            const localEnvironmentDepth1 = new Environment(
                localEnvironmentDepth0
            )
            const result = getVariable('a', localEnvironmentDepth1)
            const expected = 10

            expect(result).toBe(expected)
        })
    })
}
