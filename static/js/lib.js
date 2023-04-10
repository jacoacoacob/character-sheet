
/**
 * Give a little hello
 */
function sayHi(name) {
    if (name) {
        console.log(`hello ${name}!`);
    } else {
        console.log("hello!");
    }
}


export { sayHi };
