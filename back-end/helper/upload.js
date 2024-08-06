
// const multer = require('multer');
// // const { ObjectId } = require('mongodb');

// var storage = multer.diskStorage({
//     destination : ((req,file,callback)=>{ // định nghĩa thư mục mình sẽ lưu khi tải file hình ảnh lên
//         callback(null, './public/images') 
//     }),
//     filename : ((req,file,callback)=>{ // lấy cái tên file hình ảnh
//         callback(null, file.originalname)
//     })
// })

// // dùng biểu thức chính quy để kiểm tra
// var checkFile = (req,file,callback)=>{
//     if (!file.originalname.match(/\.(png|jpg|webp|gif)$/)) {
//         return callback(new Error('Vui lòng nhập file hình ảnh'))
//     }
//         return callback(null,true)
// }

// module.exports = multer({storage : storage , fileFilter: checkFile})