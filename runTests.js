// import { tests } from "./testsAutoImport.js"

import { tests } from "./testsBundle/testsBundle.js"

function runAllAutomatedTests() {
    const testFunctions = Object.values(tests)
    testFunctions.forEach((testFunction) => {
        testFunction()
    })
}

runAllAutomatedTests()
