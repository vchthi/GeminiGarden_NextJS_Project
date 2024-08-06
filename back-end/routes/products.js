var express = require("express");
var router = express.Router();
const checktoken = require("../helper/checktoken");
const productController = require("../mongo/product.controller");
const multer = require("multer");

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
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file.originalname;
    const product = await productController.insert({
      name,
      image,
      price,
      description,
      category,
    });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//hiển thị tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const pros = await productController.getpros();
    return res.status(200).json(pros);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});

//hiển thị sản phẩm hot
router.get("/hotpro", async (req, res) => {
  try {
    const hotProducts = await productController.getHotProduct();
    return res.status(200).json(hotProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: error });
  }
});

//hiển thị sản phẩm giảm giá
router.get("/sale", async (req, res) => {
  try {
    const saleProducts = await productController.getSaleProduct();
    return res.status(200).json(saleProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
    res.status(500).json({ message: error });
  }
});
//hiển thị sản phẩm bán chạy
router.get("/bestseller", async (req, res) => {
  try {
    const bestSeller = await productController.getBestSeller();
    return res.status(200).json(bestSeller);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: error });
  }
});

// hiển thị sản phẩm theo danh mục
router.get("/indoor", async (req, res) => {
  try {
    const indoor = await productController.getByCategory(
      "668ab45d52a1aa5a8316117c"
    );
    return res.status(200).json(indoor);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});

// hiển thị sản phẩm theo danh mục
router.get("/outdoor", async (req, res) => {
  try {
    const outdoor = await productController.getByCategory(
      "668ff512a2746b46d2fd0709"
    );
    return res.status(200).json(outdoor);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});
// hiển thị sản phẩm theo danh mục
router.get("/tabletop", async (req, res) => {
  try {
    const tabletop = await productController.getByCategory(
      "668ff567a2746b46d2fd070a"
    );
    return res.status(200).json(tabletop);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});
router.get("/flower", async (req, res) => {
  try {
    const flower = await productController.getByCategory(
      "668ff567a2746b46d2fd070a"
    );
    return res.status(200).json(flower);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});

// danh sách sản phẩm mới
router.get("/newpro", async (req, res) => {
  try {
    const products = await productController.getNew();
    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm mới:", error.message);
    res.status(500).json({ message: error });
  }
});

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await productController.getAll();
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

// Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productController.getProductById(productId);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error.message);
    res.status(500).json({ message: error });
  }
});

// Cập nhật sản phẩm theo id
// router.put("/:id",  upload.single('image'), async (req, res, next) => {
//   try {
//     let {id}=req.params;
//     let { name, image, price_1, price_2, mota_1, mota_2, category } = req.body;
//     const product = await productController.updateById(id, { name, image, price_1, price_2, mota_1, mota_2, category });
//     return res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// Cập nhật sản phẩm theo id
router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, price, description, categoryId } = req.body;
    const image = req.file.originalname;

    const product = await productController.updateById(id, {
      name,
      image,

      price,
      description,
      categoryId,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error.message);
    res.status(500).json({ message: error.message });
  }
});

//xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const proDel = await productController.remove(id);
    return res.status(200).json({ ProductDelete: proDel });
  } catch (error) {
    console.log("Lỗi xóa sản phẩm theo id ", error);
    return res.status(500).json({ mess: error });
  }
});

//xem chi tiết
router.get("/detail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const sp = await productController.getProductDetail(productId);
    return res.status(200).json(sp);
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    return res.status(500).json({ mess: error });
  }
});

//lấy danh sách sản phẩm theo mã danh mục
//http://localhost:3000/products/category/id
router.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await productController.getByCategory(categoryId);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo mã danh mục:", error.message);
    res.status(500).json({ message: error });
  }
});

// tìm sản phẩm
//http://localhost:3000/products/search/name/
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const product = await productController.getByKey(key, value);
    return res.status(200).json({ Product: product });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo key:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng
//http://localhost:3000/products/giatangdan
router.get("/giatangdan", async (req, res) => {
  try {
    const product = await productController.getGiaTangDan();
    res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
//http://localhost:3000/products/lienquan/
router.get("/lienquan/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const sanPhamLienQuan = await productController.getProLienQuan(productId);
    res.status(200).json({ sanPhamLienQuan });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
    res.status(500).json({ message: error });
  }
});

// Tìm và xóa sản phẩm theo điều kiện tên
//http://localhost:3000/products/timvaxoa/
router.delete("/timvaxoa/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await productController.timvaxoa(name);
    return res.status(200).json({ protimvaxoa: result });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm không thành công:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

//Tìm và xóa sản phẩm theo điều kiện giá
//http://localhost:3000/products/delete-by-price/:price
router.delete("/delete-by-price/:price", async (req, res) => {
  try {
    const price = parseFloat(req.params.price);
    const deletedProducts = await productController.deleteByPrice(price);
    return res.status(200).json({ DeletedProducts: deletedProducts });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo điều kiện giá:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm theo trang và giới hạn số lượng
//http://localhost:3000/products/products?limit=1?page=1
router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const proPage = await productController.getProPage(page, limit);
    return res.status(200).json({ proPage: proPage });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo trang:", error.message);
    res.status(500).json({ message: error });
  }
});

//sản phẩm liên quan
router.get("/related/:id/related", async (req, res) => {
  try {
    const { id } = req.params;
    const relatedProducts =
      await productController.getRelatedProductsByProductId(id);
    return res.status(200).json(relatedProducts);
  } catch (error) {
    console.log("Lỗi lấy sản phẩm liên quan theo danh mục", error);
    return res.status(500).json({ message: error.message });
  }
});

//tìm kiếm theo tên
router.get("/search/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const products = await productController.findByName(name);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
