import { describe } from "../../../testingLibrary.js"
import { it } from "../../../testingLibrary.js"
import { expect } from "../../../testingLibrary.js"

import { removeTimeInfo } from "./removeTimeInfo.js"

export const removeTimeInfo_test = () => {
    describe("remove time info", () => {
        it("remove time info", () => {
            const input = [
                `Wed Mar 13 15:14:00 MSK 2024 INFO: suite: open spreadsheet by id`,
                `Wed Mar 13 15:14:00 MSK 2024 INFO: test: returns the name of the spreadsheet`,
                `Wed Mar 13 15:14:00 MSK 2024 INFO: Succeeded`,
                `Wed Mar 13 15:47:16 MSK 2024 INFO: test: returns the name of the spreadsheet`,
                `Wed Mar 13 15:45:02 MSK 2024 INFO: Error: Fail - Actual: "Copy of Счета", Expected: ""`,
                "",
                "aaa",
            ]

            const expected = [
                `suite: open spreadsheet by id`,
                `test: returns the name of the spreadsheet`,
                `Succeeded`,
                `test: returns the name of the spreadsheet`,
                `Error: Fail - Actual: "Copy of Счета", Expected: ""`,
                "",
                "aaa",
            ]

            const result = removeTimeInfo({
                log: input,
                cutBeforeInclusive: "INFO: ",
            })

            expect(result).toBe(expected)
        })
    })
}
