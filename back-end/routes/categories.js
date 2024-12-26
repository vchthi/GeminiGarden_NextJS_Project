var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/category.controller");
const multer = require("multer");
const authen = require("../middleware/authen");

//lấy tất cả danh mục
// http:/localhost:3000/categories/
router.get("/", async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    return res.status(500).json({ mess: error });
  }
});


//lấy danh mục theo id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryController.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi lấy danh mục theo ID", error);
    return res.status(500).json({ mess: error });
  }
});



//thêm sản phẩm bằng file
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.originalname : ""; // Cần kiểm tra file có tồn tại không
    const category = await categoryController.insert({
      name,
      image,
      description
    });
    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//xóa danh mục
//http://localhost:3000/categories/delete/
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const cateDel = await categoryController.removeCategory(id); // Sửa tên hàm gọi đúng
      return res.status(200).json({ CategoryDelete: cateDel });
  } catch (error) {
      console.log('Lỗi xóa danh mục theo id ', error);
      return res.status(500).json({ error: 'Lỗi xóa danh mục theo id' });
  }
});

// Cập nhật danh mục theo id
router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, description} = req.body;
    const image = req.file.originalname;
      const cateUpdate = await categoryController.updateCategory(id, {
        name,
        image,

        description,
      
      });;
      return res.status(200).json(cateUpdate);
  } catch (error) {
      console.log('Lỗi cập nhật danh mục theo id ', error);
      return res.status(500).json({ error: 'Lỗi cập nhật danh mục theo id' });
  }
});


// Tìm danh mục
// http://localhost:3000/categories/search/name/categoryName
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const category = await categoryController.getByKey(key, value);
    return res.status(200).json({ Category: category });
  } catch (error) {
    console.error("Lỗi lấy danh mục theo key:", error.message);
    res.status(500).json({ message: error });
  }
});


module.exports = router;


