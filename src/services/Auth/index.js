"use strict";
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { AUTH } = require('../../config');

const scriptMatKhau = (matKhau) => {
    const salt = bcrypt.genSaltSync(10);//muối loại 10 -> db bị hack típ chỉ cần tăng cái muối lên là tăng thêm độ khó
    const hashed = bcrypt.hashSync(matKhau, salt);
    return hashed;
} ;

const comparePassword = (matKhau, matKhauHashed) => {
    const isMatch =  bcrypt.compareSync(matKhau, matKhauHashed);
    return isMatch;
}
const genToken = (data) => {
    const token = jwt.sign(data, AUTH.SECRET_KEY, {expiresIn: '1d'})
    return token;
}

//decodeToken -> trả về lại cho mình cái data là cái payload
const decodeToken = (token)=>{
    const decode = jwt.verify(token, AUTH.SECRET_KEY );
    //check decode có taikhoan hợp lệ hay ko-> nào cần thì bỏ vào -> vd: deleteUser
    return decode;
}

module.exports={
    scriptMatKhau,
    comparePassword,
    genToken, 
    decodeToken,
}