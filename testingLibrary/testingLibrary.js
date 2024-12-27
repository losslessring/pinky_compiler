import * as R from "ramda"

const logColors = {
    Reset: "\x1b[0m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",
}

const loggerFn = console.log

const LOG_LEVEL = "errors"

class TestMatchers {
    constructor({
        actual,
        logColors,
        logFn = console.log,
        logLevel = LOG_LEVEL,
    }) {
        this.actual = actual
        this.logFn = logFn
        this.logColors = logColors
        this.logLevel = logLevel
    }

    toBe(expected) {
        if (R.equals(expected, this.actual)) {
            if (this.logLevel === "all") {
                this.logFn(
                    `${this.logColors.FgGreen}Succeeded${this.logColors.Reset}`
                )
            }
        } else {
            this.logFn(
                `${this.logColors.FgRed}Test failed\nActual:\n${JSON.stringify(
                    this.actual
                )}
                \nExpected:\n${JSON.stringify(expected)}\n${
                    this.logColors.Reset
                }`
            )

            throw new Error()
        }
    }

    toBeTruthy() {
        if (this.actual) {
            this.logFn(`Succeeded`)
        } else {
            this.logFn(
                `Fail - Expected value to be truthy but got ${this.actual}`
            )
            throw new Error(
                `Fail - Expected value to be truthy but got ${this.actual}`
            )
        }
    }
}

export function expect(actual) {
    return new TestMatchers({ actual, logColors, logFn: loggerFn })
}

export function describe(
    suiteName,
    fn,
    logFn = loggerFn,
    logLevel = LOG_LEVEL
) {
    try {
        if (logLevel === "all") {
            logFn(`suite: ${suiteName}`)
        }
        fn()
    } catch (err) {
        logFn(`${logColors.FgRed}${err.message}${logColors.Reset}`)
    }
}

export function it(testName, fn, logFn = loggerFn, logLevel = LOG_LEVEL) {
    if (logLevel === "all") {
        logFn(`test: ${testName}`)
    }
    try {
        fn()
    } catch (err) {
        // logFn(`${logColors.FgGray}`)
        // logFn(err)
        logFn(`${logColors.FgRed}${err.message}${logColors.Reset}`)
        // console.log(err.message)
        // logFn(`${logColors.Reset}`)

        throw new Error("Test run failed")
    }
}
