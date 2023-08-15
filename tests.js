function assert(condition) {
    if (!condition) { throw { name: "AssertionError", message: "Assertion failed" }}
}

function testPasses(toTry) {
    try {
        toTry()
        return true;
    } catch (failure) {
        return false;
    }
}

function report(testName, passed) {
    console.log(passed ? '\x1b[0;32m passed ' + testname + '\x1b[0m' : '\x1b[0;31m FAILED ' + testName + '\x1b[0m')
}

function test(testCases) {
    for (let testName in testCases) {
        if (testCases.hasOwnProperty(testName)) {
            report(testName, testPasses(testCases[testName]))
        }
    }
}
