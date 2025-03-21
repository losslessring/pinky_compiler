import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Environment } from './../../../src/interpreter/classes/Environment'
import { setVariable } from './../../../src/interpreter/environment/setVariable'
import { newEnvironment } from './../../../src/interpreter/environment/newEnvironment'

export const new_environment_test = () => {
    describe('new environment', () => {
        it('new environment', () => {
            let environment = newEnvironment()
            const result = environment
            const expected = { variables: {}, functions: {}, parent: undefined }
            expect(result).toBe(expected)
        })
        it('throw error on wrong Environment object', () => {
            const environment = {}
            try {
                newEnvironment(environment)
            } catch (error) {
                const expected = '{} is not of expected Environment type'
                expect(error.message).toBe(expected)
            }
        })
        it('new environment with parent environment', () => {
            let parentEnvironment = newEnvironment()
            let localEnvironment = newEnvironment(parentEnvironment)
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
        it('new environments depth 3', () => {
            const globalEnvironment = newEnvironment()
            let environmentDepth1 = newEnvironment(globalEnvironment)
            let environmentDepth2 = newEnvironment(environmentDepth1)
            let environmentDepth3 = newEnvironment(environmentDepth2)

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
        it('new environments depth3, set variable in current environment, bacause a variable was nor found in parent environments ', () => {
            const globalEnvironment = newEnvironment()
            let environmentDepth1 = newEnvironment(globalEnvironment)
            let environmentDepth2 = newEnvironment(environmentDepth1)
            let environmentDepth3 = newEnvironment(environmentDepth2)
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
