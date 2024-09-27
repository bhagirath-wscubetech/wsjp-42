const add = (a, b) => a + b;
const subt = (a, b) => a - b;
const mult = (a, b) => a * b;
const divi = (a, b) => a / b;

// module.exports = add; // default export 

// module.exports = {
//     add, subt, mult, divi
// } // named export

export default add; // default
export { subt, mult, divi } // named