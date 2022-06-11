const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
type LayDanhSachNguoiDung{
    taiKhoan: String!
    hoTen: String!
    email: String!
    soDt: Int!
    matKhau: Int!
    maLoaiNguoiDung: String!
}

type rootQuery{
getAllUser : [LayDanhSachNguoiDung]!
getUserByTaiKhoan(taiKhoan: String): LayDanhSachNguoiDung! 
}
schema{
    query: rootQuery
}
`);

module.exports = graphqlSchema;
