function assert(condition) {
    if (!condition) { throw { name: "AssertionError", message: "Assertion failed" } }
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
    console.log(passed ? '\x1b[0;32m passed ' + testName + '\x1b[0m' : '\x1b[0;31m FAILED ' + testName + '\x1b[0m')
}

function test(testCases) {
    for (let testName in testCases) {
        if (testCases.hasOwnProperty(testName)) {
            report(testName, testPasses(testCases[testName]))
        }
    }
}

function isValid(stale, latest, otjson) {
    // apply otjson to stale and check if it matches latest
    // return true or false
    // otjson is an array of operations
    // each operation is an object with an op property and a count or chars property depending on the op
    // op can be "skip", "delete", or "insert"
    // count is a number
    // chars is a string
    // skip means skip that many characters in stale
    // delete means delete that many characters in stale
    // insert means insert those characters in stale
    // if any operation deletes past the end of stale, return false
    // if any operation skips past the end of stale, return false
    // if the final string does not match latest, return false
    // otherwise return true

    let current = stale; // track state of string as operations are applied
    let index = 0; // track location of cursor in current
    for (let i = 0; i < otjson.length; i++) {
        let op = otjson[i];
        if (op.op === "skip") {
            // if skipping past the end of the string, return false
            if (index + op.count > current.length) {
                return false;
            }
            // move index forward count many characters
            index += op.count;
        } else if (op.op === "delete") {
            // if deleting past the end of the string, return false
            if (index + op.count > current.length) {
                return false;
            }
            // delete count many characters starting at index
            current = current.slice(0, index) + current.slice(index + op.count)
        } else if (op.op === "insert") {
            // insert chars at index, update index to be at the end of the inserted chars
            current = current.slice(0, index) + op.chars + current.slice(index);
            index += op.chars.length;
        }

    }
    return current == latest;
}


test({
    "skip-delete should return true": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'Repl.it uses operational transformations.',
        [
            { "op": "skip", "count": 40 },
            { "op": "delete", "count": 47 }
        ]
    ) === true ),
    "skip-delete-skip should return false": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'Repl.it uses operational transformations.',
        [
            { "op": "skip", "count": 40 },
            { "op": "delete", "count": 47 },
            { "op": "skip", "count": 2 }
        ]
    ) === false ),
    "skip-delete should return false": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'Repl.it uses operational transformations.',
        [
            { "op": "skip", "count": 45 },
            { "op": "delete", "count": 47 }
        ]
    ) === false ),
    "delete-insert-skip-delete should return true": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'We use operational transformations to keep everyone in a multiplayer repl in sync.',
        [
            { "op": "delete", "count": 7 },
            { "op": "insert", "chars": "We" },
            { "op": "skip", "count": 4 },
            { "op": "delete", "count": 1 }
        ]
    ) === true ),
    "delete-insert-skip-delete should return false": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'We can use operational transformations to keep everyone in a multiplayer repl in sync.',
        [
            { "op": "delete", "count": 7 },
            { "op": "insert", "chars": "We" },
            { "op": "skip", "count": 4 },
            { "op": "delete", "count": 1 }
        ]
    ) === false ),
    "empty should return true": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        []
    ) === true ),
    "should fail": () => assert(isValid(
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
        []
    ) === false ),
})

