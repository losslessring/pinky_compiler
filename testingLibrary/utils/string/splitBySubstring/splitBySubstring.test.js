import { describe } from "../../../testingLibrary.js"
import { it } from "../../../testingLibrary.js"
import { expect } from "../../../testingLibrary.js"

import { splitBySubstring } from "./splitBySubstring.js"

export const splitBySubstring_test = () => {
    describe("split by substring", () => {
        it("split by substring", () => {
            const input = `Wed Mar 13 15:14:00 MSK 2024 INFO: suite: open spreadsheet by id\nWed Mar 13 15:14:00 MSK 2024 INFO: test: returns the name of the spreadsheet\nWed Mar 13 15:14:00 MSK 2024 INFO: Succeeded\nWed Mar 13 15:47:16 MSK 2024 INFO: test: returns the name of the spreadsheet\nWed Mar 13 15:45:02 MSK 2024 INFO: Error: Fail - Actual: "Copy of Счета", Expected: ""\n`

            const expected = [
                `Wed Mar 13 15:14:00 MSK 2024 INFO: suite: open spreadsheet by id`,
                `Wed Mar 13 15:14:00 MSK 2024 INFO: test: returns the name of the spreadsheet`,
                `Wed Mar 13 15:14:00 MSK 2024 INFO: Succeeded`,
                `Wed Mar 13 15:47:16 MSK 2024 INFO: test: returns the name of the spreadsheet`,
                `Wed Mar 13 15:45:02 MSK 2024 INFO: Error: Fail - Actual: "Copy of Счета", Expected: ""`,
                "",
            ]

            const result = splitBySubstring({
                string: input,
                splitBy: "\n",
            })

            expect(result).toBe(expected)
        })
    })
}
