'use strict';
const express = require('express');
const { authenticate, checkMaLoaiNguoiDung } = require('../../middleware/Auth');
const { getAllDanhSachBanner, getAllDanhSachPhim, getInforPhimByMaPhim, checkExistedPhimByMaPhim, deletePhim } = require('../../services/QuanLiPhim');

const quanLiPhimRouter = express.Router();

quanLiPhimRouter.get("/LayDanhSachBanner", async (req, res)=>{ 
    const layDanhSachBanner = await getAllDanhSachBanner();
    if(!layDanhSachBanner){
        res.status(500).send("can not get list DanhSachBanner");
    }
    res.status(200).send(layDanhSachBanner)
})

quanLiPhimRouter.get("/LayDanhSachPhim", async (req, res)=>{
    const layDanhSachPhim = await getAllDanhSachPhim(); 
    if(!layDanhSachPhim){
        res.status(500).send("can not get list DanhSachPhim");
    }
    res.status(200).send(layDanhSachPhim)
} );

quanLiPhimRouter.put("/UploadImagePhim/:maPhim", async (req, res)=>{
    
} )

quanLiPhimRouter.delete("/XoaPhim/:maPhim", [authenticate, checkMaLoaiNguoiDung("QuanTri")],async (req, res)=>{
    const {maPhim} = req.params;

    const isExistMovieByMaPhim = await checkExistedPhimByMaPhim(maPhim);
    if(!isExistMovieByMaPhim){
        return res.status(404).send(`movie mã: ${maPhim} is not exist on db`);
    }
    const movie = await deletePhim(maPhim);
    if(!movie){
        res.status(500).send(`can not delete movie mã: ${maPhim}`);
    }
    res.status(200).send(`movie mã: ${maPhim} is deleted`);
} )

quanLiPhimRouter.get("/LayThongTinPhim/:maPhim", async (req, res)=>{
    const {maPhim} = req.params;

    const movie = await getInforPhimByMaPhim(maPhim);
    if(!movie){
        return res.status(404).send(`movie mã: ${maPhim} is not exist on db`)
    }
    res.status(200).send(movie);
})

module.exports = quanLiPhimRouter;