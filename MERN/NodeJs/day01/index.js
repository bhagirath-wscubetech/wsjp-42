const otpGenerator = require('otp-generator');

console.log(otpGenerator.generate(6, { specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false }));


console.log(otpGenerator.generate(4, { specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false }));


console.log(otpGenerator.generate(10, { specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false }));