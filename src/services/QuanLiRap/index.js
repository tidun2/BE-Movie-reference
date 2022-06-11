//tách hàm từ routers =>services: quản lí tập trung hơn
"use strict";
const {LayThongTinHeThongRap} = require("../../../models");
const {LayDanhSachPhim} = require('../../../models');

const getAllThongTinHeThongRap = async ()=>{
    try {
        const layThongTinHeThongRap = await LayThongTinHeThongRap.findAll(); 
        return layThongTinHeThongRap;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// const getInforLichChieuPhimByMaPhim = async(maPhim) =>{
//     try {
//         const movie = await LayDanhSachPhim.findOne({
//             where:{
//                 maPhim,
//             }
//         })
//         return movie;
//     } catch (error) {
//         return null;
//     }
// }

module.exports = {
    getAllThongTinHeThongRap,
    // getInforLichChieuPhimByMaPhim,

}