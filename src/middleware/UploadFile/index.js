const multer = require("multer"); //dùng multer để lụm file ra

const uploadAvatar = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cp) => {
      cp(null, "./public/Avatar/avatar"); //tạo tay 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname.split(".").pop()}`);
    }, //ko muốn trong 1file bị trùng tên: dùng Date.now
    //originalname: là cái name of file sau fieldname trong body postman
    //split('.')(-> bao nhiêu dấu . ở giữa ko cần biết).pop()(=>tên file mà ko có dấu cách ở giữa)
  });

  //dùng multer để lấy ra
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      //lặp lại cái file mà user upload lên có phù hợp định dạng mà user mong muốn hay ko
      const isValid = new RegExp("^.*.(jpg|JPG|jpeg|JPEG|PNG|png)$").test(
        file.originalname
      );
      if (isValid) {
        cb(null, true);
      } else {
        cb(new Error("invalid file"), false);
      }
    },
    //check size file
    limits: { fileSize: 10000000 },
  });
  return upload.single("avatar"); //.single: upload 1 file duy nhất: nhận 1 field name: avatar(đặt trong postman)
};

module.exports = {
  uploadAvatar,
};
