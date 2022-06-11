const { decodeToken } = require("../../services/Auth");
const { getUserByTaiKhoan } = require("../../services/QuanLiNguoiDung");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); //replace đằng sau là 1 chuỗi rỗng ""
    const data = decodeToken(token);

    const user = await getUserByTaiKhoan(data.taiKhoan);
    if (!user) {
      return res.status(401).send("invalid token");
    }
    req.user = user;
    next(); //típ là next nó
  } catch (error) {
    return res.status(500).send("server errors");
  }
};

//để sau authenticate => user lụm đc từ req.user luôn
//closure: 1 function -> trả về 1 function
const checkMaLoaiNguoiDung = (maLoaiNguoiDung) =>  (req, res, next) => {
    const user = req.user;
    if (user.maLoaiNguoiDung !== maLoaiNguoiDung) {
      return res.status(401).send("can not access");
    }
    next();
  };


module.exports = {
  authenticate,
  checkMaLoaiNguoiDung,
};
