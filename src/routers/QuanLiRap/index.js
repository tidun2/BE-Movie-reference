//routers => chỉ validate data, chạy function -> những function thì làm trong services -> giúp tái sd và qli tập trung
'use strict';
const express = require('express');
const { getAllThongTinHeThongRap, getInforLichChieuPhimByMaPhim } = require('../../services/QuanLiRap');

const quanLiRapRouter = express.Router();

quanLiRapRouter.get("/LayThongTinHeThongRap", async (req, res)=>{
    const layThongTinHeThongRap = await getAllThongTinHeThongRap() ;
    //là null => ! khác null
    if(!layThongTinHeThongRap){
        res.status(500).send("can not get list HeThongRap");
    }
    res.status(200).send(layThongTinHeThongRap)
});

quanLiRapRouter.get("/LayThongTinCumRapTheoHeThong/:maHeThongRap", async(req, res)=>{

});

quanLiRapRouter.get("/LayThongTinLichChieuHeThongRap", async(req, res)=>{

});

quanLiRapRouter.get("/LayThongTinLichChieuPhim/:maPhim", async(req, res)=>{
    const {maPhim} = req.params;

    // const movie = await getInforLichChieuPhimByMaPhim(maPhim);
    // if(!movie){
    //     return res.status(404).send(`movie mã: ${mạPhim} is not exist on db`)
    // }
    // res.status(200).send(movie);
})

module.exports = quanLiRapRouter;