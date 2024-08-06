const express = require("express");
const router = express.Router();
const userController = require("../mongo/user.controller");
const jwt = require('jsonwebtoken');


router.get('/checktoken', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'chanhthi', (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  }
  );
}
);
//lấy thông tin chi tiết user qua token
router.get('/detailuser', async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization.split(' ')[1];
    const userInfo = await userController.getUserDetails(token);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ hoặc lỗi hệ thống" });
  }
});

// Lấy danh sách user
//http://localhost:3000/users
router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Lỗi lấy danh sách user", error);
    return res.status(500).json({ mess: error });
  }
});

// Lấy user qua Id
//http://localhost:3000/users/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userController.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Lỗi lấy user", error);
    return res.status(500).json({ mess: error });
  }
});

// Thêm user
//http://localhost:3000/users/add/
router.post("/add", async (req, res) => {
  try {
    const body = req.body;
    const newUser = await userController.addUser(body);
    return res.status(200).json(newUser);
  } catch (error) {
    console.log("Lỗi thêm user", error);
    return res.status(500).json({ mess: error });
  }
});

// Xóa user
//http://localhost:3000/users/delete/
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userController.deleteUser(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log("Lỗi xóa user", error);
    return res.status(500).json({ mess: error });
  }
});

// Cập nhật user
//http://localhost:3000/users/update
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await userController.updateUser(id, body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Lỗi cập nhật người dùng", error);
    return res.status(500).json({ message: error.message });
  }
});

router.post('/', async(req, res)=>{
  try {
      const body = req.body
      const result = await userController.register(body)
      return res.status(200).json({NewUser : result})
  } catch (error) {
      console.log('Thêm user không thành công', error);
      res.status(500).json({mess : error})
  }
})


router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await userController.login(req.body);

    if (result) {
      const access_token = jwt.sign({ _id: result._id, name: result.name, role: result.role }, 'chanhthi', { expiresIn: '1h' });
      const refresh_token = jwt.sign({ _id: result._id, name: result.name, role: result.role }, 'chanhthi', { expiresIn: '90d' });
      res.status(200).json({
        ...result._doc,
        access_token,
        refresh_token
      });
    } else {
      res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
    }
  } catch (error) {
    console.log('Lỗi đăng nhập', error);
    return res.status(500).json({ mess: error.message });
  }
});

router.post('/refresh-token',async function (req,res,next) {
  try{
    let { refresh_token }=req.body;
    const data =jwt.verify(refresh_token,'chanhthi')
    const access_token = jwt.sign({user:data.user},'chanhthi',{expiresIn: 1*60})
    refresh_token = jwt.sign({user:data.user},'chanhthi',{expiresIn:90*24*60*60})
    res.status(200).json({user:data.user,access_token,refresh_token})
  }catch(error){
res.status(401).json({error:error.message})
  }
})

router.post('/register', async(req, res)=>{
  try {
      const {name, email, password, repassword} = req.body
      const result = await userController.register(req.body);
      return res.status(200).json(result)
  } catch (error) {
      console.log('Thêm user không thành công', error);
      res.status(500).json({mess : error})
  }
})



module.exports = router;
