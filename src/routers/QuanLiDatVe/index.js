"use strict";
const express = require("express");

const quanLiDatVeRouter = express.Router();

quanLiDatVeRouter.post("/DatVe", async (req, res) => {
  const { maLichChieu, danhSachVe } = req.body; //destructuring: lụm data trong body ra

  res.status(200).send("Đặt thành công");
});

quanLiDatVeRouter.get("/LayDanhSachPhongVe/maLichChieu", async (req, res) => {
  const maLichChieu = {
    maLichChieu: Date.now(),
  };
  arrListTicketRoom.push(maLichChieu);
  res.status(200).send(arrListTicketRoom);
});

quanLiDatVeRouter.post("/TaoLichChieu", async (req, res) => {
  const { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;

  res.status(200).send("Tạo Lịch Chiếu thành công")
});

module.exports = quanLiDatVeRouter;
