export function createTestVMOptions(options) {
    return {
        consoleOutput: {
            enable: options.consoleOutput,
        },
        executionLog: {
            enable: options.enableLog,
            log: [],
            logFunction: function (value) {
                this.log.push(value)
            },
        },
    }
}
