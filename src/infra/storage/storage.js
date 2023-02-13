// const multer = require('multer');

// exports.Storage = (path) => {
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path);
//         },
//         filename: (req, file, cb) => {
//             cb(null, new Date().toISOString() + file.originalname);
//         }
//     });
//     return storage;
// }

// exports.FileFilter = (file_mimetypes) => {
//     console.log(file_mimetypes);
//     const filter = (req, file, cb) => {
//         let check = false;
//         file_mimetypes.forEach(element => {
//             if (file.mimetype === element) {
//                 check = true;
//             }
//         });
//         if (check) {
//             // will accept file
//             cb(null, true);
//         } else {
//             // will reject file
//             cb(null, false);
//         }
//     };
//     return filter;
// }
