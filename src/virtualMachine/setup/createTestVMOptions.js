export function createTestVMOptions(options) {
    return {
        executionLog: {
            enable: options.enableLog,
            log: [],
            logFunction: function (value) {
                this.log.push(value)
            },
        },
    }
}
