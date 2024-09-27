const fs = require('fs');

// LibUV

// Read a file

// fs.readFile(
//     "demo/dummy.docx",
//     "ascii",
//     (err, data) => {
//         if (err) {
//             console.log(err.message, 'Unable to read file');
//         } else {
//             console.log(data);
//         }
//     }
// );

try {
    // fs.unlinkSync("demo");
    fs.appendFileSync("data/demo.txt", "Kem cho?")
} catch (err) {
    console.log(err.message);
}


// try {
//     const data = fs.readFileSync("demo/dummy.docx", "ascii");
// } catch (err) {
//     console.log(err.message);
// }


// fs.readFile(
//     "demo/dummy.docx",
//     (err, data) => {
//         if (err) {
//             console.log(err.message, 'Unable to read file');
//         } else {
//             console.log(data.toString());
//         }
//     }
// );



// write a file OR create a file

// Asynchronous
// try {
//     // exception handling
//     if (!fs.existsSync("demo")) {
//         fs.mkdirSync('demo');
//     }
//     fs.writeFileSync("demd/dummy.docx", "Hello");
// } catch (err) {
//     console.log(err.message);
// }


// fs.mkdir(
//     "deta",
//     (err) => {
//         if (err){
//             console.log(err.message);
//             return;
//         }
//         fs.writeFile(
//             "deta/testing.txt",
//             "",
//             (err) => {
//                 if (err) {
//                     console.log('Unable to write the file');
//                 } else {
//                     console.log('File written');
//                 }
//             }
//         )
//     }
// )