import { describe } from '../../testingLibrary/testingLibrary.js'
import { it } from '../../testingLibrary/testingLibrary.js'
import { expect } from '../../testingLibrary/testingLibrary.js'

import { readFile } from '../../src/fileSystem/readFile/readFile.js'

export const readFile_test = () => {
    describe('read json file', () => {
        it('read json data from file', async () => {
            const expected = {
                key0: 'value0',
                key1: 'value1',
            }

            const result = await readFile({
                path: './tests/fileSystem/tests/readFileTest.json',
                encoding: 'utf8',
            }).then((data) => JSON.parse(data))

            expect(result).toBe(expected)
        })

        it('read text data from file', async () => {
            const expected = 'This is a test.'

            const result = await readFile({
                path: './tests/fileSystem/tests/readFileTest.txt',
                encoding: 'utf8',
            })

            expect(result).toBe(expected)
        })
    })
}
