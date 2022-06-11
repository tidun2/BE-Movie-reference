'use strict';
const express = require("express");
const quanLiDatVeRouter = require('./QuanLiDatVe');
const quanLiRapRouter = require('./QuanLiRap');
const quanLiPhimRouter = require('./QuanLiPhim');
const quanLiNguoiDung = require("./QuanLiNguoiDung");

const rootRouter = express.Router();//method trả về router (phụ) cho mình 

//!nếu muốn gắn middleware cho toàn QuanLiDatVe thì gắn vô giữa
rootRouter.use("/QuanLiDatVe", quanLiDatVeRouter);//gắn quanLiDatVeRouter là con của rootRouter
rootRouter.use("/QuanLiRap", quanLiRapRouter);
rootRouter.use("/QuanLiPhim", quanLiPhimRouter);
rootRouter.use("/QuanLiNguoiDung", quanLiNguoiDung)

module.exports =  rootRouter;