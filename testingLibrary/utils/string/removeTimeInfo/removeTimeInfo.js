export function removeTimeInfo({ log, cutBeforeInclusive }) {
    return log
        .map((str) => str.split(cutBeforeInclusive))
        .map((arrayOfStrings) => {
            return arrayOfStrings.length === 2
                ? arrayOfStrings[1]
                : arrayOfStrings[0]
        })
}
