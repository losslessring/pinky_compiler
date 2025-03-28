import { describe } from '../../../testingLibrary/testingLibrary.js'
import { it } from '../../../testingLibrary/testingLibrary.js'
import { expect } from '../../../testingLibrary/testingLibrary.js'
import { Environment } from '../../../src/interpreter/classes/Environment'
import { setLocal } from '../../../src/interpreter/environment/setLocal'

export const set_local_test = () => {
    describe('set local', () => {
        it('set parameter as local variable in current environment', () => {
            let environment = new Environment()

            setLocal('a', 10, environment)
            const result = environment

            const expected = {
                variables: { a: 10 },
                functions: {},
                parent: undefined,
            }

            expect(result).toBe(expected)
        })
    })
}
