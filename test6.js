function assert(condition) {
    if (!condition) {
        throw new Error(`Failed: ${condition.toString()}`);
    } else {
        console.log(`Passed: ${condition.toString()}`);
    }
}
