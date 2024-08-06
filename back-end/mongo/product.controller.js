
const productModel = require("./product.model");
const categoryModel = require("./category.model");

module.exports = {
  getpros,
  getProductById,
  getByCategory,
  getGiaTangDan,
  getHotProduct,
  getSaleProduct,
  getNewProduct,
  getBestSeller,
  getNew,
  insert,
  getAll,
  getProLienQuan,
  getByKey,
  updateById,
  remove,
  deleteByPrice,
  getProPage,
  getProductDetail,
  timvaxoa,
  getRelatedProductsByProductId,
  findByName
};


//thêm sản phẩm
async function insert(body) {
  try {
    const { name, image, description, price, category } = body;

    // Kiểm tra danh mục
    const categoryFind = await categoryModel.findById(category);
    if (!categoryFind) {
      throw new Error("Không tìm thấy danh mục");
    }

    const proNew = new productModel({
      name,
      description,
      image,
      price,
      category: {
        categoryId: categoryFind._id,
        categoryName: categoryFind.name,
      },
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const result = await proNew.save();
    return result;
  } catch (error) {
    console.log("Lỗi insert product: ", error);
    throw error;
  }
}





//lấy tất cả sản phẩm
async function getpros() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách", error);
    throw error;
  }
}

//lấy san phẩm theo id
async function getProductById(productId) {
  try {
    const product = await productModel.findById(productId);
    return product;
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    throw error;
  }
}

//lấy danh sách sản phẩm theo danh mục
async function getByCategory(category) {
  try {
    const productsCategory = await productModel.find({
      "category.categoryId": category,
    });
    return productsCategory;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo danh mục", error);
    throw error;
  }
}

//xem chi tiet
async function getProductDetail(productId) {
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    return product;
  } catch (error) {
    console.error("Lỗi lấy thông tin chi tiết sản phẩm:", error);
    throw error;
  }
}

//sản phẩm nổi bật
async function getHotProduct() {
  try {
    const result = await productModel
      .find({ view: { $gte: 1000 } })
      .sort({ view: -1 })
      .limit(8);
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm hot", error);
    throw error;
  }
}

//lấy sản phẩm giảm giá
async function getSaleProduct() {
  try {
    const prosale = await productModel.find().sort({ price_2: -1 }).limit(8);
    return prosale;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm giảm giá", error);
    throw error;
  }
}


//lấy sản phẩm mới
async function getNewProduct() {
  try {
    const newProducts = await productModel
      .find()
      .sort({ ngaytao: -1 })
      .limit(8);
    return newProducts;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm mới:", error.message);
    throw error;
  }
}


//lấy sản phẩm giảm giá
async function getBestSeller() {
  try {
    const bestSeller = await productModel
      .find()
      .sort({ luotmua: -1 })
      .limit(8);
    return bestSeller;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm bán chạy:", error.message);
    throw error;
  }
}

//lấy tất cả sản phẩm
async function getAll() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm", error);
    throw error;
  }
}

//lấy sản phẩm mới
async function getNew() {
  try {
    const result = await productModel.find().sort({ _id: -1 }).limit(5);
    return result;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm mới", error);
    throw error;
  }
}

//lấy sản phẩm theo id
async function getProductById(productId) {
  try {
    const product = await productModel.findById(productId);
    return product;
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    throw error;
  }
}

//tìm kiếm sản phẩm
async function getByKey(key, value) {
  try {
    let pro = await productModel.findOne(
      { [key]: value },
      "name price_2 category"
    );
    pro = {
      Masp: pro._id,
      Ten: pro.name,
      Gia: pro.price_2,
      Danhmuc: pro.category,
    };
    return pro;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm: ", error);
    throw error;
  }
}

//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng
async function getGiaTangDan() {
  try {
    const sanPhamSapXep = await productModel
      .find()
      .sort({ price_2: 1 })
      .limit(4);
    return sanPhamSapXep;
  } catch (error) {
    console.log(
      "Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng:",
      error
    );
    throw error;
  }
}

//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
async function getProLienQuan(productId) {
  try {
    // Lấy thông tin sản phẩm cụ thể
    const sanPham = await productModel.findById(productId);
    const sanPhamLienQuan = await productModel.find({
      $and: [
        { "category.categoryId": sanPham.category.categoryId }, // lay san pham cung danh muc
        { _id: { $ne: productId } }, // bo qua san pham hien tai
      ],
    });
    return sanPhamLienQuan;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
    throw error;
  }
}

// Tìm và xóa sản phẩm có điều kiện tên
async function timvaxoa(name) {
  try {
    const result = await productModel.findOneAndDelete({ name: name });
    return result;
  } catch (error) {
    console.error("Lỗi xóa sản phẩm không thành công:", error);
    throw error;
  }
}

// Tìm và xóa nhiều sản phẩm có điều kiện giá nhỏ hơn hoặc bằng
async function deleteByPrice(price) {
  try {
    const deletedProducts = await productModel.deleteMany({
      price_2: { $lte: price },
    });
    return deletedProducts;
  } catch (error) {
    console.error("Lỗi tìm và xóa sản phẩm:", error.message);
    throw error;
  }
}


//Lấy danh sách sản phẩm theo trang và giới hạn số lượng
async function getProPage(page, limit) {
  try {
    const skip = (page - 1) * limit;
    const result = await productModel.find().skip(skip).limit(limit);
    return result;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo trang", error.message);
    throw error;
  }
}


//cập nhật sản phẩm
// async function updateById(id, body) {
//   try {
//     const product = await productModel.findById(id);
//     if (!product) {
//       throw new Error("Không tìm thấy sản phẩm");
//     }
//     const { name, price_1, price_2, image, mota_1, mota_2, category } = body;
//     let categoryFind = null;
//     if (category) {
//       categoryFind = await categoryModel.findById(category);
//       if (!categoryFind) {
//         throw new Error("Không tìm thấy danh mục");
//       }
//     }
//     const categoryUpdate = categoryFind
//       ? {
//           categoryId: categoryFind._id,
//           categoryName: categoryFind.name,
//         }
//       : product.category;

//     const updatedProduct = await productModel.findByIdAndUpdate(
//       id,
//       { name, price_1, price_2, image, mota_1, mota_2, category: categoryUpdate },
//       { new: true }
//     );
//     return updatedProduct;
//   } catch (error) {
//     console.log("Lỗi update sản phẩm", error);
//     throw error;
//   }
// }
async function updateById(id, body) {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    const { name, price, image, description, categoryId } = body;
    let categoryFind = null;

    if (categoryId) {
      categoryFind = await categoryModel.findById(categoryId);
      if (!categoryFind) {
        throw new Error("Không tìm thấy danh mục");
      }
    }

    const categoryUpdate = categoryFind
      ? {
          categoryId: categoryFind._id,
          categoryName: categoryFind.name,
        }
      : product.category;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        image: image || product.image,
        description,
        category: categoryUpdate
      },
      { new: true }
    );

    return updatedProduct;
  } catch (error) {
    console.log("Lỗi update sản phẩm", error);
    throw error;
  }
}


// xóa sp theo id
async function remove(id) {
  try {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa product không thành công", error);
    throw error;
  }
}

//sản phẩm liên quan theo danh mục
async function getRelatedProductsByProductId(id) {
  try {
      const product = await productModel.findById(id);
      const categoryId = product.category.categoryId;

      const relatedProducts = await productModel.find({
          'category.categoryId': categoryId,
          _id: { $ne: id } 
      }).limit(4);
      return relatedProducts;
  } catch (error) {
      console.log('Lỗi lấy sản phẩm liên quan', error);
      throw error;
  }
}

//tìm kiếm bằng tên
async function findByName(name) {
  try {
    // Thay thế các dấu cách bằng ".*" để tìm kiếm bất kỳ ký tự nào
    const regexName = name.replace(/\s/g, ".*");

    const products = await productModel.find({ name: { $regex: regexName, $options: "i" } });
    return products;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm theo tên:", error.message);
    throw error;
  }
}


