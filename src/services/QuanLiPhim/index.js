"use strict";
const { LayDanhSachPhim } = require("../../../models");
const { LayDanhSachBanner } = require("../../../models");

const getAllDanhSachBanner = async () => {
  try {
    const layDanhSachBanner = await LayDanhSachBanner.findAll();
    return layDanhSachBanner;
  } catch (error) {
    return null;
  }
};

const getAllDanhSachPhim = async () => {
  try {
    const layDanhSachPhim = await LayDanhSachPhim.findAll();
    return layDanhSachPhim;
  } catch (error) {
    return null;
  }
};

const checkExistedPhimByMaPhim = async (maPhim) => {
  try {
    const movie = await LayDanhSachPhim.findOne({
      where: {
        maPhim,
      },
    });
    if (!movie) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
const deletePhim = async (maPhim) => {
  try {
    const movie = await LayDanhSachPhim.destroy({
      where: {
        maPhim,
      },
    });
    return movie;
  } catch (error) {
    return null;
  }
};

const getInforPhimByMaPhim = async (maPhim) => {
  try {
    const movie = await LayDanhSachPhim.findOne({
      where: {
        maPhim,
      },
    });
    return movie;
  } catch (error) {
    return null;
  }
};



module.exports = {
  getAllDanhSachBanner,
  getAllDanhSachPhim,
  getInforPhimByMaPhim,
  checkExistedPhimByMaPhim,
  deletePhim,
};
