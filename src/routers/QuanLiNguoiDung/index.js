"use strict";
const express = require("express");
const { SYSTEM } = require("../../config");
const { authenticate, checkMaLoaiNguoiDung } = require("../../middleware/Auth");
const { uploadAvatar } = require("../../middleware/UploadFile");
const { scriptMatKhau, comparePassword, genToken } = require("../../services/Auth");
const {
  getAllDSLoaiNguoiDung,
  getAllDSNguoiDung,
  checkExistUserByTaiKhoan,
  deleteNguoiDungByTaiKhoan,
  getUserByTaiKhoan,
  updateUserByTaiKhoan,
  createUser,
  storageAvatar,
  getPhimWatchedByUser,
} = require("../../services/QuanLiNguoiDung");

const quanLiNguoiDung = express.Router();

quanLiNguoiDung.get("/LayDanhSachLoaiNguoiDung", async (req, res) => {
  const layDSLoaiNguoiDung = await getAllDSLoaiNguoiDung();
  if (!layDSLoaiNguoiDung) {
    res.status(500).send("can not get DS Loai nguoi dung");
  }
  res.status(200).send(layDSLoaiNguoiDung);
});

quanLiNguoiDung.post("/DangNhap", async (req, res) => {
  const {taiKhoan, matKhau} = req.body;
  const user = await getUserByTaiKhoan(taiKhoan);
  if(!user){
    console.log({user});
      return res.status(400).send(`taiKhoan: ${taiKhoan} is not exist`);
  }
  const isSuccess = comparePassword(matKhau, user.matKhau);
  if(!isSuccess){
    return res.status(400).send(`matKhau is not match`)
  }
  const token = genToken({taiKhoan: user.taiKhoan});
  return res.status(200).send({user, token})
});

quanLiNguoiDung.post("/DangKi", async (req, res) => {
  const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;//ko lấy maLoaiNguoiDung từ body

  //validate

  const matKhauHashed = scriptMatKhau(matKhau);
  console.log({matKhauHashed});//mỗi khi send sẽ log đc chuỗi password khác nhau 

  const data = await createUser({
    taiKhoan,
    //matKhau: matKhauHashed,//! password ko thể dịch ngược lại đc
    matKhau,
    email,
    soDt,
    hoTen,
    maLoaiNguoiDung: "KhachHang",//chỉ khách hàng mới đk
  });
  if(!data){
    return res.status(500).send(`can not create user`)
  }
  res.status(201).send(data);
});

quanLiNguoiDung.get("/LayDanhSachNguoiDung", async (req, res) => {
  const layDSNguoiDung = await getAllDSNguoiDung();
  if (!layDSNguoiDung) {
    res.status(500).send("can not get DS nguoi dung");
  }
  res.status(200).send(layDSNguoiDung);
});

quanLiNguoiDung.get("/TimKiemNguoiDung", async (req, res) => {});

quanLiNguoiDung.post("/LayThongTinNguoiDung/:taiKhoan", async (req, res) => {
  const { taiKhoan } = req.params;

  const user = await getUserByTaiKhoan(taiKhoan);
  if (!user) {
    //ko tồn tại
    return res
      .status(404)
      .send(`user taiKhoan ${taiKhoan} is not existed on database`);
  }
  res.status(200).send(user);
});

quanLiNguoiDung.post("/ThemNguoiDung", async (req, res) => {
  const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;

  // const matKhauHashed = scriptMatKhau(matKhau);

  const user = await createUser({
    taiKhoan,
    // matKhau:matKhauHashed,
    matKhau,
    email,
    soDt,
    maLoaiNguoiDung:"QuanTri",
    hoTen,
  });
  if (!user) {
    res.status(500).send("can not create user");
  }
  res.status(201).send(user);
});

//update -> gắn id lên params và body là data mình update nó
quanLiNguoiDung.put("/CapNhatThongTinNguoiDung/:taiKhoan", async (req, res) => {
  const { taiKhoan } = req.params;
  const { matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } = req.body;

  const isExistedUser = await checkExistUserByTaiKhoan(taiKhoan);
  if (!isExistedUser) {
    return res
      .status(404)
      .send(`user taiKhoan ${taiKhoan} is not existed on database`);
  }
  await updateUserByTaiKhoan(taiKhoan, {
    matKhau,
    email,
    soDt,
    maNhom,
    maLoaiNguoiDung,
    hoTen,
  });
  res.status(200).send(`updated`);
});

quanLiNguoiDung.delete("/XoaNguoiDung/:taiKhoan",[authenticate, checkMaLoaiNguoiDung("QuanTri")], async (req, res) => {
  const { taiKhoan } = req.params;

  const isExistedUser = await checkExistUserByTaiKhoan(taiKhoan);
  if (!isExistedUser) {
    return res
      .status(404)
      .send(`user taiKhoan: ${taiKhoan} is not existed on database`);
  }
  //tồn tại thì delete
  const user = await deleteNguoiDungByTaiKhoan(taiKhoan);
  //ktra típ lỡ mất kết nối
  if (!user) {
    res.status(500).send(`can not delete user taiKhoan: ${taiKhoan}`);
  }
  res.status(200).send(`user taiKhoan: ${taiKhoan} is deleted`);
});

//check token có hợp hay ko, đã login hay chưa 
quanLiNguoiDung.post("/UploadAvatar",[authenticate, uploadAvatar()], async(req, res)=>{
  //upload avatar cho user đó nên lụm user ra
  const user = req.user;//(user trong auth middleware: req.user = user)

  const file = req.file;

  //url: để load hình lên
  const urlAvatar = `${SYSTEM.DOMAIN}/${file.path}`;//sau domain là đg dẫn -> domain: folder config -> SYSTEM.DOMAIN
  const avatar = await storageAvatar (user.taiKhoan, urlAvatar);//có domain r-> lưu lại nó

  res.status(200).send(avatar)
  //lấy đc file từ request -> cần middleware

})

quanLiNguoiDung.get("/LayDSPhimUserWatched",[authenticate], async(req, res)=>{
  const user = req.user;

  //lấy list movie mà user đã xem trong table Ticket
  //ban đầu dùng getPhimWatchedByUser -> sẽ lâý đc cả movie watched và cả infor user
  //=> ở đây mình chỉ lấy movie watched 
  const data = await user.getMoviesWatched(); //!models: LayDanhSachPhim as:"moviesWatched" => tự động có method getMoviesWatched cho mình -> Tự động tạo ra khi models có alias như vậy
  if(!user){
    return  res.status(500).send("can not get data")
  }
  res.status(200).send(data);
});


module.exports = quanLiNguoiDung;
