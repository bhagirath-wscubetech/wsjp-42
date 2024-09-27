// const add = require('./calc.js'); // default import
//const { add, subt } = require('./calc.js'); // named import

import demo, { subt, mult } from "./calc.js";

console.log(demo(2, 4));
console.log(subt(2, 4));
console.log(mult(2, 4));