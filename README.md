# Test24

## Bringing TDD to your projects in 24 lines and less than 600 bytes of code.

Testing is something that every good project needs - but sometimes we don't need all the features of larger testing frameworks in smaller applications.

Enter in Test24 - an ultra-lightweight testing solution, designed as a way to make testing more accessible for those small projects.

## Installation

Clone this repo and copy the `tests.js` file, or just copy the code from `tests.js` directly into your project.

## Usage

Usage is very straightforward, please see the following example code:

```js
function myFunc(num) {
    if (typeof num !== 'number') { return null }
    if (num === -0) { num = Math.abs(num) }
    return num * 2;
}

test({
    "Should handle zeros correctly": () => assert(myFunc(0) === 0),
    "Should handle negative zeros correctly": () => assert(myFunc(-0) === 0),
    "Should handle positive numbers": () => assert(myFunc(2) === 4),
    "Should handle negative numbers": () => assert(myFunc(-2) === -4),
    "Should handle non-numbers": () => assert(myFunc() === null),
    "Should fail this": () => assert(myFunc(1) === 1),
    "Should pass this": () => assert(myFunc(1) === 2)
})
```

Which outputs the following results:

![testresults](https://user-images.githubusercontent.com/32769592/260855982-264bd908-e4c5-4124-ac67-3c76768404df.png)

