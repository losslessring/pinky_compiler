import { describe } from "../../../testingLibrary.js"
import { it } from "../../../testingLibrary.js"
import { expect } from "../../../testingLibrary.js"

import { beautifyTestsLog } from "./beautifyTestsLog.js"

export const beautifyTestsLog_test = () => {
    describe("beautify tests log", () => {
        it("beautify tests log", () => {
            const input = `Wed Mar 13 15:14:00 MSK 2024 INFO: suite: open spreadsheet by id\nWed Mar 13 15:14:00 MSK 2024 INFO: test: returns the name of the spreadsheet\nWed Mar 13 15:14:00 MSK 2024 INFO: Succeeded\nWed Mar 13 15:47:16 MSK 2024 INFO: test: returns the name of the spreadsheet\nWed Mar 13 15:45:02 MSK 2024 INFO: Error: Fail - Actual: "Copy of Счета", Expected: ""\n`

            const expected = [
                `suite: open spreadsheet by id`,
                `test: returns the name of the spreadsheet`,
                `Succeeded`,
                `test: returns the name of the spreadsheet`,
                `Error: Fail - Actual: "Copy of Счета", Expected: ""`,
                "",
            ]

            const result = beautifyTestsLog({
                log: input,
                splitBy: "\n",
            })

            expect(result).toBe(expected)
        })
    })
}
