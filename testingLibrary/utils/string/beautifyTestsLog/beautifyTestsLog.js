import { splitBySubstring } from "./../splitBySubstring/splitBySubstring"
import { removeTimeInfo } from "./../removeTimeInfo/removeTimeInfo"

export function beautifyTestsLog({ log, splitBy }) {
    return removeTimeInfo({
        log: splitBySubstring({ string: log, splitBy }),
        cutBeforeInclusive: "INFO: ",
    })
}
