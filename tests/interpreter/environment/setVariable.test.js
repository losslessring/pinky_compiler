import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Environment } from './../../../src/interpreter/classes/Environment'
import { setVariable } from './../../../src/interpreter/environment/setVariable'

export const set_variable_test = () => {
    describe('set variable', () => {
        it('set variable in current environment', () => {
            let environment = new Environment()

            setVariable('a', 10, environment)
            const result = environment

            const expected = {
                variables: { a: 10 },
                functions: {},
                parent: undefined,
            }

            expect(result).toBe(expected)
        })

        it('throw error on wrong Environment object', () => {
            const environment = {}

            try {
                setVariable('a', 10, environment)
            } catch (error) {
                const expected = '{} is not of expected Environment type'

                expect(error.message).toBe(expected)
            }
        })

        it('set variable in parent environment', () => {
            let parentEnvironment = new Environment()
            let localEnvironment = new Environment(parentEnvironment)

            setVariable('a', 10, parentEnvironment)

            setVariable('a', 20, localEnvironment)

            const result = localEnvironment

            const expected = {
                variables: {},
                functions: {},
                parent: {
                    variables: { a: 20 },
                    functions: {},
                    parent: undefined,
                },
            }

            expect(result).toBe(expected)
        })

        it('set variable in parent environment depth 1', () => {
            const globalEnvironment = new Environment()
            let environmentDepth1 = new Environment(globalEnvironment)
            let environmentDepth2 = new Environment(environmentDepth1)
            let environmentDepth3 = new Environment(environmentDepth2)

            setVariable('a', 10, environmentDepth1)

            setVariable('a', 20, environmentDepth3)

            const result = environmentDepth3

            const expected = {
                variables: {},
                functions: {},
                parent: {
                    variables: {},
                    functions: {},
                    parent: {
                        variables: { a: 20 },
                        functions: {},
                        parent: {
                            variables: {},
                            functions: {},
                            parent: undefined,
                        },
                    },
                },
            }

            expect(result).toBe(expected)
        })

        it('set variable in current environment, bacause a variable was not found in parent environments ', () => {
            const globalEnvironment = new Environment()
            let environmentDepth1 = new Environment(globalEnvironment)
            let environmentDepth2 = new Environment(environmentDepth1)
            let environmentDepth3 = new Environment(environmentDepth2)

            setVariable('a', 10, environmentDepth3)

            const result = environmentDepth3

            const expected = {
                variables: { a: 10 },
                functions: {},
                parent: {
                    variables: {},
                    functions: {},
                    parent: {
                        variables: {},
                        functions: {},
                        parent: {
                            variables: {},
                            functions: {},
                            parent: undefined,
                        },
                    },
                },
            }

            expect(result).toBe(expected)
        })
    })
}
